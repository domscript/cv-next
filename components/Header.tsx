import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-gradient-to-br from-gray-900 via-gray-500 to-gray-900 text-lime-300 font-bold shadow w-full">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex flex-nowrap hover:opacity-60 md:w-1/5 title-font font-medium items-center md:justify-start mb-4 md:mb-0"
        >
          <Image src="/favicon.ico" width={60} height={60} alt="logo" />
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
