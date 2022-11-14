import fs from "fs";
import path from "path";
import Layout from "../../../components/Layout";
import Post, { PostsInt } from "../../../components/Post";
import Pagination from "../../../components/Pagination";
import CategoryList from "../../../components/CategoryList";
import { POSTS_PER_PAGE } from "../../../config/index";
import { getPosts } from "../../../lib/posts";

export default function BlogPage({
  posts,
  numPages,
  currentPage,
  categories,
}: {
  posts: PostsInt[];
  numPages: number;
  currentPage: number;
  categories: string[];
}) {
  return (
    <Layout title="Blog">
      <div className="flex justify-between flex-col md:flex-row">
        <div className="m-auto w-11/12 md:w-3/4">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} compact={false} />
            ))}
          </div>
          <Pagination currentPage={currentPage} numPages={numPages} />
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

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths: {
    params: { pageIndex: string };
  }[] = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { pageIndex: i.toString() },
    });
  }
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: {
  params?: { pageIndex: string };
  locales: any;
  locale: any;
  defaultLocale: any;
}) {
  let page: number;

  if (!context.params) page = 1;
  else if (!context.params.pageIndex) page = 1;
  else {
    page = parseInt(context.params.pageIndex, 10);
  }

  const files = fs.readdirSync(path.join("posts"));
  const posts = getPosts() as PostsInt[];
  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories,
    },
  };
}
