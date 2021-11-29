import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { SSL_OP_TLS_ROLLBACK_BUG } from "constants";

const postsDirectory = path.join(process.cwd(), "posts");
// process.cwd() = absolute path to the overall project folder, 'posts'= chemin du dossier

function getPostData(fileName) {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readdirSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, ""); // removes the file extension
  const postData = {
    slug: postSlug,
    ...data,
    content,
  };
  return postData;
}

export function getAllPosts() {
  const postFiles = fs.readdirSync(postsDirectory);
  // return an array of strings

  // solution 1
  //   for (const postFile of postFiles) {
  //       const postData = getPostData(postFile);
  //   }

  // solution 2
  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
