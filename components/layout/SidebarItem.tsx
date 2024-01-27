import React from "react";
import { IconType } from "react-icons";

interface SidebarItemProps { //typescript things
    label: string;
    href?: string;
    icon: IconType;
    onClick?: () => void;
}

export default function SidebarItem({ label, href, icon: Icon, onClick }: SidebarItemProps) {
    return (
        <div className="flex flex-row items-center">
            {/* for phones */}
            <div className="relative lg:hidden rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer"> 
                <Icon size={28} color='white' />
            </div>
            {/* for desktop */}
            <div className="relative hidden lg:flex w-full items-start gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
                <Icon size={28} color='white' />
                <p className="hidden lg:block text-white text-xl">{label}</p>
            </div>
        </div>
    );
}

//first declared completely hidden, then when lg: it shows --> desktop and wise versa