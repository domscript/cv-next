import Link from "next/link";

export default function CategoryLabel({ children }: { children: string }) {
  const colorKey = {
    JavaScript: "bg-gray-200",
    TypeScript: "bg-gray-800",
  };
  let category: string;

  switch (children) {
    case "JavaScript":
      category = colorKey["JavaScript"];
      break;
    case "TypeScript":
      category = colorKey["TypeScript"];
      break;
    default:
      category = colorKey["JavaScript"];
      break;
  }

  return (
    <button className={`px-2 py-1 ${category} text-gray-100 font-bold rounded`}>
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </button>
  );
}
