import { useRouter } from 'next/router';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function CustomSelect({
  options = [],
  selectedValue,
  onValueChange,
  placeholder = '',
  className,
  contentclassname = '',
  itemClassName = '',
  isDisabled = false,
  disabled = false,
}) {
  const router = useRouter();

  const handleChange = (value) => {
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption?.url) {
      router.push(selectedOption.url);
    }
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <Select value={selectedValue} onValueChange={handleChange}>
      <SelectTrigger
        className={`w-[180px] md:h-[46px] border-0 border-none rounded-2xl py-2 p-1 sm:px-3 font-lexend font-medium text-[16px] leading-[24px] tracking-[0%] text-white border-[rgb(var(--button-border))] hover:bg-button-bg bg-[var(--select-popup-background)] ${className}`}
        disabled={disabled}
      >
        <SelectValue
          placeholder={placeholder}
          className="text-white text-[12px] md:text-[16px] leading-[18px] md:leading-[18px]"
        />
      </SelectTrigger>
      <SelectContent className={`bg-[#1B2846] border-none ${contentclassname}`}>
        <SelectGroup>
          {/* If you want the label in white, uncomment this */}
          {/* <SelectLabel className="text-white">{label}</SelectLabel> */}
          {options?.map((option) => (
            <SelectItem
              disabled={isDisabled}
              key={option?.value}
              value={option?.value}
              className={`text-white  bg-[#1B2846] focus:bg-button-bg ${itemClassName} transition-transform duration-300 ease-out active:scale-90`}
            >
              <span className="text-[12px] md:text-[16px] leading-[18px] md:leading-[18px]">
                {option?.label}
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CustomSelect;
