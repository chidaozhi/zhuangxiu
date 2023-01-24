import { useState } from "react";
import tinycolor from "tinycolor2";
import Examples from "./examples";
import { Button } from "../components/button.tsx";
import { list } from "../const/color";

const sortColorsByHSLBrightness = (colors: List[]): List[] => {
  // 将颜色值转换为 TinyColor 对象，并计算其 HSL 亮度值
  const colorObjects = colors.map((color) => ({
    name: color.name,
    value: tinycolor(color.value),
    brightness: tinycolor(color.value).toHsl().l,
  }));

  // 根据 HSL 亮度值对颜色对象进行排序
  const sortedColors = colorObjects.sort((a, b) => a.brightness - b.brightness);

  // 将排序后的颜色对象转换为原始格式的数组并返回
  return sortedColors.map((color) => ({
    name: color.name,
    value: color.value,
  }));
};

export const Colors = () => {
  const [display, setDisplay] = useState(false);
  const [value, setValue] = useState("");
  const [showTips, setShowTips] = useState(false);
  const [showExam, setShowExam] = useState(false);

  const handleOnEnter = (v) => {
    setValue(v);
    setDisplay(true);
  };

  const handleOnLeave = () => {
    setValue("transparent");
    setDisplay(false);
  };

  const handleShowExam = (e, v) => {
    e.stopPropagation();
    setShowExam(true);
    setValue(v);
  };

  const handleCloseExam = () => {
    setValue("transparent");
    setShowExam(false);
  };

  return (
    <div className="px-[2%] py-[4%] w-full h-full">
      任选颜色对比：
      {display && (
        <div
          className="fixed inset-2 z-10"
          style={{
            backgroundColor: value,
          }}
        >
          <Button type="circle" onClick={handleOnLeave} />
        </div>
      )}

      {showExam && (
        <div className="fixed inset-2 z-10">
          <Examples color={value} onClose={handleCloseExam} />
        </div>
      )}

      {sortColorsByHSLBrightness(list).map((v) => (
        <div
          key={v.value}
          style={{ backgroundColor: v.value }}
          className="box overflow-hidden box-border p-[1%]"
          onClick={() => handleOnEnter(v.value)}
          onMouseEnter={() => setShowTips(true)}
          onMouseLeave={() => setShowTips(false)}
        >
          <span>
            {v.name}
            <br />
            {String(v.value)}
          </span>
          <br />
          <span
            className="text-white cursor-pointer"
            style={{ opacity: showTips ? 1 : 0 }}
          >
            点击可以放大，对着墙看
          </span>

          <button
            className="btn btn-outline btn-error block m-auto"
            onClick={(e) => handleShowExam(e, v.value)}
          >
            样例
          </button>
        </div>
      ))}

      <br />

      {sortColorsByHSLBrightness(list).map((v) => (
        <>
          <div
            className="tooltip"
            data-tip={`${v.name}-${(v.value.toHsl().l * 100).toFixed(2) + "%"}`}
          >
            <div
              key={v.value}
              style={{ backgroundColor: v.value }}
              className="small-box cursor-pointer"
            ></div>
          </div>
        </>
      ))}
    </div>
  );
};
