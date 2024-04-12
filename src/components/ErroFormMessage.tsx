import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const ErroMessage = tv({
  base: "text-sm w-full",
  variants: {
    variant: {
      default: " text-red-500",
      active: " text-yellow-500"
    }
  },

  defaultVariants: {
    variant: "default"
  }
});

interface LinkButtonProps
  extends ComponentProps<"p">,
    VariantProps<typeof ErroMessage> {
  message: string;
}

export default function ErrorFormMessage({
  message,
  className,
  variant,
  ...props
}: LinkButtonProps) {
  return (
    <p className={ErroMessage({ className, variant })} {...props}>
      {message}
    </p>
  );
}
