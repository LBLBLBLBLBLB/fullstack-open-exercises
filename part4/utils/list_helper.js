const blog = require("../models/blog");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  for (let i = 0; i < blogs.length; i++) {
    sum += blogs[i].likes;
  }
  return sum;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max));
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1;
    return counts;
  }, {});

  const topAuthor = Object.keys(authorCounts).reduce((top, author) => {
    return authorCounts[author] > (authorCounts[top] || 0) ? author : top;
  });

  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const authorLikes = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  const topAuthor = Object.keys(authorLikes).reduce((top, author) => {
    if (!top || authorLikes[author] > top.likes) {
      return { author, likes: authorLikes[author] };
    }
    return top;
  }, null);

  return topAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
