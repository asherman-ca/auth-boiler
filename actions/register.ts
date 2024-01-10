// will never be bundled with client code - equivalent to api route
'use server'
import * as z from 'zod'
import { RegisterSchema } from '@/schemas'

export const register = async (payload: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(payload)

	if (!validatedFields.success) {
		return { error: 'Invalid request' }
	}

	return { success: 'Login successful' }
}
