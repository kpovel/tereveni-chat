import { ReactNode } from "react";

export default function ModalContainer({
  children,
  elemRef,
}: {
  children: ReactNode | null;
  elemRef: any;
}) {
  return (
    <div className="absolute z-10 h-full w-full bg-opacity-50 bg-cover bg-fixed bg-center bg-no-repeat backdrop-blur-sm backdrop-filter">
      <div className="relative h-full">
        <div
          ref={elemRef}
          className="absolute rounded-lg left-2/4 top-2/4 h-[159px] w-[280px] -translate-x-[50%] -translate-y-[50%] bg-[#FAFAFA] p-6"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
