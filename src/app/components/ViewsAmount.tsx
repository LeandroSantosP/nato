import { Eye } from "lucide-react";
import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const vi = tv({
  base: "flex gap-1 font-bold items-center justify-center text-[0.7rem]",
  variants: {
    variant: {
      default: "flex gap-1 font-bold items-center justify-center text-[0.7rem]",
      primary: "flex gap-1 font-bold items-center justify-center text-[0.5rem]"
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

export interface ViesProps
  extends ComponentProps<"div">,
    VariantProps<typeof vi> {
  content?: string;
  btSize?: number;
}

export default function ViewsAmount({
  className,
  variant,
  size,
  content = "870 views",
  btSize = 20,
  ...props
}: ViesProps) {
  return (
    <div className={vi({ className, variant, size, ...props })}>
      <Eye className="text-my-green-two font-bold" size={btSize} />
      {content}
    </div>
  );
}
