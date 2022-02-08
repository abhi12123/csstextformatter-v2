import { faSearch, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { styleDetailsArray } from "../data/styleDetailsArray";
import { removeAllStyles } from "../redux/reducer";
import StyleEntry from "./StyleEntry";

export default function SideNavbar({ expandNavBar }) {
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch();
  const [enableList, setEnableList] = useState(
    Array(styleDetailsArray.length).fill(true)
  );
  const handleResetAll = () => {
    setReset(!reset);
    dispatch(removeAllStyles());
  };

  const filterStyleArray = (searchStyle) => {
    let searchString = searchStyle.trim().toLowerCase();
    setEnableList([]);
    if (searchString.length > 0) {
      let newEnableList = [...enableList];
      styleDetailsArray.map(function (l, i) {
        if (l.name.toLowerCase().match(searchString.toLowerCase())) {
          newEnableList[i] = true;
        } else {
          newEnableList[i] = false;
        }
      });
      setEnableList(newEnableList);
    } else {
      setEnableList(Array(styleDetailsArray.length).fill(true));
    }
  };

  return (
    <div
      className={`sidebar bg-gray-900 text-blue-100 w-full md:w-2/5 lg:w-2/5 p-6 absolute inset-y-0 left-0 transform ${
        !expandNavBar && "-translate-x-full"
      } md:relative md:translate-x-0 transition duration-200 ease-in-out z-10`}
    >
      <div className="text-white flex items-center justify-center">
        <span className="text-4xl font-extrabold">Css Text Formatter</span>
      </div>

      <nav>
        <div class="relative max-w-fit m-auto my-5 text-black">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            type="search"
            onChange={(e) => filterStyleArray(e.target.value)}
            class="py-2 px-2 rounded pl-10 focus:outline-none bg-gray-200 focus:bg-white focus:text-black transform-all ease-in-out duration-400"
            placeholder="Search styles..."
            autocomplete="off"
          />
        </div>
        <button className="px-4 py-1 my-3 items-center border flex justify-center max-w-fit m-auto hover:bg-gray-800 active:bg-gray-900 active:text-gray-400">
          <p className="px-2" onClick={handleResetAll}>
            Reset All
          </p>
          <FontAwesomeIcon icon={faUndo} className={``} />
        </button>
        <div className="max-h-[70vh] scrollbar-thin scrollbar-thumb-white scrollbar-track-gray-700 pb-[310px]">
          {styleDetailsArray.map((styleDetails, index) => {
            return (
              <StyleEntry
                styleDetails={styleDetails}
                key={styleDetails.id}
                reset={reset}
                enableList={enableList}
                index={index}
                key={index}
              />
            );
          })}
        </div>
      </nav>
      <footer className='absolute bottom-5 right-1/2 translate-x-1/2 text-sm'>Created by <a href='https://abhinavvp.com'>Abhinav</a></footer>
    </div>
  );
}
