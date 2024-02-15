// TODO: send verification token email
// will never be bundled with client code - equivalent to api route
'use server'

import { db } from '@/lib/db'
import * as z from 'zod'
import { RegisterSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const register = async (payload: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(payload)

	if (!validatedFields.success) {
		return { error: 'Invalid request' }
	}

	const { email, password, name } = validatedFields.data

	const hashedPassword = await bcrypt.hash(password, 10)

	const emailExists = await getUserByEmail(email)

	if (emailExists) {
		return { error: 'Email already in use' }
	}

	await db.user.create({
		data: {
			email,
			password: hashedPassword,
			name,
		},
	})

	const verificationToken = await generateVerificationToken(email)
	await sendVerificationEmail(verificationToken.email, verificationToken.token)

	return { success: 'Confirmation email sent!' }
}
