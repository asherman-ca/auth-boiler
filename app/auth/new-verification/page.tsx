import { newVerification } from '@/actions/newVerification'
import Link from 'next/link'
import React from 'react'

const page = async ({ searchParams }: { searchParams: { token: string } }) => {
	const res = await newVerification(searchParams.token)

	return (
		<div className='space-y-10 flex flex-col items-center'>
			<span>{res.message}</span>
			<span>
				{res.message === 'verification complete' ? (
					<Link href={'/settings'}>Redirect</Link>
				) : (
					<Link href={'/login'}>Login</Link>
				)}
			</span>
		</div>
	)
}

export default page
