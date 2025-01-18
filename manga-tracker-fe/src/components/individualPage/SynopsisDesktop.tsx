import { MangaDto } from "../../types/mangaTypes";

interface Props {
  manga: MangaDto | undefined;
}

export default function SynopsisDesktop({ manga }: Props) {
  return (
    <div className="flex-1 min-h-[500px] m-4 translate-y-[-135px] bg-[#121212] border-2 border-stone-300 rounded-md shadow-md sahdow-black max-w-[700px]">
      <div className="border-b  border-stone-200 p-4">
        <h1 className=" text-start ml-3 text-3xl  font-sans text-white">
          Synopsis
        </h1>
      </div>
      <div className="ml-7 mr-14 my-6 text-white">
        <p>{manga?.synopsis || "No synopsis available."}</p>
      </div>
    </div>
  );
}
