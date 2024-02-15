// will never be bundled with client code - equivalent to api route
'use server'
import * as z from 'zod'
import { Resend } from 'resend'
import { LoginSchema } from '@/schemas'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const login = async (payload: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(payload)

	if (!validatedFields.success) {
		return { error: 'Invalid request' }
	}

	const { email, password } = validatedFields.data

	const existingUser = await getUserByEmail(email)

	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Invalid credentials' }
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email
		)

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		)

		return { success: 'Confirmation email sent!' }
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		})
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid credentials!' }
				default:
					return { error: 'Something went wrong' }
			}
		}
		// error must be thrown in order for redirect to occur
		throw error
	}
}
