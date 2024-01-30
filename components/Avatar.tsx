import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Image from "next/image";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

export default function Avatar({ userId, isLarge, hasBorder }: AvatarProps) {
  const router = useRouter();
  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation(); //maybe the parent element will have a on click function, this will disable the funcion of parent in its area and do its own onclick function
      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  ); //<---- dependancy array, all the things that depend on this callback

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
}
