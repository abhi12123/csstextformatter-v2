import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCode } from "@fortawesome/free-solid-svg-icons";

export default function CodeAndPreview() {
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
      <div className="bg-blue-100 m-3 rounded p-4">
        {viewType == "code" ? (
          <div className="font-mono">code</div>
        ) : (
          <div>preview</div>
        )}
      </div>
    </div>
  );
}
