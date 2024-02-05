// will never be bundled with client code - equivalent to api route
'use server'
import * as z from 'zod'
import { LoginSchema } from '@/schemas'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

export const login = async (payload: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(payload)

	if (!validatedFields.success) {
		return { error: 'Invalid request' }
	}

	const { email, password } = validatedFields.data

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
