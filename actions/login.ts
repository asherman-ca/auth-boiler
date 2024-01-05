// will never be bundled with client code - equivalent to api route
'use server'
import * as z from 'zod'
import { LoginSchema } from '@/schemas'

export const login = async (payload: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(payload)

	if (!validatedFields.success) {
		return { error: 'Invalid request' }
	}

	return { success: 'Login successful' }
}
