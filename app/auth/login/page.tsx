import { LoginForm } from '@/components/auth/LoginForm'
import { FC } from 'react'

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	return (
		<div>
			<LoginForm />
		</div>
	)
}

export default page
