import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import CanvasRobot from "./CanvasRobot";
import { squareRobotNew } from "@/utils/squareRobot";
import { positionAndSizeInt } from "@/hooks/use-canvas";

export default function Header(props: { className: string }) {
  const styles = `bg-gradient-to-br from-gray-900 via-gray-500 to-gray-900 text-lime-300 font-bold shadow w-full ${props.className}`;
  const positionAndSize0: positionAndSizeInt = {
    x01: 0,
    y01: 0,
    scale: 0.3, // 1 === 100%
  };
  const positionAndSize1: positionAndSizeInt = {
    x01: 30,
    y01: 30,
    scale: 0.5, // 1 === 100%
  };
  const draw01 = squareRobotNew.bind(positionAndSize0);
  const draw0 = useCallback(draw01, [draw01]);
  const draw11 = squareRobotNew.bind(positionAndSize1);
  const draw1 = useCallback(draw11, [draw11]);
  return (
    <header className={styles}>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex flex-nowrap hover:opacity-60 md:w-1/5 title-font font-medium items-center md:justify-start mb-4 md:mb-0"
        >
          <CanvasRobot
            className=""
            width={80}
            height={80}
            draw={[draw0, draw1]}
          >
            <Image src="/favicon.ico" width={60} height={60} alt="logo" />{" "}
          </CanvasRobot>
          <span className="ml-3 text-xl whitespace-nowrap">Domscript</span>
        </Link>
        <nav className="flex flex-wrap md:w-4/5 items-center justify-end text-base md:ml-auto">
          <Link
            href="/blog"
            title="blog"
            className="mx-5 cursor-pointer uppercase hover:text-lime-600"
          >
            Blog
          </Link>
          <Link
            href="/about"
            title="about"
            className="mx-5 cursor-pointer uppercase hover:text-lime-600 whitespace-nowrap"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
