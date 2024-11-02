import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { expect } from "vitest";

const blog = {
  title: "Test title",
  author: "Pope Francis",
  url: "www.holyseat.va",
  likes: 777,
  user: {
    username: "testUser",
    name: "Test User",
  },
};

test("Content shows only title and author when button is not pressed", () => {
  render(<Blog blog={blog} />);

  expect(screen.getByText(blog.title)).toBeDefined();
  expect(screen.getByText(blog.author)).toBeDefined();
  expect(screen.queryByText(blog.url)).toBeNull();
});

test("Content includes url, likes, and user after button has been pressed", async () => {
  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  expect(screen.getByText(blog.url)).toBeDefined();
  expect(screen.getByText(`likes ${blog.likes}`)).toBeDefined();
  expect(screen.getByText(blog.user.name)).toBeDefined();
});

test("Clicking like button twice calls the mockHandler twice", async () => {
  const mockHandler = vi.fn();

  render(<Blog blog={blog} updateBlog={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
