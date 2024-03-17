import { Dispatch, SetStateAction } from "react";
import * as Slider from "@radix-ui/react-slider";

export function ScaleImage({
  scale,
  setScale,
}: {
  scale: number;
  setScale: Dispatch<SetStateAction<number>>;
}) {
  function handleScaleChange(e: number[]) {
    setScale(e[0]);
  }

  return (
    <div className="flex justify-center">
      <Slider.Root
        className="relative flex h-5 w-[200px] cursor-pointer touch-none select-none items-center"
        defaultValue={[0]}
        onValueChange={handleScaleChange}
        value={[scale]}
        max={2}
        min={1}
        step={0.01}
      >
        <Slider.Track className="relative h-1 grow rounded-full bg-[#9D83F9]">
          <Slider.Range className="absolute h-full rounded-full bg-[#7C01F6]" />
        </Slider.Track>
        <Slider.Thumb
          className="block h-3 w-3 rounded-[10px] bg-[#7C01F6] focus:outline-none"
          style={{
            filter:
              "drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.20)) drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.12)) drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.14))",
          }}
          aria-label="Volume"
        />
      </Slider.Root>
    </div>
  );
}
