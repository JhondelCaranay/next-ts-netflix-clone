import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { authOptions } from "./api/auth/[...nextauth]";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import useMovieList from "@/hooks/useMovieList";
import MovieList from "@/components/MovieList";
import useFavorites from "@/hooks/useFavorites";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: movies = [], error } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { data: currentUser } = useCurrentUser();
  if (error) {
    console.log(error);
  }

  // const {isOpen, closeModal} = useInfoModalStore();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <pre className="text-white">{JSON.stringify(currentUser?.favoriteIds, null, 2)}</pre>
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
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
