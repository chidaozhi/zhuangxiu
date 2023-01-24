import { Button } from "../components/button.tsx";

export default function Examples({ color, onClose }) {
  return (
    <div className="w-full h-full bg-[#f6f4ef] relative">
      <div
        className="w-full h-[585px] bg-no-repeat bg-contain"
        style={{
          backgroundColor: color,
          backgroundImage: `url(http://www.jonas-china.com/hshtml/home/assets/img/ysxzt001.png)`,
        }}
      ></div>
      <Button
        className="absolute right-0 top-0"
        type="circle"
        onClick={onClose}
      />
    </div>
  );
}
