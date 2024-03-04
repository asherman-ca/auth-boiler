// auth flow goes token -> session -> user
// token is used to get session

import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import authConfig from './auth.config'
import { db } from './lib/db'
import { getUserById } from './data/user'
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation'

// exported signin and signout functions can be used only in server actions / components. need diff solution for client side logout

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			})
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider !== 'credentials') return true

			const existingUser = await getUserById(user.id)

			// prevent signin without email verification
			if (!existingUser || !existingUser.emailVerified) return false

			if (existingUser.isTwoFactorEnabled) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
					existingUser.id
				)

				if (!twoFactorConfirmation) return false

				// Delete two factor confirmation for next sign in
				await db.twoFactorConfirmation.delete({
					where: { id: twoFactorConfirmation.id },
				})
			}

			return true
		},
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
