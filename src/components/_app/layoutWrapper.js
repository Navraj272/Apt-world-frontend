import Header from '@/components/Header/components';
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
          <Header />
          <div className="w-full min-h-screen flex flex-col justify-between bg-white text-black">
            <main className="w-full flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <NavMobile />
          <Toaster />
        </StateProvider>
      </Suspense>

    </>
  );
}
