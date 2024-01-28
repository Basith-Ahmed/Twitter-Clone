import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IconType } from "react-icons";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import { BiLogOut } from "react-icons/bi";

export default function Sidebar() {

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
    },
    {
      label: "Profile",
      href: "/users/123",
      icon: FaUser,
    }
  ];

  return (
    <div className="col-span-1 h-full p-4 pt-1">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
            <SidebarLogo />
            {items.map((item) => (
                <SidebarItem 
                key={item.href}
                label={item.label}
                href={item.href}
                icon={item.icon}
                />
            ))}
            <SidebarItem onClick={() => {}} icon={BiLogOut} label="Logout" />
            <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
}
