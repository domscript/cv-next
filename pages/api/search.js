import fs from "fs";
import path from "path";
import matter from "gray-matter";
import dateFormatter from "../../utils/dateFormatter";

export default function handler(req, res) {
  let posts;
  if (process.env.NODE_ENV === "production") {
    posts = require("../../cache/data").posts;
  } else {
    const files = fs.readdirSync(path.join("posts"));

    posts = files.map((filename) => {
      const slug = filename.replace(".md", "");

      const markdownWithMeta = fs.readFileSync(
        path.join("posts", filename),
        "utf-8"
      );

      const { data: data, content } = matter(markdownWithMeta);
      const frontmatter = {
        ...data,
        date: dateFormatter.format(new Date(data.date)),
      };

      return {
        slug,
        frontmatter,
        content,
      };
    });
  }
  const results = posts.filter(
    ({ frontmatter: { title, excerpt, category }, content }) =>
      title.toLowerCase().indexOf(req.query.q) != -1 ||
      excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
      category.toLowerCase().indexOf(req.query.q) != -1 ||
      content.toLowerCase().indexOf(req.query.q) != -1
  );
  if (process.env.NODE_ENV === "production") {
    res.status(200).json(JSON.stringify({ results }));
  } else {
    res.status(200).json({ results });
  }
}
