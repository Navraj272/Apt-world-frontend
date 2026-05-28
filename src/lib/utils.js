import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getLocalTimer } from '@/services/storageUtils';
import { useEffect, useState } from 'react';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isEmpty(value) {
  // Check for null or undefined
  // eslint-disable-next-line eqeqeq
  if (value == null) return true;

  // Check for boolean false
  if (typeof value === 'boolean') return !value;

  // Check for empty string
  if (typeof value === 'string' && value.trim() === '') return true;

  // Check for empty array
  if (Array.isArray(value) && value.length === 0) return true;

  // Check for empty object
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;

  // Check for numbers (NaN is considered empty)
  if (typeof value === 'number' && isNaN(value)) return true;

  // For other cases (e.g., valid numbers, non-empty strings, etc.), return false
  return false;
}

export const objectToFormData = (
  obj,
  form,
  namespace,
  visited = new WeakSet()
) => {
  const fd = form || new FormData();
  let formKey;

  if (visited.has(obj)) {
    throw new Error('Circular reference detected');
  }
  visited.add(obj);

  for (const property in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = `${namespace}[${property}]`;
      } else {
        formKey = property;
      }

      const value = obj[property];

      if (value === null || value === undefined) {
        // Skip null or undefined values
        continue;
      }

      if (typeof value === 'object' && !(value instanceof File)) {
        if (value instanceof Date) {
          fd.append(formKey, value.toISOString().split('T')[0]);
        } else {
          objectToFormData(value, fd, formKey, visited);
        }
      } else {
        fd.append(formKey, value); // Correctly append files here
      }
    }
  }

  return fd;
};

export const getDateTime = (dateTime) => {
  const d = new Date(dateTime);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const time = `${hours}:${minutes} ${ampm}`;

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  const formatedDateTime = `${month}-${day}-${year} ${time}`;

  return formatedDateTime;
};

export const formatAmount = (amount, showDecimals = true) => {
  if (amount === null) return '0';
  const truncateAmount = truncateDecimals(amount, 2);

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });

  return formatter.format(truncateAmount);
};

export const formatAmountInShort = (amount) => {
  if (amount >= 1000000) {
    // Format in millions (1m)
    return truncateDecimals(amount / 1000000, 3) + 'M';
  } else if (amount >= 1000) {
    // Format in thousands (1k)
    return truncateDecimals(amount / 1000, 3) + 'K';
  } else {
    // Return the amount as is (no formatting needed)
    return truncateDecimals(amount, 3);
  }
};
export const dateFormatter = (
  dateString,
  options = { format: 'YYYY-MM-DD' },
  locale = 'en-US'
) => {
  if (!dateString) return 'Invalid date';

  const date = new Date(dateString);
  if (isNaN(date)) return 'Invalid date';

  const formatDate = (format) => {
    const parts = {
      YYYY: date.getFullYear(),
      MM: String(date.getMonth() + 1).padStart(2, '0'),
      DD: String(date.getDate()).padStart(2, '0'),
      HH: String(date.getHours()).padStart(2, '0'),
      mm: String(date.getMinutes()).padStart(2, '0'),
      ss: String(date.getSeconds()).padStart(2, '0'),
    };

    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => parts[match]);
  };

  return options.format
    ? formatDate(options.format)
    : new Intl.DateTimeFormat(locale, options).format(date);
};

export const truncateDecimals = (number, digits) => {
  if (isNaN(number)) return 0;
  const factor = 10 ** digits;
  return Math.trunc(number * factor) / factor;
};

const showCustomToast = (
  toast,
  { message, status, className = '', duration = 3000 }
) => {
  const isSuccess = status === 'success';
  const isWarning = status === 'warning';

  const toastInstance = toast({
    // title: isSuccess ? 'Success!' : 'Error!',
    // description:
    //   message ||
    //   (isSuccess
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
          className="mt-1 sm:mt-2"
        /> */}
        <div>
          <p className="font-semibold text-base sm:text-lg w-full">
            {isSuccess ? 'Success' : isWarning ? 'Try Again' : 'Oops!'}
          </p>
          <p className="text-sm sm:text-base w-full">
            {message ||
              (isSuccess
                ? 'Operation completed successfully.'
                : 'Something went wrong.')}
          </p>
        </div>
      </div>
    ),
    className: `
            fixed top-4 right-4 z-[999999]
            w-fit
            text-black font-semibold border shadow-lg  rounded-xl p-4
            ${
              isSuccess
                ? 'text-green-800 bg-[#CCFED9]'
                : isWarning
                ? 'text-black bg-[#FFD795]'
                : 'text-red-800 bg-[#FFAA9B]'
            }
            ${className}
          `,
  });

  setTimeout(() => {
    toastInstance.dismiss();
  }, duration);
};

export default showCustomToast;

export const getDate = (date) => {
  if (isNaN(date)) return '';
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  const formatedDateTime = `${year}-${month}-${day}`;

  return formatedDateTime;
};

export function formatExpirationDate(expirationDate) {
  const [mm, yy] = expirationDate.split(' / ').map(Number);
  if (mm < 1 || mm > 12) {
    return 'Invalid month';
  }
  const fullYear = 2000 + yy;
  const formattedMonth = mm.toString().padStart(2, '0');

  return `${fullYear}-${formattedMonth}`;
}

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function toggleBrevoChat(shouldHide = true) {
  const brevoClass = 'brevo-chat-hidden';

  if (shouldHide) {
    document.body.classList.add(brevoClass);
  } else {
    document.body.classList.remove(brevoClass);
  }
}

export const getImageBaseUrl = (imageUrl = '') => {
  const baseUrl = process?.env?.NEXT_PUBLIC_BUCKET_URL;
  const cloudfrontURL = process?.env?.NEXT_PUBLIC_ASSETS_BASE_URL;
  if (imageUrl?.includes(baseUrl)) {
    const imageUrlWithoutBaseUrl = imageUrl?.replace(baseUrl, '');

    return `${cloudfrontURL}${imageUrlWithoutBaseUrl}`;
  } else {
    return imageUrl;
  }
};

export const useLocalTimer = (key, userId) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!userId) {
      setTime(0);
      return;
    }

    const update = () => {
      setTime(getLocalTimer(key, userId));
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [key, userId]);

  return time;
};

export const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };