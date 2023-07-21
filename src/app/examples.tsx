import { Button } from "../components/button.tsx";
import Pic from "../assets/images/001.png";

export default function Examples({ color, onClose }) {
  return (
    <div className="w-full h-full bg-[#f6f4ef] relative">
      <div
        className="w-full h-[585px] bg-no-repeat bg-contain"
        style={{
          backgroundColor: color,
          backgroundImage: `url(${Pic})`,
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
