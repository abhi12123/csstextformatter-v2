import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react/cjs/react.development";
import { styleDetailsArray } from "../data/styleDetailsArray";
import StyleEntry from "./StyleEntry";

export default function SideNavbar({
  expandNavBar,
  setPreviewStyle,
  previewStyle,
  setPreviewCode,
  previewCode,
}) {
  const [reset, setReset] = useState(false)
  const cssToInline = (property) => {
    const index = property.indexOf("-");
    let convertedPropertyName = property;
    if (index > -1) {
      let propertyValue = property[index + 1].toUpperCase();
      convertedPropertyName =
        property.slice(0, index) + propertyValue + property.slice(index + 2);
    }
    return convertedPropertyName;
  };

  const updatedStyle = (style) => {
    const { property, value } = style;
    const convertedPropertyName = cssToInline(property);
    let convertedValue = value;
    if (typeof value == "object") {
      convertedValue = `rgb(${value.r},${value.g},${value.b},${value.a})`;
    }
    setPreviewCode({
      ...previewCode,
      [property]: convertedValue,
    });
    setPreviewStyle({
      ...previewStyle,
      [convertedPropertyName]: convertedValue,
    });
  };

  const removeStyle = (property) => {
    const convertedPropertyName = cssToInline(property);
    if (previewStyle[convertedPropertyName]) {
      let pwStyle = { ...previewStyle };
      delete pwStyle[convertedPropertyName];
      setPreviewStyle(pwStyle);
    }
    if (previewCode[property]) {
      let pwCode = { ...previewCode };
      delete pwCode[property];
      setPreviewCode(pwCode);
    }
  };

  const handleResetAll = () => {
    console.log('trigger ');
    setReset(!reset);
  }
  return (
    <div
      className={`sidebar bg-blue-800 text-blue-100 w-3/4 md:w-2/5 lg:w-2/5  py-7 px-2 absolute inset-y-0 left-0 transform ${
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
        <button class="px-4 py-1 items-center bg-white text-blue-700  flex justify-center max-w-fit m-auto rounded">
          <p className="px-2" onClick={()=>handleResetAll()}>Reset All</p>
          <FontAwesomeIcon icon={faUndo} />
        </button>
        {styleDetailsArray.map((styleDetails, i) => {
          return (
            <StyleEntry
              styleDetails={styleDetails}
              updatedStyle={updatedStyle}
              removeStyle={removeStyle}
              reset={reset}
            />
          );
        })}
      </nav>
    </div>
  );
}
