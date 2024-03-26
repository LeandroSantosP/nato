import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const LinkBu = tv({
  base: "flex gap-1 cursor-pointer hover:bg-zinc-700/80 p-1 rounded font-semibold items-center justify-center text-[0.7rem]",
  variants: {
    variant: {
      active: "text-lg text-emerald-400",
      default: "text-lg"
    },
    size: {
      default: "",
      icon: "p-1.5"
    }
  },

  defaultVariants: {
    variant: "default"
  }
});
interface LinkButtonProps
  extends ComponentProps<"a">,
  VariantProps<typeof LinkBu> {
  content: string;
}

export default function LinkButton({
  className,
  variant,
  size,
  content,
  ...props
}: LinkButtonProps) {
  return (
    <a className={LinkBu({ className, variant, size })} {...props}>
      {content}
    </a>
  );
}
