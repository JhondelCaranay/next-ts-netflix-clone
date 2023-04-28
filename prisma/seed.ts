import { PrismaClient } from "@prisma/client";
import { movies } from "./seed-data";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding movies...");

  // create many movies
  await prisma.movie.createMany({
    data: movies,
  });

  // using foreach
  // for (const movie of movies) {
  //   await prisma.movie.create({
  //     data: {
  //       title: movie.title,
  //       description: movie.description,
  //       videoUrl: movie.videoUrl,
  //       thumbnailUrl: movie.thumbnailUrl,
  //       genre: movie.genre,
  //       duration: movie.duration,
  //     },
  //   });
  // }

  // using map
  // movies.map(async (movie) => {
  //   await prisma.movie.create({
  //     data: {
  //       title: movie.title,
  //       description: movie.description,
  //       videoUrl: movie.videoUrl,
  //       thumbnailUrl: movie.thumbnailUrl,
  //       genre: movie.genre,
  //       duration: movie.duration,
  //     },
  //   });
  // });

  //using Promise.all
  // await Promise.all(
  //   movies.map(async (movie) => {
  //     await prisma.movie.create({
  //       data: {
  //         title: movie.title,
  //         description: movie.description,
  //         videoUrl: movie.videoUrl,
  //         thumbnailUrl: movie.thumbnailUrl,
  //         genre: movie.genre,
  //         duration: movie.duration,
  //       },
  //     });
  //   })
  // );

  console.log("Seeding completed.");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
