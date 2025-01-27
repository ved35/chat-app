import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import { MagnifyingGlass } from "@phosphor-icons/react";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateGifModal } from "../redux/Slices/app";

const gf = new GiphyFetch("EmtOFqIOnh2txCQEe86xSZYCbzmUkxN1");

function Giphy() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [gifs, setGifs] = useState([]);
  const gridRef = useRef("");

  const dispatch = useDispatch();

  useEffect(() => {
    // fetch FIFs initially base on search item

    const fetchInitialsGIFs = async () => {
      setLoading(true);
      setError(null);

      try {
        const initialGifs = await fetchGifs(0);
        setGifs(initialGifs.data);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialsGIFs();
  }, []);

  const fetchGifs = async (offset) => {
    return gf.search(value, { offset, limit: 10 });
  };

  const debounceFetchGifs = _.debounce(async () => {
    setLoading(true);
    setError(null);

    try {
      const newGifs = await fetchGifs(0);
      setGifs(newGifs.data);
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, 500);

  const handleGifsClick = (gif, event) => {
    event.preventDefault();

    const gifUrl = gif.images.original.url;
    console.log("gifs-->", gifUrl);

    dispatch(updateGifModal({
      value: true,
      url: gifUrl
    }))
  };

  return (
    <div ref={gridRef} className="w-full mt-3">
      <input
        type="text"
        placeholder="Search for Gif..."
        className="border border-stroke rounded-md p-2 w-full mb-2 dark:border-strokedark outline-none bg-transparent"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          debounceFetchGifs();
        }}
      />
      {loading && <p>Loading Gifs...</p>}
      {error && <p className="text-red">Error: {error}</p>}

      <div className="h-48 overflow-auto no-scrollbar">
        {gifs.length > 0 ? (
          <Grid
            width={gridRef.current?.offsetWidth}
            columns={8}
            gutter={8}
            fetchGifs={fetchGifs}
            key={value}
            onGifClick={handleGifsClick}
          />
        ) : (
          <div className="flex flex-row items-center justify-center h-full space-x-2">
            <MagnifyingGlass size={40} weight="bold" />
            <span className="text-xl text-body dark:text-white font-semibold">
              Please search for any Gifs
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Giphy;
