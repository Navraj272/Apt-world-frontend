import CustomAnimation from '@/common/components/custom-animation';
import { StateProvider } from '@/store';
import { Suspense } from 'react';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';

import Footer from '../footer/components';
import Header from '../Header/components';
import NavMobile from '../nav-mobile/components';
import { Toaster } from '../ui/toaster';
export default function LayoutWrapper({ children }) {
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
