'use server'
import { db } from '@/lib/db'

export const newVerification = async (token: string) => {
	const existingToken = await db.verificationToken.findUnique({
		where: {
			token,
		},
	})

	if (!existingToken) {
		return {
			message: 'no token found',
		}
	}

	const tokenExpiration = new Date(existingToken.expires)
	const currentTime = new Date()

	if (tokenExpiration < currentTime) {
		return {
			message: 'token expired',
		}
	} else {
		console.log('valid token')
		await db.user.update({
			where: {
				email: existingToken.email,
			},
			data: {
				emailVerified: currentTime,
			},
		})
		await db.verificationToken.delete({
			where: {
				id: existingToken.id,
			},
		})
		return {
			message: 'verification complete',
		}
	}
}
