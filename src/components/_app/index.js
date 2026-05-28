import dynamic from 'next/dynamic';
import 'nprogress/nprogress.css';
import CustomAnimation from '@/common/components/custom-animation';
import SEOTags from '@/common/SEOTags';
import withStore from './store';
const LayoutWrapper = dynamic(() => import('@/components/app-wrapper'), {
  loading: () => <CustomAnimation />,
  ssr: false,
});
export const metadata = {
  title: 'Apt World',
  description:
    'Apt World',
  icons: {
    icon: '/favicon.ico',
  },
  referrer: 'origin',
};

function MyApp({ Component, pageProps }) {

  return (
    <>
      <SEOTags />

      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </>
  );
}

export default withStore(MyApp);
