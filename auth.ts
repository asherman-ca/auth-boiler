// auth flow goes token -> session -> user
// token is used to get session

import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import authConfig from './auth.config'
import { db } from './lib/db'
import { getUserById } from './data/user'

// exported signin and signout functions can be used only in server actions / components. need diff solution for client side logout

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			})
		},
	},
	callbacks: {
		// async signIn({ user }) {
		// 	const existingUser = await getUserById(user.id)
		// 	if (!existingUser || !existingUser.emailVerified) return false
		// 	return true
		// },
		async jwt({ token }) {
			if (!token.sub) return token
			const user = await getUserById(token.sub)
			if (!user) return token
			token.role = user.role
			return token
		},
		async session({ session, token }) {
			if (session.user && token.sub) {
				session.user.id = token.sub
			}
			if (token.role && session.user) {
				session.user.role = token.role as 'ADMIN' | 'USER'
			}
			return session
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
})
