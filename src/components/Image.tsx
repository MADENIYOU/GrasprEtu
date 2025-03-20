import Image from "next/image";
import logo from "../assets/images/download.svg";

const CustomImage = () => {
  return (
    <Image
      src={logo}
      alt="Logo"
      width={100}
      height={50}
    />
  );
};

export default CustomImage;