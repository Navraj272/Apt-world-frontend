import CustomAnimation from '@/common/components/custom-animation';
import { StateProvider } from '@/store';
import { Suspense, useEffect } from 'react';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

import Footer from '../footer/components';
import Header from '../Header/components';
import NavMobile from '../nav-mobile/components';
import { Toaster } from '../ui/toaster';

NProgress.configure({ showSpinner: false, trickleSpeed: 200, minimum: 0.08 });

export default function LayoutWrapper({ children }) {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith('/admin');

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleDone  = () => NProgress.done();
    router.events.on('routeChangeStart',    handleStart);
    router.events.on('routeChangeComplete', handleDone);
    router.events.on('routeChangeError',    handleDone);
    return () => {
      router.events.off('routeChangeStart',    handleStart);
      router.events.off('routeChangeComplete', handleDone);
      router.events.off('routeChangeError',    handleDone);
    };
  }, [router]);

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
              <div className="w-full min-h-screen flex flex-col justify-between bg-[var(--apt-offwhite)] text-[var(--apt-navy)]">
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
