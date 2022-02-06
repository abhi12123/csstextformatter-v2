import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCode,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { cssToInline } from "../helpers/helper";

export default function CodeAndPreview() {
  const [viewType, setViewType] = useState("preview");
  const [displayNotification, setDisplayNotification] = useState(false);
  const styles = useSelector((state) => state.styleReducer.value);
  const [cssStyle, setCssStyle] = useState({});
  const genCssCode = () => {
    let dpCssStyle = {};
    Object.keys(styles).map(function (key, index) {
      dpCssStyle[cssToInline(key)] = styles[key];
    });
    setCssStyle(dpCssStyle);
  };

  const genPreviewCode = () => {
    let str = "";
    Object.keys(styles).map(function (key, index) {
      str += `${key}:${styles[key]};\n`;
    });
    return str;
  };

  const handleCopy = () => {
    const codeToBeCopied = genPreviewCode();
    let emptyArea = document.createElement("TEXTAREA");
    emptyArea.innerHTML = codeToBeCopied;
    const copyCodeElement = document.getElementById("copy-code");
    copyCodeElement.appendChild(emptyArea);
    emptyArea.select();
    document.execCommand("copy");
    emptyArea.remove();
    setDisplayNotification(true);
    window.setTimeout(() => {
      setDisplayNotification(false);
    }, 2000);
  };

  useEffect(() => {
    genCssCode();
  }, [styles]);

  return (
    <div>
      <div className="flex justify-end md:hidden lg:hidden">
        <button
          className={`${
            viewType == "code"
              ? "bg-white  text-gray-900 active:bg-gray-900 active:text-white border border-gray-900"
              : "bg-gray-900 text-white"
          } font-bold py-2 px-4 rounded mx-1`}
          onClick={() => setViewType("preview")}
        >
          Preview
          <FontAwesomeIcon icon={faEye} className="mx-1" />
        </button>
        <button
          className={`${
            viewType == "code"
              ? "bg-gray-900 text-white"
              : "bg-white  text-gray-900 active:bg-gray-900 active:text-white border border-gray-900"
          } font-bold py-2 px-4 rounded ml-1`}
          onClick={() => setViewType("code")}
        >
          Code
          <FontAwesomeIcon icon={faCode} className="mx-1" />
        </button>
      </div>
      <div>
        <div id="copy-code"></div>
        <div
          className={`border rounded border-gray-900 p-4 overflow-hidden max-h-[50vh] my-4 transition-all ease-in-out md:block duration-200 ${
            viewType == "code" && "hidden"
          }`}
          style={cssStyle}
        >
          Css Text Formatter is a web application that can be used to format a
          text sample. It displays the preview text and its CSS, which can be
          copied with a click, ready to be used wherever you want.
          <br /> You can view the list of available styles in the sidebar, with
          its default values. You can change the values and check the preview.
          You can reset the values using the reset button.
          <br />
          To enable a style click on the switch icon which is provided with each
          style. Click on the Preview and Code icons provided above to view the
          preview or code accordingly. Clicking on the copy icon will copy the
          CSS to your clipboard.
        </div>
        <div
          className={`bg-gray-900 rounded p-4 min-h-[150px] relative my-4 text-white transition-all ease-in-out md:block duration-200 ${
            viewType == "preview" && "hidden"
          }`}
        >
          <FontAwesomeIcon
            icon={faCopy}
            className="absolute right-5 text-xl cursor-pointer"
            onClick={handleCopy}
          />
          <div
            className={`absolute flex items-center bg-green-500  text-sm font-bold px-2 py-1 rounded-md ${
              !displayNotification && "hidden"
            } right-12`}
          >
            <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6 mr-2" />
            <p>Code copied</p>
          </div>
          {Object.keys(styles).length === 0 ? (
            <p className="text-gray-600">Enable a style to see it here..</p>
          ) : (
            <pre>{genPreviewCode()}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
