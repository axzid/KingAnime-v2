import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

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
      <Header />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 ">
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
                <div className=" mt-8 flex flex-wrap justify-end">
                  {anime.genre.map((genre) => (
                    <span
                      key={genre}
                      className="mx-1 mb-1 rounded-sm bg-amber-400 px-2 text-[10px]  text-white  lg:text-sm"
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
