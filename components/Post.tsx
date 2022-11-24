import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import CategoryLabel from "./CategoryLabel";
import { cutText } from "@/utils/cutText";
import CanvasRobot from "./CanvasRobot";
import { squareRobotNew } from "@/utils/squareRobot";
import { positionAndSizeInt } from "@/hooks/use-canvas";

export interface PostsInt {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    cover_image: string;
    category: string;
    author: string;
    author_image: string;
  };
}
export default function Post({
  post,
  compact,
  onClick,
}: {
  post: PostsInt;
  compact: boolean;
  onClick?: (e: any) => void;
}) {
  const draw = useCallback(squareRobotNew, []);
  const positionAndSize: positionAndSizeInt = {
    x01: 0,
    y01: 0,
    scale: 1, // 1 === 100%
  };
  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
      {!compact && (
        <Image
          src={post.frontmatter.cover_image}
          alt=""
          height={420}
          width={600}
          className="mb-4 rounded"
        />
      )}

      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">
          {post.frontmatter.date}
        </span>
        <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
      </div>

      <div className="mt-2">
        <Link
          href={`/blog/${post.slug}`}
          className="text-2xl text-gray-700 font-bold hover:underline"
          onClick={onClick}
        >
          {post.frontmatter.title}
        </Link>
        <p className="mt-2 text-gray-600">
          {cutText(post.frontmatter.excerpt)}
        </p>
      </div>

      {!compact && (
        <div className="flex justify-between items-center mt-6">
          <Link
            href={`/blog/${post.slug}`}
            className="text-gray-900 hover:text-fuchsia-600"
          >
            Read more
          </Link>
          <div className="flex items-center">
            <CanvasRobot
              width={30}
              height={30}
              className="mx-2"
              draw={[
                {
                  draw,
                  positionAndSize,
                },
              ]}
            >
              <Image
                src={post.frontmatter.author_image}
                alt={post.frontmatter.author}
                width={30}
                height={30}
                className="mx-4 w-10 h-10 object-cover rounded pl-10 hidden sm:block"
              />
            </CanvasRobot>
            <h3 className="text-gray-700 font-bold">
              {post.frontmatter.author}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
