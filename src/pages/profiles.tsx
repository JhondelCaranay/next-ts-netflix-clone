import { GetServerSideProps } from "next";
// import { authOptions } from "./api/auth/[...nextauth]";
// import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useCallback } from "react";
import { signOut } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import UserCard from "@/components/UserCard";

type ProfilesProps = {};

const Profiles = (props: ProfilesProps) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  const selectProfile = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <button className="h-10 w-full bg-white" onClick={() => signOut()}>
          Sign out
        </button>
        <h1 className="text-3xl md:text-6xl text-white text-center">Who&#39;s watching?</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => selectProfile()}>
            <UserCard name={currentUser?.name || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profiles;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // return await authentication(context.req, context.res);

  const session = await getServerSession(context.req, context.res, authOptions);

  // signOut({ callbackUrl: "/auth" }); callbackUrl not required if redirecting to /auth in server side

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  console.log("getServerSession --- ", { session });

  return {
    props: {
      session,
    },
  };
};
