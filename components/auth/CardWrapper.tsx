'use client'
import { FC } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'

interface CardWrapperProps {
	children: React.ReactNode
	headerLabel: string
	backButtonLabel: string
	backButtonHref: string
	showSocial?: boolean
}

export const CardWrapper: FC<CardWrapperProps> = ({
	children,
	headerLabel,
	backButtonLabel,
	backButtonHref,
	showSocial,
}) => {
	return (
		<Card>
			<CardHeader>{headerLabel}</CardHeader>
			<CardContent>{children}</CardContent>
			<CardFooter>{backButtonLabel}</CardFooter>
		</Card>
	)
}
