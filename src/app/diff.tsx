import { useState } from "react";
import Select from "react-select";
import tinycolor from "tinycolor2";
import { list } from "../const/color";
export default function Diff() {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState([]);

  const options = list.map((v) => {
    return {
      label: v.name,
      value: v.value,
    };
  });

  const onChange = (e) => {
    setSelected(e);
    if (e.length === 0) {
      setShow(false);
    }
  };

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = tinycolor(data.value);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.value
          : isFocused
          ? data.value
          : undefined,
        color: "#000",
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.value
              : data.value
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = tinycolor(data.value);
      return {
        ...styles,
        backgroundColor: data.value,
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "#000",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.value,
      ":hover": {
        color: "#000",
      },
    }),
  };

  const doDiff = () => {
    if (selected?.length) {
      setShow(true);
    }
  };

  return (
    <div className="mb-[1%]">
      <span>选择任意颜色对比：</span>
      <Select
        options={options}
        isMulti
        onChange={onChange}
        className="inline-block w-[50%]"
        styles={colourStyles}
      />
      <button
        className="ml-[1%] btn btn-sm btn-neutral"
        onClick={doDiff}
        disabled={!selected || !selected?.length}
      >
        开始对比
      </button>
      {show && (
        <div className="w-full h-[300px]">
          {selected.map((v) => (
            <div
              key={v.value}
              className="inline-block h-full"
              style={{
                width: `${(1 / selected.length) * 100}%`,
                backgroundColor: v.value,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
