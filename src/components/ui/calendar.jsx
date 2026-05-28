'use client';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { chevronLeft, chevronRight } from '@/assets/svg';
import Image from 'next/image';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('w-full', className)}
      classNames={{
        months: 'w-full  gap-y-4 sm:gap-x-4 sm:gap-y-0',
        month: 'gap-y-6 pt-2 w-[200px] p-1 mt-1 text-white',
        month_grid: 'w-full border-collapse gap-y-1',
        caption: 'flex justify-center items-center pt-2 relative',
        caption_label: 'text-sm font-semibold   z-0 text-md absolute top-2 left-1/2 -translate-x-1/2    flex justify-center items-center',
        nav: 'space-x-1 flex items-center text-white justify-between ',
        button_previous: 'absolute left-2 invert z-[99]',
        button_next: 'absolute right-2 invert z-[99]',
        weekdays: 'text-lg',
        weekday: 'text-white rounded-md font-semibold text-[1rem]',
        week: '',
        day: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary [&:has([aria-selected])]:rounded-md focus-within:relative focus-within:z-20 ',
        day_button: 'w-7 h-7 text-center p-0 font-normal aria-selected:opacity-100 bg-transparent hover:bg-navHoverBackground text-white hover:text-primary',
        selected: ' bg-button-bg text-white hover:text-primary-foreground focus:bg-primary focus:text-white ',
        // today: 'bg-accent text-accent-foreground',
        outside: 'text-muted-foreground opacity-50',
        disabled: 'text-muted-foreground opacity-50',
        range_middle: 'aria-selected:bg-button-bg aria-selected:text-primary-foreground',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <Image src={chevronLeft} alt="chevronleft" className="h-4 w-4 bg-white" height={16} width={16}/>,
        IconRight: () => <Image src={chevronRight} alt="chevronright" className="h-4 w-4 invert" height={16} width={16}/>,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
