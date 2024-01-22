// exported signin and signout functions can be used in server actions / components
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import authConfig from './auth.config'
import { db } from './lib/db'

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	callbacks: {
		async jwt({ token }) {
			console.log('token', token)
			return token
		},
		async session({ session, token }) {
			if (session.user && token.sub) {
				session.user.id = token.sub
			}
			return session
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
})
