"use client";
import { links } from "./links";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SimpleNabar = () => {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex items-center justify-center gap-3">
      {links.map((link) => {
        return (
          <Link
            href={link.href}
            key={link.name}
            className={`hover:text-gray-300 transition border-b-2 border-transparent  hover:border-yellow-500  ${
              pathname === link.href
                ? "border-yellow-600"
                : "border-transparent"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default SimpleNabar;
