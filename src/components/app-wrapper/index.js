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
              <div className="w-full">
                <div className="w-full px-[4vw] bg-[hsl(var(--main-background))]">
                  <div className="max-w-[1350px] w-full mt-[11px] gap-[24px] mx-auto">
                    {children}
                  </div>
                </div>
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
