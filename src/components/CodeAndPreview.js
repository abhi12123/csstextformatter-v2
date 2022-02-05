import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCode,
  faCopy,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
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
      <div className="flex justify-end">
        <button
          className={`${
            viewType == "code"
              ? "bg-white hover:bg-blue-200 text-blue-500 active:bg-blue-900 active:text-blue-100"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          } font-bold py-2 px-4 rounded mx-1`}
          onClick={() => setViewType("preview")}
        >
          Preview
          <FontAwesomeIcon icon={faEye} className="mx-1" />
        </button>
        <button
          className={`${
            viewType == "code"
              ? "bg-blue-500 hover:bg-blue-700 text-white"
              : "bg-white hover:bg-blue-200 text-blue-500 active:bg-blue-900 active:text-blue-100"
          } font-bold py-2 px-4 rounded ml-1`}
          onClick={() => setViewType("code")}
        >
          Code
          <FontAwesomeIcon icon={faCode} className="mx-1" />
        </button>
      </div>
      <div>
        <div id="copy-code"></div>
        {viewType == "code" ? (
          <div className="bg-blue-100 rounded p-4 relative my-4 max-h-[80vh]">
            {Object.keys(styles).length !== 0 && (
              <FontAwesomeIcon
                icon={faCopy}
                className="absolute right-5 text-xl text-blue-500 hover:text-blue-700 active:text-blue-900 cursor-pointer"
                onClick={handleCopy}
              />
            )}
            <div
              className={`absolute flex items-center bg-green-500 text-white text-sm font-bold px-2 py-1 rounded-md ${
                !displayNotification && "hidden"
              } right-12`}
            >
              <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6 mr-2" />
              <p>Code copied</p>
            </div>
            {Object.keys(styles).length === 0 ? (
              <p className="text-center font-bold">
                Enable a style to see it here
              </p>
            ) : (
              <pre>{genPreviewCode()}</pre>
            )}
          </div>
        ) : (
          <div
            className="border-2 rounded border-blue-100 p-4 overflow-hidden max-h-[70vh] my-4"
            style={cssStyle}
          >
            Css Text Formatter is a webapp which can be used to format a text.
            It displays the preview text and its CSS, which can copied with a
            click, ready to be used wherever you want.
            <br /> You can view the list of available styles in the sidebar,
            with default values. You can change the values and check the
            preview. You can reset the values using the reset icon.
            <br />
            To enable a styles click on the switch icon which is provided with
            each style. Click on the Preiview and Code icons provided above to
            view the preiview or code accordingly. Clicking on the copy icon
            will copy the CSS to your clipboard.
          </div>
        )}
      </div>
    </div>
  );
}
