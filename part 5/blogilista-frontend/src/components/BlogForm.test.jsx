import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("The form calls event handler with correct information", async () => {
  const user = userEvent.setup();
  const createBlog = vi.fn();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByTestId("title");
  const authorInput = screen.getByTestId("author");
  const urlInput = screen.getByTestId("url");

  const createButton = screen.getByText("create");

  await userEvent.type(titleInput, "Seitsemän koiraveljestä");
  await userEvent.type(authorInput, "Mauri Kunnas");
  await userEvent.type(urlInput, "www.tahtiakuinotavassapoikiaonjukolassa.fi");

  await userEvent.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "Seitsemän koiraveljestä",
    author: "Mauri Kunnas",
    url: "www.tahtiakuinotavassapoikiaonjukolassa.fi",
  });
});
