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
        h1: "text-[56px] leading-8",
        h2: "text-[48px] leading-7",
        h3: "text-[40px] leading-6",
        h4: "text-[32px] leading-5",
        h5: "text-[24px] leading-4",
        h6: "text-[20px] leading-3",
        "label-xl": "text-[24px] leading-8",
        "label-lg": "text-[18px] leading-7",
        "label-md": "text-[16px] leading-6",
        "label-sm": "text-[14px] leading-5",
        "label-xs": "text-[12px] leading-4",
        "paragraph-xl": "text-[24px] font-normal leading-8",
        "paragraph-lg": "text-[18px] font-normal leading-7",
        "paragraph-md": "text-[16px] font-normal leading-6",
        "paragraph-sm": "text-[14px] font-normal leading-5",
        "paragraph-xs": "text-[12px] font-normal leading-4",
        "subheading-md": "text-[16px] font-medium leading-6",
        "subheading-sm": "text-[14px] font-medium leading-5",
        "subheading-xs": "text-[12px] font-medium leading-4",
        "subheading-xxs": "text-[10px] font-medium leading-3",
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
