'use client'
import * as z from 'zod'

import { FC, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { CardWrapper } from './CardWrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '@/components/formError'
import { FormSuccess } from '@/components/formSuccess'
import { login } from '@/actions/login'

interface LoginFormProps {}

export const LoginForm: FC<LoginFormProps> = ({}) => {
	const searchParams = useSearchParams()
	const [isPending, startTransition] = useTransition()
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email already in use with different provider!'
			: ''

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('')
		setSuccess('')

		startTransition(() => {
			login(values).then((data) => {
				setError(data?.error)
				// TODO: add when we add 2FA
				setSuccess(data?.success)
			})
		})
	}

	return (
		<CardWrapper
			headerLabel='Welcome back'
			backButtonHref='/auth/register'
			backButtonLabel="Don't have an account?"
			showSocial
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='john.doe@example.com'
											type='email'
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='******'
											type='password'
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button type='submit' className='w-full' disabled={isPending}>
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
