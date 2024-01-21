import React from 'react'
import { signOut, auth } from '@/auth'

const page = async () => {
	const session = await auth()

	console.log('sesh', session)

	return (
		<div>
			{JSON.stringify(session)}
			<form
				action={async () => {
					'use server'
					await signOut()
				}}
			>
				<button type='submit'>Sign out</button>
			</form>
		</div>
	)
}

export default page
