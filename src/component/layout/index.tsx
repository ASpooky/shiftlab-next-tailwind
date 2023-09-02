import Header from '../header'
import Footer from '../footer'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({})

export default function Layout({ children }: any) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <div className="flex flex-col h-screen">
          <Header />
          <main className="py-5 grow Project">{children}</main>
          <Footer />
        </div>
      </QueryClientProvider>
    </>
  )
}
