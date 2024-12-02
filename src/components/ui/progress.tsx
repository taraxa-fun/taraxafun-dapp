import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  fillColor?: string; // Couleur de la partie remplie
  backgroundColor?: string; // Couleur de l'arrière-plan (non remplie)
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    { className, value, fillColor = "bg-primary", backgroundColor = "bg-secondary", ...props },
    ref
  ) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full",
        backgroundColor, // Couleur d'arrière-plan dynamique
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full flex-1 transition-all", fillColor)} // Couleur de la partie remplie
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
