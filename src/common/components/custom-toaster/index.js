'use client';

import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
// import Image from 'next/image';
// import { successIcon,errorIcon } from '@/assets/png';

const CustomToast = ({
  showToast,
  setShowToast,
  message,
  status,
  duration = 3000,
  className = '',
}) => {
  const { toast } = useToast();
  const isSuccess = status === 'success';
  useEffect(() => {
    if (showToast) {
      toast({
        // title: status === 'success' ? 'Success!' : 'Error!',
        // description:
        //   message ||
        //   (status === 'success'
        //     ? 'Operation completed successfully.'
        //     : 'Something went wrong.'),
        title: '', 
        description: (
          <div className="flex items-start gap-3">
            {/* <Image
              src={isSuccess ? successIcon : errorIcon} 
              alt="Success"
              width={30}
              height={30}
              className=" mt-2"
              loading="lazy"
            /> */}
            <div>
              <p className="font-semibold text-lg">{isSuccess ? 'Success' : 'Error!'}</p>
              <p>{message || (isSuccess ? 'Operation completed successfully.' : 'Something went wrong.')}</p>
            </div>
          </div>
        ),
        onClose: () => setShowToast(false),
        className: `fixed top-4 right-4  z-[999999999] break-words  w-[90%] sm:w-[45%] md:w-[30%] font-semibold border border-r-10 shadow-lg rounded-xl p-4 ${
          isSuccess
            ? 'text-green-800 bg-green-200'
            : 'text-red-800 bg-red-300'
        } ${className}`,
      });
      const timeout = setTimeout(() => {
        setShowToast(false);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [showToast, message, status, toast, setShowToast, duration]);
};

export default CustomToast;
