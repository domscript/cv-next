import Link from "next/link";

export default function CategoryList({ categories }: { categories: string[] }) {
  return (
    <div className="w-11/12 p-5 bg-white rounded-lg shadow-md mt-6 mx-auto">
      <h3 className="text-2xl bg-gray-800 text-white p-3 rounded">
        Blog Category
      </h3>
      <ul className="divide-y divide-gray-300">
        {categories.map((category, index) => (
          <Link key={index} href={`/blog/category/${category.toLowerCase()}`}>
            <li className="p-4 cursor-pointer hover:bg-gray-50">{category}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
