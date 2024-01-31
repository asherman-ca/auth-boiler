// workaround to make nextauth's Prisma adapter edge compatible (Prisma doesn't work on the edge runtime)
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import { LoginSchema } from './schemas'
import { getUserByEmail } from './data/user'
import bcrypt from 'bcryptjs'

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				// this portion of the code doesn't run on the edge so it still works
				const validatedFields = await LoginSchema.safeParse(credentials)

				if (validatedFields.success) {
					const { email, password } = validatedFields.data
					const user = await getUserByEmail(email)
					if (!user || !user.password) return null

					const passwordsMatch = await bcrypt.compare(password, user.password)
					if (passwordsMatch) return user
				}

				return null
			},
		}),
	],
} satisfies NextAuthConfig
