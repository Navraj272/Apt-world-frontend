import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      spellCheck="false"
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border border-white/50 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-[1px] focus:border-[#ffe02f] focus-visible:!input-outline-override',
        className
      )}
      ref={ref}
      {...props}
      suppressHydrationWarning
    />
  );
});
Input.displayName = 'Input';

export { Input };
