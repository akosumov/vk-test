'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
const client = new QueryClient()
interface QueryProviderProps {
	children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
