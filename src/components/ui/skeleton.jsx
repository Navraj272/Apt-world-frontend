import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
    suppressHydrationWarning={true}
      className={cn('animate-pulse rounded-md bg-primary/10 bg-[#102f5c]', className)}
      {...props} />)
  );
}

export { Skeleton };
