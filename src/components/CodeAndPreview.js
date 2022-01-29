import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCode, faCopy } from "@fortawesome/free-solid-svg-icons";

export default function CodeAndPreview({ previewStyle, previewCode }) {
  const [viewType, setViewType] = useState("preview");
  const [notificationOpacity, setNotificationOpacity] = useState(0);

  const genPreviewCode = () => {
    let str = "";
    Object.keys(previewCode).map(function (key, index) {
      console.log(key, previewCode[key]);
      str += `${key}:${previewCode[key]};\n`;
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
    setNotificationOpacity(1);
    window.setTimeout(() => {
      setNotificationOpacity(0);
    }, 1000);
  };
  return (
    <div>
      <div className="flex justify-end">
        <button
          className={`${
            viewType == "code"
              ? "bg-white hover:bg-blue-200 text-blue-500"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          } font-bold py-2 px-4 rounded mx-1`}
          onClick={() => setViewType("preview")}
        >
          <p className="hidden md:inline">Preview</p>
          <FontAwesomeIcon icon={faEye} className="mx-1" />
        </button>
        <button
          className={`${
            viewType == "code"
              ? "bg-blue-500 hover:bg-blue-700 text-white"
              : "bg-white hover:bg-blue-200 text-blue-500"
          } font-bold py-2 px-4 rounded mx-1`}
          onClick={() => setViewType("code")}
        >
          <p className="hidden md:inline">Code</p>
          <FontAwesomeIcon icon={faCode} className="mx-1" />
        </button>
      </div>
      <div className="m-3  p-4">
        <div id="copy-code"></div>
        {viewType == "code" ? (
          <div className="bg-blue-100 rounded p-4 relative">
            {Object.keys(previewCode).length !== 0 && (
              <FontAwesomeIcon
                icon={faCopy}
                className="absolute right-5 text-xl text-blue-500 hover:text-blue-700 active:text-blue-900 cursor-pointer"
                onClick={handleCopy}
              />
            )}
            <div
              class={`absolute flex items-center bg-green-500 text-white text-sm font-bold px-2 py-1 rounded-md opacity-${notificationOpacity} transform transition-all duration-500 right-12`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>Code copied</p>
            </div>
            {
              Object.keys(previewCode).length === 0 ? <p className='text-center font-bold'>Enable a style to see it here</p>:
              <pre>{genPreviewCode()}</pre>
            }
            
          </div>
        ) : (
          <div
            style={previewStyle}
            className="border-2 rounded border-blue-100  p-4"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        )}
      </div>
    </div>
  );
}
