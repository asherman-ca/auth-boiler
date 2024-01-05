'use client'
import * as z from 'zod'

import { FC, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'

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
	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		startTransition(() => {
			login(values)
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
					<FormError message='' />
					<FormSuccess message='' />
					{isPending && (
						<div className='flex justify-center'>
							<div className='w-6 h-6 border-2 border-emerald-500 rounded-full animate-spin'></div>
						</div>
					)}
					<Button type='submit' className='w-full' disabled={isPending}>
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
