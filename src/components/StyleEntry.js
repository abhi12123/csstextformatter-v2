import React, { useEffect, useState } from "react";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SketchPicker } from "react-color";

export default function StyleEntry({
  styleDetails,
  updatedStyle,
  removeStyle,
  reset,
}) {
  const { name, inputType, units, defaultValue } = styleDetails;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [checked, setChecked] = useState(false);
  const [form, setForm] = useState({
    name,
    color:
      defaultValue && typeof defaultValue == "object"
        ? defaultValue
        : { r: 0, g: 0, b: 0, a: 255 },
    number: defaultValue && typeof defaultValue == "number" ? defaultValue : 0,
    unit: "px",
    active: false,
  });

  const handleCheck = (e) => {
    setChecked(!checked);
    setForm({ ...form, active: e.target.checked });
  };

  const handleReset = () => {
    const getValue = () => {
      if (inputType == "number") {
        if (units) {
          return defaultValue + "px";
        }
        return defaultValue;
      }
      return `rgb(255,255,255,1)`
    };

    const style = {
      property: name,
      value: getValue(),
    };

    updatedStyle(style);
    setForm({
      ...form,
      color:
        defaultValue && typeof defaultValue == "object"
          ? defaultValue
          : { r: 0, g: 0, b: 0, a: 255 },
      number:
        defaultValue && typeof defaultValue == "number" ? defaultValue : 0,
      unit: "px",
    });
  };

  useEffect(() => {
    const { name, color, number, unit, active } = form;
    if (active) {
      const getValue = () => {
        if (inputType == "number") {
          if (units) {
            return number + unit;
          }
          return number;
        }
        return color;
      };

      const style = {
        property: name,
        value: getValue(),
      };
      updatedStyle(style);
    } else {
      removeStyle(name);
    }
  }, [form]);

  useEffect(() => {
    handleReset();
  }, [reset]);

  const getInput = () => {
    return (
      <div className="text-black w-1/3">
        <form className="text-center">
          {inputType == "number" && (
            <input
              type="number"
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
              className="m-1 p-1 w-12 rounded"
            />
          )}

          {inputType == "color" && (
            <div>
              <div onClick={() => setDisplayColorPicker(!displayColorPicker)}>
                <div
                  className={`m-1 p-2 w-12 h-7 border-2 border-white rounded mx-auto `}
                  style={{
                    backgroundColor: `rgba(${form.color.r},${form.color.g},${form.color.b},${form.color.a})`,
                  }}
                ></div>
              </div>
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
              className="m-1 p-1 w-12 rounded"
              name="unit"
              value={form.unit}
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
      <div class="flex items-center justify-center w-4/5">
        <p className="mx-4 w-1/3">{name}</p>
        {getInput()}
        <label htmlFor={`checked-${name}`} class="relative cursor-pointer m-2">
          <input
            type="checkbox"
            class="sr-only"
            id={`checked-${name}`}
            onChange={(e) => handleCheck(e)}
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
      </div>

      <FontAwesomeIcon
        className="mx-1 cursor-pointer"
        icon={faUndo}
        onClick={handleReset}
      />
    </div>
  );
}
