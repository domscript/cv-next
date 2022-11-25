import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import CanvasRobot from "@/components/CanvasRobot";
import { squareRobotNew } from "@/utils/squareRobot";
import { positionAndSizeInt } from "@/hooks/use-canvas";

export default function NotFoundPage() {
  const positionAndSize: positionAndSizeInt = {
    x01: 0,
    y01: 0,
    scale: 1, // 1 === 100%
  };
  const draw01 = squareRobotNew.bind(positionAndSize);
  const draw = useCallback(draw01, [draw01]);
  return (
    <Layout title="Error">
      <div className="flex flex-col items-center mt-20">
        <CanvasRobot width={200} height={200} className="mx-auto" draw={[draw]}>
          <Image
            src="/image/c_lang.svg"
            alt=""
            width={70}
            height={70}
            className="bg-gray-800 rounded-2xl"
          />
        </CanvasRobot>

        <h1 className="text-6xl my-5">Sorry!</h1>

        <h2 className="text-4xl text-gray-400 mb-5">
          Page doesn&#39;t exist!!!
        </h2>
        <Link
          href="/blog"
          className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full"
        >
          All Posts
        </Link>
      </div>
    </Layout>
  );
}
