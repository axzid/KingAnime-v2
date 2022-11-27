import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import InfoCard from "../../components/infoCard";

//get server side props next js fetch data from api
export async function getServerSideProps(context) {
  const res = await fetch(
    `https://kinganimeapi.herokuapp.com/api/anime/${context.params.id}`
  );
  const data = await res.json();
  return {
    props: { data },
  };
}

export default function Anime({ data }) {
  const download = data.list_download[0][1];

  console.log(download);
  return (
    <>
      <Header />
      <div className="container mx-auto p-4  ">
        <div className="rounded-md bg-amber-100 p-4">
          <Image
            src={data.thumbnail}
            width={500}
            height={400}
            alt={data.title}
            className="rounded-t-lg"
          />
          <h1 className="text-xl font-bold">{data.title}</h1>
          <h2>
            <span className="font-bold">Genre: </span>
            {data.genre.map((genre) => (
              <span key={genre.name}>{genre.name}, </span>
            ))}
          </h2>
          <InfoCard title={`Japanese: `} value={data.japanese} />
          <InfoCard title={`Type: `} value={data.type} />
          <InfoCard title={`Status: `} value={data.status} />
          <InfoCard title={`Episodes: `} value={data.total_eps} />
          <InfoCard title={`Duration: `} value={data.durasi} />
          <InfoCard title={`Rating: `} value={data.score} />
          <InfoCard title={`Release: `} value={data.release} />
          <InfoCard title={`Sinopsis: `} value={data.sinopsis} />

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {download.map((download) => (
              <div
                className="my-2 rounded-md bg-amber-300 p-2"
                key={download.resolusi}
              >
                <p className="rounded-sm bg-black text-center font-bold text-white">
                  Download {download.resolusi}
                </p>
                <ul className="flex flex-wrap gap-2 py-6">
                  {download.link_download.map((link) => (
                    <li key={link.link} className=" ">
                      <a
                        href={link.link}
                        target="blank"
                        className="rounded-sm bg-amber-100 px-2 py-1 text-sm font-semibold text-slate-700 hover:bg-amber-50 hover:text-black"
                      >
                        {link.platform}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
