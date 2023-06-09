import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { GetServerSideProps, NextPageContext } from "next";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Image from "next/image";

type Props = {};

const Auth = (props: Props) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => (currentVariant === "login" ? "register" : "login"));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        // callbackUrl: "/", // optional
      });
      router.push("/profiles");
    } catch (error) {
      console.log({ error });
      setEmail("");
      setPassword("");
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      await login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          {/* <img src="/images/logo.png" alt="logo" className="h-12" />- */}
          <div className="relative h-12">
            <Image
              src={"/images/logo.png"}
              alt="logo"
              className="object-contain object-left"
              fill
              // sizes="100vw"
              priority
            />
          </div>
        </nav>
        <div className="flex justify-center">
          <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            {/* inputs */}
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  type="text"
                  id="name"
                  label="Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              )}
              <Input
                type="text"
                id="email"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <Input
                type="password"
                id="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            {/* button */}
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>

            {/* social login buttons */}
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={32} />
              </div>
            </div>

            {/* navigations */}
            <p className="text-neutral-500 mt-12">
              {variant === "login" ? "First time using Netflix?" : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
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
