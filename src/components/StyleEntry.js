import React, { useEffect, useState } from "react";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { addStyle, removeStyle } from "../redux/reducer";

export default function StyleEntry({ styleDetails, reset }) {
  const { name, type, units, defaultValue } = styleDetails;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState({
    value: defaultValue,
    unit: "px",
  });
  const styles = useSelector((state) => state.styleReducer.value);
  
  const handleChangeValue = (value) => {
    if(Object.keys(styles).length === 0){
      handleReset();
    }
    if (type == "color") {
      setInputValues({
        ...inputValues,
        value: `rgb(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`,
      });
    } else {
      setInputValues({ ...inputValues, value: value });
    }
  };

  const handleReset = () => {
    setInputValues({
      value: defaultValue,
      unit: "px",
    });
  };

  useEffect(() => {
    if (!checked) {
      dispatch(removeStyle({ property: name }));
      return;
    }
    let dispatchPayLoad = {
      property: name,
      value: inputValues.value,
    };
    if (units) {
      dispatchPayLoad = {
        ...dispatchPayLoad,
        value: inputValues.value + inputValues.unit,
      };
    }
    dispatch(addStyle(dispatchPayLoad));
  }, [inputValues, checked]);

  useEffect(()=>{
    handleReset();
  },[reset])

  const getInput = () => {
    return (
      <div className="text-black w-1/3">
        <form className="text-center">
          {type == "number" && (
            <input
              type="number"
              value={inputValues.value}
              onChange={(e) => handleChangeValue(e.target.value)}
              className="m-1 p-1 w-12 rounded"
            />
          )}

          {units && (
            <select
              className="m-1 p-1 w-12 rounded"
              name="unit"
              value={inputValues.value}
              onChange={(e) => handleChangeValue(e.target.value)}
            >
              {units.map((unit, i) => {
                return <option key={i}>{unit}</option>;
              })}
            </select>
          )}

          {type == "color" && (
            <div>
              <div onClick={() => setDisplayColorPicker(!displayColorPicker)}>
                <div
                  className={`m-1 p-2 w-12 h-7 border-2 border-white rounded mx-auto `}
                  style={{
                    backgroundColor: inputValues.value,
                  }}
                ></div>
              </div>
              {displayColorPicker ? (
                <div className="absolute">
                  <div onClick={() => setDisplayColorPicker(false)} />
                  <SketchPicker
                    color={inputValues.value}
                    onChange={(value) => handleChangeValue(value)}
                  />
                </div>
              ) : null}
            </div>
          )}
        </form>
      </div>
    );
  };

  const CheckBox = () => {
    return (
      <label
        htmlFor={`checked-${name}`}
        className="relative cursor-pointer m-2"
      >
        <input
          type="checkbox"
          className="sr-only"
          id={`checked-${name}`}
          onChange={(e) => setChecked(!checked)}
        />
        <div
          className={`w-10 h-4 bg-gray-400 rounded-full shadow-inner  ${
            checked && "bg-green-600"
          }`}
        ></div>
        <div
          className={`dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${
            checked && "translate-x-full"
          }`}
        ></div>
      </label>
    );
  };

  return (
    <div className="py-2 hover:bg-blue-700 hover:text-white flex items-center justify-center text-sm">
      <div className="flex items-center justify-center w-4/5">
        <p className="mx-4 w-1/3">{name}</p>
        {getInput()}
        <CheckBox />
      </div>
      <FontAwesomeIcon
        className="mx-1 cursor-pointer"
        icon={faUndo}
        onClick={handleReset}
      />
    </div>
  );
}
