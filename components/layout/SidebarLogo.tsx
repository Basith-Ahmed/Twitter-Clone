import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";

export default function SidebarLogo() {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push("/");
      }}
      className="rounded-full 
    p-4 
    flex 
    flex-row
    items-center  
    hover:bg-blue-300 
    hover:bg-opacity-10 
    cursor-pointer transition"
    >
      <BsTwitter size={28} className="text-sky-500" />
      <h1 className="hidden lg:block font-semibold text-sky-500 ml-4 text-xl">Twitter</h1>
    </div>
  );
}
