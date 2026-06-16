import CustomAnimation from '@/common/components/custom-animation';
import { StateProvider } from '@/store';
import { Suspense } from 'react';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import { useRouter } from 'next/router';

import Footer from '../footer/components';
import Header from '../Header/components';
import NavMobile from '../nav-mobile/components';
import { Toaster } from '../ui/toaster';

export default function LayoutWrapper({ children }) {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Suspense fallback={<CustomAnimation />}>
        <StateProvider>
          <div className="w-full min-h-screen bg-[#070e1e] text-white">
            <main className="w-full">
              {children}
            </main>
            <Toaster />
          </div>
        </StateProvider>
      </Suspense>
    );
  }

  return (
    <>
      <Suspense fallback={<CustomAnimation />}>
        <StateProvider>
          <Header />
          <SidebarProvider defaultOpen>
            <SidebarInset>
              <div className="w-full min-h-screen flex flex-col justify-between bg-white text-black">
                <main className="w-full flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </SidebarInset>
          </SidebarProvider>
          <NavMobile />
          <Toaster />
        </StateProvider>
      </Suspense>
    </>
  );
}
