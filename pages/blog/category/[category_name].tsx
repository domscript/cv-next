import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import Post, { PostsInt } from "@/components/Post";
import CategoryList from "@/components/CategoryList";
const matter = require("gray-matter");
import { getPosts } from "@/lib/posts";
import { dateFormatter } from "@/utils/dateFormatter";

export default function CategoryBlogPage({
  posts,
  categoryName,
  categories,
}: {
  posts: PostsInt[];
  categoryName: string;
  categories: string[];
}) {
  return (
    <Layout title="Blog">
      <div className="flex justify-between flex-col md:flex-row">
        <div className="m-auto w-11/12 md:w-3/4 ">
          <h1 className="text-5xl border-b-4 p-5 font-bold">{categoryName}</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} compact={false} />
            ))}
          </div>
        </div>
        <div className="order-first md:w-1/4 md:order-none">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: data } = matter(markdownWithMeta);
    const frontmatter = {
      ...data,
      date: dateFormatter.format(new Date(data.date)),
    } as {
      title: string;
      date: string;
      excerpt: string;
      cover_image: string;
      category: string;
      author: string;
      author_image: string;
    };

    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params: { category_name },
}: {
  params: { category_name: string };
}) {
  const files = fs.readdirSync(path.join("posts"));

  const posts = getPosts() as PostsInt[];

  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];

  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategories,
    },
  };
}
