import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Canvas from "./Canvas";
import { squareRobotNew, positionAndSizeInt } from "@/utils/squareRobot";

export default function Header(props: { className: string }) {
  const styles = `bg-gradient-to-br from-gray-900 via-gray-500 to-gray-900 text-lime-300 font-bold shadow w-full ${props.className}`;
  const positionAndSize1: positionAndSizeInt = {
    x01: 0,
    y01: 0,
    scale: 1, // 1 === 100%
  };
  const draw0 = squareRobotNew.bind(positionAndSize1);
  const draw = useCallback(draw0, [draw0]);
  return (
    <header className={styles}>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex flex-nowrap hover:opacity-60 md:w-1/5 title-font font-medium items-center md:justify-start mb-4 md:mb-0"
        >
          <Canvas className="" width={50} height={50} draw={[draw0]}>
            <Image src="/favicon.ico" width={50} height={50} alt="logo" />{" "}
          </Canvas>
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
