const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (max, blog) => (max.likes > blog.likes ? max : blog),
    blogs[0] || null
  );
};

const mostBlogs = (blogs) => {
  const authors = lodash.groupBy(blogs, "author");
  const blogCount = lodash.map(authors, (blogs, author) => ({
    author,
    blogs: blogs.length,
  }));
  return lodash.maxBy(blogCount, "blogs") || null;
};

const mostLikes = (blogs) => {
  const authors = lodash.groupBy(blogs, "author");
  const likeCount = lodash.map(authors, (blogs, author) => ({
    author,
    likes: lodash.sumBy(blogs, "likes"),
  }));
  return lodash.maxBy(likeCount, "likes") || null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
