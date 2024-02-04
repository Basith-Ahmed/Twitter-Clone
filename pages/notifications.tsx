import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  //so no one can acccess the notifications without signing in
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/", //who ever tries to access /notifications will be redirected back to home
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default function Notifications() {
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
}
