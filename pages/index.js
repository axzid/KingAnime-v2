import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Head from "next/head";

//get server side props next js fetch data from api
export async function getServerSideProps() {
  const res = await fetch("https://kinganimeapi.herokuapp.com/api/page/1");
  const data = await res.json();
  return {
    props: { data },
  };
}

export default function Home({ data }) {
  const [anime, setAnime] = useState(data);

  useEffect(() => {
    setAnime(data);
  }, [data]);

  return (
    <>
      <Head>
        <title>King Anime</title>
        <meta
          name="description"
          content="King Anime adalah situs download anime batch"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="AXZID" />
        <meta
          name="keywords"
          content="King Anime, Anime Batch, Anime Sub Indo"
        />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Indonesia" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="King Anime" />
      </Head>
      <Header />
      <div className="container mx-auto">
        <div className="grid grid-cols-1  gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {anime.map((anime) => (
            <div
              key={anime.title}
              className=" grid grid-cols-1 rounded-lg bg-amber-200 "
            >
              <Image
                src={anime.link.thumbnail}
                width={200}
                height={200}
                alt={anime.title}
                className="rounded-t-lg"
              ></Image>
              <div className=" mt-3 p-2">
                <Link href={`anime/${anime.link.endpoint}`}>
                  <h2 className="cursor-pointer text-sm font-bold lg:text-xl">
                    {anime.title}
                  </h2>
                </Link>
                <div className="  mt-3 flex flex-wrap">
                  {anime.genre.map((genre) => (
                    <span
                      key={genre}
                      className="mx-1 mb-1 rounded-sm bg-white px-2 text-[10px]  font-semibold text-slate-600  lg:text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
