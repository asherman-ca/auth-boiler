import { FC } from 'react'
import { CardWrapper } from './CardWrapper'

interface LoginFormProps {}

export const LoginForm: FC<LoginFormProps> = ({}) => {
	return (
		<CardWrapper
			headerLabel='Welcome back'
			backButtonHref='/auth/register'
			backButtonLabel="Don't have an account?"
			showSocial
		>
			Sign in
		</CardWrapper>
	)
}
