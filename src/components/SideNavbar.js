import { faSearch, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react/cjs/react.development";
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
      className={`sidebar bg-blue-800 text-blue-100 w-full md:w-2/5 lg:w-2/5  py-7 px-2 absolute inset-y-0 left-0 transform ${
        !expandNavBar && "-translate-x-full"
      } md:relative md:translate-x-0 transition duration-200 ease-in-out z-10`}
    >
      <div className="text-white flex items-center justify-center space-x-2 p-4">
        <img
          width="40"
          alt="CSS3 logo and wordmark"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/256px-CSS3_logo_and_wordmark.svg.png"
        />
        <span className="text-2xl font-extrabold">Css Text Formatter</span>
      </div>

      <nav>
        <button className="px-4 py-1 items-center bg-white text-blue-700 hover:bg-blue-200 active:bg-blue-500 active:text-white flex justify-center max-w-fit m-auto rounded">
          <p className="px-2" onClick={handleResetAll}>
            Reset All
          </p>
          <FontAwesomeIcon icon={faUndo} />
        </button>
        <div class="relative max-w-fit m-auto my-2 text-blue-700">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            type="search"
            onChange={(e) => filterStyleArray(e.target.value)}
            class="py-2 px-2 rounded pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
            placeholder="Search..."
            autocomplete="off"
          />
        </div>
        {styleDetailsArray.map((styleDetails, index) => {
          return (
            <StyleEntry
              styleDetails={styleDetails}
              key={styleDetails.id}
              reset={reset}
              enableList={enableList}
              index={index}
            />
          );
        })}
      </nav>
    </div>
  );
}
