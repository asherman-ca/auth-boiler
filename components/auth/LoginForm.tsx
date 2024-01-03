import { FC } from 'react'
import { CardWrapper } from './CardWrapper'

interface LoginFormProps {}

export const LoginForm: FC<LoginFormProps> = ({}) => {
	return (
		<CardWrapper
			headerLabel='Welcome back'
			backButtonHref='/'
			backButtonLabel='Back to home'
		>
			Beans
		</CardWrapper>
	)
}
