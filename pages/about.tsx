import { useCallback } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import Canvas from "@/components/Canvas";
import { squareRobotNew, positionAndSizeInt } from "@/utils/squareRobot";

export default function AboutPage() {
  const positionAndSize: positionAndSizeInt = {
    x01: 0,
    y01: 0,
    scale: 1, // 1 === 100%
  };
  const draw01 = squareRobotNew.bind(positionAndSize);
  const draw = useCallback(draw01, [draw01]);
  return (
    <Layout title="About">
      <Canvas width={200} height={200} className="mx-auto" draw={[draw]}>
        <Image
          src="/image/posts/undraw_powerful_re_frhr.svg"
          alt="Powerful Girl"
          width={1500}
          height={1100}
          className="w-full rounded"
        />
      </Canvas>

      <h1 className="text-5xl border-b-4 pb-5 font-bold px-10 text-gray-600">
        Hello everybody!
      </h1>

      <div className="bg-white shadow-md rounded-lg px-10 py-6 mt-6">
        <h3 className="text-2xl mb-5 text-gray-700">Domscript</h3>

        <p className="mb-3 text-justify indent-6 text-gray-800">
          I&lsquo;m <strong>Dominic</strong>, a web developer
        </p>
      </div>
    </Layout>
  );
}
