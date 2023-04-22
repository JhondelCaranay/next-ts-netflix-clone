import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { authOptions } from "./api/auth/[...nextauth]";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: user } = useCurrentUser();
  return (
    <main className="">
      <h1 className="text-4xl text-green-500">Netflix Clone</h1>
      <p className="text-white">
        Welcome, <strong>{user?.name}</strong>
      </p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Sign out
      </button>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
