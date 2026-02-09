"use client";

import { useState } from "react";

const images = [
  "https://pbs.twimg.com/media/G6dpB9JaAAA2wDS?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpEiebIAEHrOS?format=jpg&name=360x360",
  "https://pbs.twimg.com/media/G6dpGJZbsAEg1tp?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpHzVbkAERJI3?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpKpcbgAAj7ce?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpNYzawAAniIt?format=png&name=360x360",
  "https://pbs.twimg.com/media/G6dpPilbcAAH3jU?format=jpg&name=360x360",
  "https://pbs.twimg.com/media/G6dpRFBbsAEvquO?format=jpg&name=360x360",
  "https://pbs.twimg.com/media/G6dpUL-aUAAUqGZ?format=png&name=small",
];

export function ExpandOnHover() {
  const [expandedImage, setExpandedImage] = useState(3);

  const getImageWidth = (index: number) =>
    index === expandedImage ? "24rem" : "5.5rem";

  return (
    <div className="w-full bg-background pb-12">
      <div className="relative flex items-center justify-center p-2 transition-all duration-300 ease-in-out w-full">
        <div className="w-full h-full overflow-hidden rounded-3xl">
          <div className="flex h-full w-full items-center justify-center overflow-hidden bg-transparent">
            <div className="relative w-full max-w-7xl px-5">
              <div className="flex w-full items-center justify-center gap-2">
                {images.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/5 transition-all duration-500 ease-in-out"
                    style={{
                      width: getImageWidth(idx + 1),
                      height: "28rem",
                    }}
                    onMouseEnter={() => setExpandedImage(idx + 1)}
                  >
                    <img
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      src={src}
                      alt={`Image ${idx + 1}`}
                    />
                    {idx + 1 === expandedImage && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                            <span className="text-white font-title text-xl uppercase tracking-widest">Masterpiece {idx + 1}</span>
                        </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandOnHover;
