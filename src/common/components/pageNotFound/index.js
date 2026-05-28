import Link from 'next/link';
// import { blackHatAnimation, serchingFolderAnimation } from '@/assets/gif';
// import Image from 'next/image';
import { memo } from 'react';

const PageNotFound = ({ className = '' }) => {
  return (
    <div
      className={`flex flex-col items-center mt-4 justify-center h-[300px]  ${className}`}
    >
      <div className="relative w-[300px] flex justify-center items-center">
        {/* <div className="flex relative w-[138px] sm:w-[168px] lg:w-[215px]">
          <Image
            src={blackHatAnimation}
            alt="No data available"
            width={180}
            height={180}
            className="w-[113px] h-[110px] sm:w-[133px]  sm:h-[130px] lg:w-[163px]  lg:h-[160px]"
            loading="lazy"
          />
          <Image
            src={serchingFolderAnimation}
            alt="No data available"
            width={180}
            height={180}
            className="w-[53px] h-[52px]  sm:w-[73px]  sm:h-[72px] lg:w-[103px]  lg:h-[102px] bottom-0 right-0 absolute"
            loading="lazy"
          />
        </div> */}
        <div className=" absolute -bottom-7  bg-[rgb(var(--button-border))] font-bold text-[20px] lg:text-[25px]  text-white  text-center px-4 py-1 rounded-md">
          Page Not Found!
        </div>
      </div>
      <div className=" mt-8 z-30">
        <Link href="/" className="text-yellow-500 underline">Return Home</Link>
      </div>
    </div>
  );
};

export default memo(PageNotFound);