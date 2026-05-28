import Header from '@/components/Header/components';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import Footer from '@/components/footer/components';
import NavMobile from '@/components/nav-mobile/components';
import { Toaster } from '@/components/ui/toaster';
import { StateProvider } from '@/store';
import { Suspense } from 'react';
import CustomAnimation from '@/common/components/custom-animation';


export default function LayoutWrapper({ children }) {
  return (
    <>
      <Suspense fallback={<CustomAnimation />}>
        <StateProvider>
          <SidebarProvider defaultOpen>
            <SidebarInset>

              <div className="w-full">
                <Header />
                <div className="w-full px-[4vw]">
                  {children}
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
