import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
type onchanging = {
  onValueChanges: (changedNum: number) => void;
};
type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderDemo({ className, ...props }: SliderProps) {
  return (
    <Slider
      defaultValue={[0]}
      max={100}
      step={1}
      //   onValueChange={}
      className={cn("w-[60%]", className)}
      {...props}
    />
  );
}
