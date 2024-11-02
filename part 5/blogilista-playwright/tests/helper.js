const loginWith = async (page, username, password) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);

  await page.getByRole("button", { name: "login" }).click();
};

const createTestBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "new blog" }).click();

  await page.getByTestId("title").fill(title);
  await page.getByTestId("author").fill(author);
  await page.getByTestId("url").fill(url);

  await page.getByRole("button", { name: "create" }).click();
  await page.locator(".blog").getByText(`${title} ${author}`).waitFor();
};

const like = async (page, title, expectedLikes) => {
  await page
    .getByText(title)
    .locator("..")
    .getByRole("button", { name: "view" })
    .click();

  await page.getByText("likes").waitFor();

  await page.getByRole("button", { name: "like" }).click();
  await page.getByText(`likes ${expectedLikes}`).waitFor();

  await page.getByRole("button", { name: "hide" }).click();
};

export { loginWith, createTestBlog, like };
