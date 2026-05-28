'use client';
// import { suffleChipsAnimation } from '@/assets/json';
// import dynamic from 'next/dynamic';

// const Lottie = dynamic(() => import('lottie-react'), { ssr: false });


const CustomAnimation = () => {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <div className="w-[200px] sm:w-[300px]">
      {/* <Lottie 
        animationData={suffleChipsAnimation} 
        autoplay={true} 
        loop={true} 
        initialSegment={[0, 61]} 
      /> */}
      </div>
    </div>
  );
};

export default CustomAnimation;
