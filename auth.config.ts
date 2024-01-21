// workaround to make nextauth's Prisma adapter edge compatible

import GitHub from 'next-auth/providers/github'

import type { NextAuthConfig } from 'next-auth'

export default {
	providers: [GitHub],
} satisfies NextAuthConfig
