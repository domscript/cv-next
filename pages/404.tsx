import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";

export default function NotFoundPage() {
  return (
    <Layout title="Page Not Found">
      <div className="flex flex-col items-center mt-20">
        <Image
          src="/logoti.svg"
          alt=""
          width={70}
          height={70}
          className="bg-gray-800 rounded-2xl"
        />

        <h1 className="text-6xl my-5">Извините!</h1>

        <h2 className="text-4xl text-gray-400 mb-5">Страница не найдена!!!</h2>
        <Link
          href="/blog"
          className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full"
        >
          Все посты
        </Link>
      </div>
    </Layout>
  );
}
