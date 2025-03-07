import Sidebar from '@/components/ui/sidebar'
import Header from '@/components/ui/header'
import { AuthProvider } from '@/app/contexts/AuthContext'
import AppProvider from '@/app/app-provider'
import ProtectedRoute from './settings/permissions/ProtectedRoute'
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <AuthProvider>
      <AppProvider>
        <ProtectedRoute>
          <div className="flex h-[100dvh] overflow-hidden">

            {/* Sidebar */}
            <Sidebar />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

              {/*  Site header */}
              <Header />

              <main className="grow [&>*:first-child]:scroll-mt-16">
                {children}
              </main>        

            </div>

          </div>
        </ProtectedRoute>
      </AppProvider>
    </AuthProvider>
  )
}
