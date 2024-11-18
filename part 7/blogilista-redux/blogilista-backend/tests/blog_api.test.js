const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);

  await User.deleteMany({});

  await helper.addLoginUser();
});

describe("testing GET:", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are correct amount of blogs", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });
});

describe("checking ID field naming:", () => {
  test("id field should be named 'id', and not '_id'", async () => {
    const {
      body: [{ id, _id }],
    } = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.notEqual(id, undefined);
    assert.strictEqual(_id, undefined);
  });
});

describe("Testing POST method", () => {
  test("a valid blog can be added", async () => {
    const loggedUser = await api.post("/api/login").send(helper.loginUser);
    const headers = { Authorization: `Bearer ${loggedUser.body.token}` };

    const newBlog = {
      title: "TestiBlogi",
      author: "Meikäpoika",
      url: "https://google.com/",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  });

  test("POST returns 401 if token is missing", async () => {
    const newBlog = {
      title: "TestiBlogi",
      author: "Meikäpoika",
      url: "https://google.com/",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

  test("likes default to 0 if not given", async () => {
    const loggedUser = await api.post("/api/login").send(helper.loginUser);

    const headers = { Authorization: `Bearer ${loggedUser.body.token}` };

    const newBlog = {
      title: "LikeTesti",
      author: "Meikäpoika",
      url: "https://google.com/",
    };

    const postResponse = await api
      .post("/api/blogs")
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const addedBlog = blogsAtEnd.find((r) => r.id === postResponse.body.id);

    assert.strictEqual(addedBlog.likes, 0);
  });

  test("if title is missing, response is 400", async () => {
    const loggedUser = await api.post("/api/login").send(helper.loginUser);
    const headers = { Authorization: `Bearer ${loggedUser.body.token}` };

    const newBlog = {
      author: "Meikäpoika",
      url: "https://google.com/",
    };

    await api.post("/api/blogs").set(headers).send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });

  test("if url is missing, response is 400", async () => {
    const loggedUser = await api.post("/api/login").send(helper.loginUser);
    const headers = { Authorization: `Bearer ${loggedUser.body.token}` };

    const newBlog = {
      title: "No URL test",
      author: "Meikäpoika",
    };

    await api.post("/api/blogs").set(headers).send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });
});

describe("Testing DELETE method", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const loggedUser = await api.post("/api/login").send(helper.loginUser);
    const headers = { Authorization: `Bearer ${loggedUser.body.token}` };

    const deleteThis = {
      title: "Poistoon",
      author: "Martti Suosalo",
      url: "www.kuukuna.org",
    };

    await api.post("/api/blogs").set(headers).send(deleteThis).expect(201);

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1];

    await api.delete(`/api/blogs/${blogToDelete.id}`).set(headers).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

    const contents = blogsAtEnd.map((r) => r.id);
    assert(!contents.includes(blogToDelete.id));
  });
});

describe("Testing PUT method", () => {
  test("blog likes should change", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      ...blogToUpdate,
      likes: 20500,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const foundBlog = blogsAtEnd.find((r) => r.id === updatedBlog.id);

    assert.strictEqual(foundBlog.likes, 20500);
  });
});

after(async () => {
  await mongoose.connection.close();
});
