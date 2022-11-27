//search anime page server side props next js fetch data from api

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "../../components/Header";

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://kinganimeapi.herokuapp.com/api/cari/${context.params.anime}`
  );
  const data = await res.json();
  return {
    props: { data },
  };
}

export default function Search({ data }) {
  return (
    <>
      <Header />

      <div className="container mx-auto">
        <div className="grid grid-cols-1  gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((anime) => (
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
                <Link href={`/anime/${anime.link.endpoint}`}>
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
