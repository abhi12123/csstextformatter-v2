import React, { useState } from "react";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SketchPicker } from "react-color";

export default function StyleEntry({ styleDetails }) {
  const { name, inputType, units, defaultValue } = styleDetails;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [checked, setChecked] = useState(false);
  const [form, setForm] = useState({
    name,
    color:
      defaultValue && typeof defaultValue == "object"
        ? defaultValue
        : { r: 255, g: 255, b: 255, a: 255 },
    number: defaultValue && typeof defaultValue == "number" ? defaultValue : 0,
    unit: "px",
  });

  const getInput = () => {
    return (
      <div className="text-black">
        <form>
          {inputType == "number" && (
            <input
              type="number"
              defaultValue={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
              className="m-1 p-1 w-16"
            />
          )}

          {inputType == "color" && (
            <div>
              <button
                onClick={() => setDisplayColorPicker(!displayColorPicker)}
              >
                <div
                  className={`m-1 p-2 w-16 h-7 border-2 border-white`}
                  style={{
                    backgroundColor: `rgba(${form.color.r},${form.color.g},${form.color.b},${form.color.a})`,
                  }}
                ></div>
              </button>
              {displayColorPicker ? (
                <div className="absolute">
                  <div onClick={() => setDisplayColorPicker(false)} />
                  <SketchPicker
                    color={form.color}
                    name={name}
                    onChange={(color) => setForm({ ...form, color: color.rgb })}
                  />
                </div>
              ) : null}
            </div>
          )}

          {units && (
            <select
              className="m-1 p-1 w-16"
              name="unit"
              defaultValue={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
            >
              {units.map((unit) => {
                return <option>{unit}</option>;
              })}
            </select>
          )}
        </form>
      </div>
    );
  };
  
  return (
    <div class="py-2 hover:bg-blue-700 hover:text-white flex items-center justify-center text-sm">
      <div class="flex items-center">
        <p className="mx-4">{name}</p>
        {getInput()}
        <label htmlFor={`checked-${name}`} class="relative cursor-pointer m-2">
          <input
            type="checkbox"
            class="sr-only"
            id={`checked-${name}`}
            onChange={() => setChecked(!checked)}
          />
          <div
            class={`w-10 h-4 bg-gray-400 rounded-full shadow-inner  ${
              checked && "bg-green-600"
            }`}
          ></div>
          <div
            class={`dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${
              checked && "translate-x-full"
            }`}
          ></div>
        </label>
        <div class="ml-3 text-gray-700 font-medium"></div>
      </div>
      <FontAwesomeIcon className="mx-5 cursor-pointer" icon={faUndo} />
    </div>
  );
}
