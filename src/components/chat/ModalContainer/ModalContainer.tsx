import { useEffect, useRef, MouseEvent, ReactNode } from 'react';

export default function ModalContainer({children, elemRef}: {children: ReactNode, elemRef: any}) {

    return (
        <div className="absolute w-full h-full bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-50 backdrop-filter backdrop-blur-sm z-10">
            <div className="relative h-full">
                <div ref={elemRef} className="absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%] w-[280px] h-[159px] bg-[#FAFAFA] p-6">
                {children}
                </div>
            </div>
        </div>
    )
}