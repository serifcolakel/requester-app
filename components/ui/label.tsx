"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-primary",
        destructive: "text-destructive",
        secondary: "text-blue-600",
        gray: "text-gray-600",
      },
      size: {
        default: "text-base",
        xs: "text-xs",
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
        xl: "text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "xs",
    },
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, variant, ...props }, ref) => (
  <LabelPrimitive.Root
    className={cn(labelVariants({ variant }), className)}
    ref={ref}
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
