'use client';

// import { calendarIcon } from '@/assets/svg';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, dateFormatter } from '@/lib/utils';
import { formatInTimeZone } from 'date-fns-tz';
// import Image from 'next/image';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CustomDatePicker({
  onChange,
  className,
  contentclassname = '',
  disabled = false,
  ...props
}) {
  const maxDate = React.useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    return d;
  }, []);
  const minDate = React.useMemo(() => new Date(), []);
  const [date, setDate] = React.useState(props.value);
  const [isOpen, setIsOpen] = React.useState(false);

  const formatAndOnChange = (selectedDate) => {
    if (!selectedDate) {
      setDate(null);
      onChange?.(null);
      return;
    }

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const now = new Date();

    const combinedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );

    const isoDate = formatInTimeZone(
      combinedDate,
      timeZone,
      'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX'
    );
    setDate(selectedDate);
    onChange?.(isoDate);
  };
  const handleSelect = (selectedDate) => {
    formatAndOnChange(selectedDate);
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (props.value) {
      setDate(props.value);
    } else {
      setDate(null);
    }
  }, [props.value]);

  const displayDate = props.value || date;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        asChild
        className="hover:bg-button-bg"
        disabled={disabled}
      >
        <Button
          // variant="default"
          className={cn(
            'w-full justify-start text-left font-normal p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-white hover:bg-button-bg ',
            !displayDate && 'text-gray-500',
            className
          )}
        >
          <div className="flex justify-between items-center w-full">
            {props.value ? (
              dateFormatter(props.value)
            ) : (
              <span>Pick a date</span>
            )}
            {/* <Image
              alt="calendar"
              src={calendarIcon}
              width={24}
              height={24}
              loading="lazy"
            /> */}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`w-auto p-0 bg-white rounded-lg shadow-lg  border border-gray-200 ${contentclassname}`}
        align="start"
      >
        <DatePicker
          selected={date || (props.type !== 'full' ? maxDate : null)}
          onChange={handleSelect}
          showTimeSelect={false}
          inline
          showYearDropdown
          dropdownMode="select"
          maxDate={props?.type === 'full' ? '' : maxDate}
          minDate={props?.type === 'full' ? minDate : ''}
          onClickOutside={() => setIsOpen(false)}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}

export default CustomDatePicker;
