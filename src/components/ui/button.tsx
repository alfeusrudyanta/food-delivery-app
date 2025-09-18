import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none outline-none cursor-pointer text-sm md:text-md',
  {
    variants: {
      variant: {
        default:
          'rounded-[100px] gap-2 p-2 bg-primary-100 font-bold text-neutral-25',
        blank: 'rounded-[12px]',
      },
      size: {
        default: 'h-12 w-full',
        blank: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
