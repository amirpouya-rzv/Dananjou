"use client"
import { ComponentProps, useState } from "react"

function AppButton({ title, className, ...rest }: ComponentProps<'button'>) {
    const [visible, setVisible] = useState(false);
    return (
        <div>
            <button className={`text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2 ${className}`}
                onClick={() => setVisible(true)} >{title}</button >
            
        </div>


    )
}

export default AppButton