import { FcAbout } from "react-icons/fc";
import { MdHome, MdLogin } from "react-icons/md";
import { FaFish, FaPlayCircle } from "react-icons/fa";
import { IoDiamondSharp } from "react-icons/io5";

export const links = [
  {
    name: "Home",
    href: "/",
    icon: MdHome,
  },
  {
    name: "Play",
    href: "/play",
    icon: FaPlayCircle,
  },
  {
    name: "Membership",
    href: "/membership",
    icon: IoDiamondSharp,
  },
  {
    name: "Analysis",
    href: "/analysis",
    icon: FaFish,
  },
  {
    name: "About",
    href: "/about",
    icon: FcAbout,
  },
];
