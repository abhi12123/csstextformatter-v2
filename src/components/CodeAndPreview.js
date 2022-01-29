import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCode } from "@fortawesome/free-solid-svg-icons";

export default function CodeAndPreview({ previewStyle }) {
  const [viewType, setViewType] = useState("code");
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
        {viewType == "code" ? (
          <div className="font-mono bg-blue-100 rounded p-4">code</div>
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
