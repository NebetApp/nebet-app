import React from 'react'
import { createAppKit } from '@reown/appkit/react'
import { base } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

// 0) Query Client for Wagmi
const queryClient = new QueryClient()

// 1) Project ID - Replace with your Reown Cloud Project ID
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'YOUR_PROJECT_ID'

// 2) App metadata
const metadata = {
  name: 'Nebet',
  description: 'Empowering health with trust and technology',
  url: 'https://localhost', // Update in production
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 3) Networks
const networks = [base]

// 4) Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({ networks, projectId, ssr: true })

// 5) Create AppKit modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: { analytics: true },
})

export default function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
