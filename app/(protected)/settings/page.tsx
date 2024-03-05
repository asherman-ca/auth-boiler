'use client'
import React from 'react'
// import { signOut, auth } from '@/auth'
import { useSession, signOut } from 'next-auth/react'
import { logout } from '@/actions/logout'
import { useCurrentUser } from '@/hooks/use-current-user'

const page = () => {
	// const session = await auth()
	const user = useCurrentUser()

	const onClick = () => {
		// signOut()
		logout()
	}

	return (
		<div className='bg-white p-10 rounded-xl'>
			<form
			// action={async () => {
			// 	'use server'
			// 	await signOut()
			// }}
			>
				<button type='submit' onClick={onClick}>
					Sign out
				</button>
			</form>
		</div>
	)
}

export default page
