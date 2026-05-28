'use client';

// import { eye, eyeOff } from '@/assets/svg';
import { ELEMENT } from '@/common/form-control';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import Image from 'next/image';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

const CustomForm = ({
  controls = [],
  onSubmit = () => {},
  buttonName = 'Save',
  form = {},
  loading = false,
  isButtonDisable = false,
  buttonClassName = '',
}) => {
  const [showPassword, setShowPassword] = useState({});
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="gap-[23px]">
      <div className="w-full sm:grid grid-cols-2 gap-4 mt-3 border-b border-[var(--border-bottom)] mb-4 pb-4 ">
        {controls?.map((item) => {
          const Component = ELEMENT[item.type];
          const isPassword = item.isPassword;
          const isSelect = item.type === 'select';
          const isSwitch = item.type === 'switch';
          return (
            <Controller
              key={item.name}
              control={form.control}
              name={item.name}
              rules={{
                required: item.required,
                pattern: item.pattern,
                validate: item.validate,
                min: item?.min,
                max: item?.max,
                minLength: item?.minLength,
                maxLength: item?.maxLength,
              }}
              render={({ field, fieldState }) => (
                <div
                  className={`flex flex-col gap-1 mt-3 ${item.className || ''}`}
                >
                  <label className="text-[rgba(255,255,255,1)] font-lexend font-normal text-[14px] leading-[21px] tracking-[0%]">
                    {item.label}
                  </label>
                  <div className="relative">
                    {isSwitch ? (
                      <div
                        className={`flex items-center justify-between w-full p-4 md:py-0 text-white rounded-[0.5rem] md:h-[2.5rem] ${item.wrapperClassName || ''}`}
                      >
                        {item.info && (
                          <Popover
                            open={openIndex === item.name}
                            onOpenChange={(val) =>
                              setOpenIndex(val ? item.name : null)
                            }
                          >
                            <PopoverTrigger asChild>
                              <span
                                className="bg-transparent hover:bg-transparent focus:outline-none focus:ring-0"
                                onMouseEnter={() => setOpenIndex(item.name)}
                                onMouseLeave={() => setOpenIndex(null)}
                              >
                                <Component
                                  checked={
                                    field.value === true ||
                                    field.value === 'true'
                                  }
                                  onCheckedChange={field.onChange}
                                  disabled={item.isFieldDisabled}
                                  ref={field.ref}
                                  className={item.switchClassName}
                                  thumbClassName={item.thumbClassName}
                                />
                              </span>
                            </PopoverTrigger>

                            <PopoverContent
                              onMouseEnter={() => setOpenIndex(item.name)}
                              onMouseLeave={() => setOpenIndex(null)}
                              side="top"
                              className="mb-3 bg-[rgb(var(--header))] w-[20rem] text-white rounded-lg p-2 shadow-lg focus:outline-none focus:ring-0 text-sm ml-5"
                            >
                              {item.info}
                            </PopoverContent>
                          </Popover>
                        )}
                      </div>
                    ) : isSelect ? (
                      <Component
                        selectedValue={field.value}
                        onValueChange={field.onChange}
                        placeholder={item.placeholder}
                        // contentClassName="max-h-[280px] h-auto"
                        contentclassname={` ${item?.contentclassname}`}
                        {...field}
                        options={item.options}
                        disabled={item.isFieldDisabled}
                        className="w-full p-4 text-white rounded-[10px] border-none bg-[rgb(var(--level-background))] focus:outline-none focus:border-orange-500 md:h-[40px] text-sm"
                      />
                    ) : (
                      <Component
                        type={
                          isPassword
                            ? showPassword[item.name]
                              ? 'text'
                              : 'password'
                            : item.type
                        }
                        placeholder={item.placeholder}
                        {...field}
                        {...item.type}
                        options={item.options}
                        disabled={item.isFieldDisabled}
                        contentclassname={` ${item?.contentclassname}`}
                        className="w-full p-4 text-white rounded-[10px] border-none bg-[rgb(var(--level-background))] focus:outline-none focus:border-orange-500 md:h-[40px]"
                      />
                    )}
                    {isPassword && (
                      <div
                        onClick={() => togglePasswordVisibility(item.name)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      >
                        {/* <Image
                          src={showPassword[item.name] ? eyeOff : eye}
                          alt="toggle visibility"
                          width={24}
                          height={24}
                          loading="lazy"
                        /> */}
                      </div>
                    )}
                  </div>
                  {fieldState.error && (
                    <span className="text-red-500 text-xs mt-1">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              )}
            />
          );
        })}
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className={`bg-button-bg backdrop-blur-[30px] shadow-[0px_0px_16px_0px_rgba(255,146,0,0.55)] mt-3 text-white px-6 py-3 font-lexend rounded-[8px] ${buttonClassName}`}
          loading={loading}
          disabled={loading || isButtonDisable}
        >
          {buttonName}
        </Button>
      </div>
    </form>
  );
};

export default CustomForm;
