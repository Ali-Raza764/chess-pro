import { FcAbout } from "react-icons/fc";
import {  MdHome, MdLogin } from "react-icons/md";
import { FaPlayCircle } from "react-icons/fa";
import { IoDiamondSharp } from "react-icons/io5";

export const links = [
  {
    name: "Home",
    href: "/home",
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
    name: "SignUp",
    href: "/signup",
    icon: MdLogin,
  },
  {
    name: "About",
    href: "/about",
    icon: FcAbout,
  },
];