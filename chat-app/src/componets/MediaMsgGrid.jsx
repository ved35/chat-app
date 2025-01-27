import { DownloadSimple } from "@phosphor-icons/react";
import React from "react";

const images = [
  {
    key: 0,
    imgSrc:
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    key: 1,
    imgSrc:
      "https://images.pexels.com/photos/17888840/pexels-photo-17888840/free-photo-of-a-blue-bmw-m5-parked-on-a-street-at-night.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    key: 2,
    imgSrc:
      "https://images.pexels.com/photos/14171606/pexels-photo-14171606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    key: 3,
    imgSrc:
      "https://images.pexels.com/photos/5534990/pexels-photo-5534990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    key: 4,
    imgSrc:
      "https://images.pexels.com/photos/100653/pexels-photo-100653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

function MediaMsgGrid({ incoming }) {
  const renderImages = () => {
    if (images.length === 1) {
      return (
        <div className="relative col-span-2 row-span-2 rounded-2xl">
          <img
            src={images[0].imgSrc}
            alt="imges..."
            className="h-full w-full object-cover object-center rounded-lg"
          />
          <div className="absolute top-3 right-4 bg-gray/80 dark:bg-bodydark p-2 rounded-md hover:cursor-pointer hover:bg-opacity-70 hover:text-black dark:hover:text-white">
            <DownloadSimple size={24} weight='bold' />
          </div>
        </div>
      );
    } else if(images.length === 2){
        return images.map((item, index) => {
            return (
                <div key={index} className="relative col-span-1 row-span-1 rounded-2xl">
                  <img
                    src={item.imgSrc}
                    alt="imges..."
                    className="h-full w-full object-cover object-center rounded-lg"
                  />
                  <div className="absolute top-3 right-4 bg-gray/80 dark:bg-bodydark p-2 rounded-md hover:cursor-pointer hover:bg-opacity-70 hover:text-black dark:hover:text-white">
                    <DownloadSimple size={24} weight='bold' />
                  </div>
                </div>
              );
        })
    } else if (images.length === 3) {
        return (
          <>
            {images.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="col-span-1 row-span-1 relative rounded-2xl"
              >
                <img
                  src={item.imgSrc}
                  className="h-full w-full rounded-lg object-cover object-center"
                />
                <button className="absolute top-3 right-4 bg-gray/80 dark:bg-boxdark p-2 rounded-md hover:bg-opacity-80 hover:cursor-pointer hover:text-black dark:hover:text-white">
                  <DownloadSimple size={20} />
                </button>
              </div>
            ))}
          </>
        );
      } else {
        return (
          <>
            {images.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="col-span-1 row-span-1 relative rounded-2xl"
              >
                <img
                  src={item.imgSrc}
                  className="h-full w-full rounded-lg object-cover object-center"
                />
                <button className="absolute top-3 right-4 bg-gray/80 dark:bg-boxdark p-2 rounded-md hover:bg-opacity-80 hover:cursor-pointer hover:text-black dark:hover:text-white">
                  <DownloadSimple size={20} />
                </button>
              </div>
            ))}
            <div className="relative rounded-2xl bg-body/50 flex flex-row items-center justify-center text-xl text-white font-semibold">
              <div>+{images.length - 3}</div>
            </div>
          </>
        );
      }
  };
  return (
    <div
      className={`grid grid-cols-2 grid-rows-2 pt-4 pb-2 gap-3 rounded-2xl rounded-tl-none ${
        incoming ? "bg-gray dark:bg-boxdark-2" : "bg-transparent"
      }`}
    >
        {renderImages()}
    </div>
  );
}

export default MediaMsgGrid;
