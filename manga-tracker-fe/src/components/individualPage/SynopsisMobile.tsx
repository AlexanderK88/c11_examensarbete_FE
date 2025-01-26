import React from "react";

interface SynopsisMobileProps {
  synopsis?: string;
}

const SynopsisMobile: React.FC<SynopsisMobileProps> = ({ synopsis }) => {
  return (
    <div className="border rounded-lg m-5 p-5 bg-[#121212]">
      <div>
        <h2 className="text-3xl">Synopsis</h2>
      </div>
      <div className="bg-stone-400 h-[1px] w-full my-5"></div>
      <div>
        <p>{synopsis || "No synopsis available."}</p>
      </div>
    </div>
  );
};

export default SynopsisMobile;
