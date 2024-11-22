const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");
const jwt = require("jsonwebtoken");

//GET

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

//POST

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;

  const { user } = request;

  if (!user) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user,
    likes: body.likes ? body.likes : 0,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

//GET:id

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

//DELETE

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const { user } = request;

  if (!user) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blogToDelete = await Blog.findById(request.params.id);

  if (blogToDelete.user._id.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } else {
    return response.status(401).json({ error: "Unauthorized" });
  }
});

//PUT

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  if (!body.likes) body.likes = 0;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog.toJSON());
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: "comment is missing" });
  }

  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });

  blog.comments = blog.comments.concat(body.content);

  const updatedBlog = await blog.save();
  updatedBlog
    ? response.status(201).json(updatedBlog)
    : response.status(400).end();
});

module.exports = blogsRouter;
