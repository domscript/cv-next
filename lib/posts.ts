import fs from "fs";
import path from "path";
const matter = require("gray-matter");
import { sortPostsByDate } from "../utils/sortPostsByDate";
import dateFormatter from "../utils/dateFormatter";

const files = fs.readdirSync(path.join("posts"));

export function getPosts() {
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: data } = matter(markdownWithMeta);
    const frontmatter = {
      ...data,
      date: dateFormatter.format(new Date(data.date)),
    };

    return {
      slug,
      frontmatter,
    };
  });
  return posts.sort(sortPostsByDate);
}
