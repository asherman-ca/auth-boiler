// will never be bundled with client code - equivalent to api route
'use server'
import * as z from 'zod'
import { LoginSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import { getUserByEmail } from '@/data/user'

export const login = async (payload: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(payload)

	if (!validatedFields.success) {
		return { error: 'Invalid request' }
	}

	const { email, password } = validatedFields.data
	const user = await getUserByEmail(email)
	if (!user || !user.password) return { error: 'Invalid username' }
	const passwordsMatch = await bcrypt.compare(password, user.password)

	if (passwordsMatch) return { success: 'Login successful' }

	return { error: 'Invalid password' }
}
