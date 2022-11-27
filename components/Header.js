import { useRouter } from "next/router";
import { useState } from "react";

export default function Header() {
  const [value, setValue] = useState("");
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();

    if (value) {
      router.push(`/search/${value}`);
    }
  }

  async function handleChange(e) {
    setValue(e.target.value);
    console.log(value);
  }

  return (
    <>
      <div className=" fixed z-50 w-full bg-amber-200">
        <div className="container mx-auto flex flex-col items-center justify-between p-2 sm:flex-row">
          <h1 className=" font-bold">King Anime</h1>
          <div>
            <input
              type="text"
              placeholder="Cari Anime..."
              className=" rounded-l-md px-4 py-1"
              onChange={handleChange}
            />
            <button
              onClick={handleSubmit}
              className="rounded-r-md bg-black py-1 px-3 text-white"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="h-16"></div>
      </div>
    </>
  );
}
