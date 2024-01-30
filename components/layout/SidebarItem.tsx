import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModel from "@/hooks/useLoginModel";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

interface SidebarItemProps {
  //typescript things
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
}

export default function SidebarItem({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
}: SidebarItemProps) {
  const loginModel = useLoginModel();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }
    if (auth && !currentUser) {
      loginModel.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, currentUser, auth, loginModel]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      {/* for phones */}
      <div className="relative lg:hidden rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        <Icon size={28} color="white" />
      </div>
      {/* for desktop */}
      <div className="relative hidden lg:flex w-full items-start gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        <Icon size={28} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
}

//first declared completely hidden, then when lg: it shows --> desktop and wise versa
