import React from 'react'
import { auth } from '@/auth'

const page = async () => {
	const session = await auth()

	console.log('sesh', session)

	return <div>{JSON.stringify(session)}</div>
}

export default page
