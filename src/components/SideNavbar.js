import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { styleDetailsArray } from "../data/styleDetailsArray";
import StyleEntry from "./StyleEntry";

export default function SideNavbar({
  expandNavBar,
  setPreviewStyle,
  previewStyle,
}) {
  const updatedStyle = (style) => {
    const { property, value } = style;
    const index = property.indexOf("-");
    let convertedPropertyName = property;
    if (index > -1) {
      let propertyValue = property[index + 1].toUpperCase();
      convertedPropertyName =
        property.slice(0, index) + propertyValue + property.slice(index + 2);
    }
    let convertedValue = value;
    if (typeof value == "object") {
      convertedValue = `rgb(${value.r},${value.g},${value.b},${value.a})`;
    }
    setPreviewStyle({
      ...previewStyle,
      [convertedPropertyName]: convertedValue,
    });
  };

  const removeStyle = (property) => {
    const index = property.indexOf("-");
    let convertedPropertyName = property;
    if (index > -1) {
      let propertyValue = property[index + 1].toUpperCase();
      convertedPropertyName =
        property.slice(0, index) + propertyValue + property.slice(index + 2);
    }
    if (previewStyle[convertedPropertyName]) {
      let pwStyle = { ...previewStyle };
      console.log(convertedPropertyName, pwStyle[convertedPropertyName]);
      delete pwStyle[convertedPropertyName];
      setPreviewStyle(pwStyle);
    }
  };
  return (
    <div
      className={`sidebar bg-blue-800 text-blue-100 w-3/4 md:w-1/3 lg:w-1/3  py-7 px-2 absolute inset-y-0 left-0 transform ${
        !expandNavBar && "-translate-x-full"
      } md:relative md:translate-x-0 transition duration-200 ease-in-out `}
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
          <p className="px-2">Reset All</p>
          <FontAwesomeIcon icon={faUndo} />
        </button>
        {styleDetailsArray.map((styleDetails, i) => {
          return (
            <StyleEntry
              styleDetails={styleDetails}
              updatedStyle={updatedStyle}
              removeStyle={removeStyle}
            />
          );
        })}
      </nav>
    </div>
  );
}
