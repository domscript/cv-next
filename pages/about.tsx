import Layout from "../components/Layout";
import Image from "next/image";
import CanvasRobot from "../components/CanvasRobot";

export default function AboutPage() {
  return (
    <Layout title="About">
      <CanvasRobot width={200} height={200} className="mx-auto">
        <Image
          src="/image/posts/undraw_powerful_re_frhr.svg"
          alt="Powerful Girl"
          width={1500}
          height={1100}
          className="w-full rounded"
        />
      </CanvasRobot>

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
