const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createTestBlog, like } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Jolkien Rolkien Rolkien Tolkien",
        username: "JRRT",
        password: "salainen",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("log in to application")).toBeVisible();
    await expect(page.getByTestId("username")).toBeVisible();
    await expect(page.getByTestId("password")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "JRRT", "salainen");

      await expect(
        page.getByText("Jolkien Rolkien Rolkien Tolkien logged in")
      ).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "JRRT", "vaikkakeskimaataijtn");

      await expect(page.locator(".failure")).toContainText(
        "Wrong username or password"
      );

      await expect(
        page.getByText("Jolkien Rolkien Rolkien Tolkien logged in")
      ).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "JRRT", "salainen");
      await expect(
        page.getByText("Jolkien Rolkien Rolkien Tolkien logged in")
      ).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      await createTestBlog(page, "Hobitti", "J.R.R. Tolkien", "www.yle.fi");

      await expect(page.getByText("Hobitti J.R.R. Tolkien")).toBeVisible();
    });

    test("blog can be liked", async ({ page }) => {
      await createTestBlog(page, "Hobitti", "J.R.R. Tolkien", "www.yle.fi");

      await page.getByRole("button", { name: "view" }).click();

      await expect(page.getByText("likes 0")).toBeVisible();

      await page.getByRole("button", { name: "like" }).click();

      await expect(page.getByText("likes 1")).toBeVisible();
    });

    test("user who created blog can delete it", async ({ page }) => {
      await createTestBlog(page, "Hobitti", "J.R.R. Tolkien", "www.yle.fi");

      await page.getByRole("button", { name: "view" }).click();

      page.on("dialog", (dialog) => dialog.accept());

      await page.getByRole("button", { name: "remove" }).click();

      await expect(page.getByText("Hobitti J.R.R. Tolkien")).not.toBeVisible();
    });

    test("remove button is only visible to the user who added the blog", async ({
      page,
      request,
    }) => {
      await createTestBlog(page, "Hobitti", "J.R.R. Tolkien", "www.yle.fi");

      await page.getByRole("button", { name: "view" }).click();

      await expect(page.getByRole("button", { name: "remove" })).toBeVisible();

      await page.getByRole("button", { name: "logout" }).click();

      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "Anthony Horowitz",
          username: "AntHoz",
          password: "britishAuthor",
        },
      });

      await loginWith(page, "AntHoz", "britishAuthor");
      await expect(page.getByText("Anthony Horowitz logged in")).toBeVisible();

      await page.getByRole("button", { name: "view" }).click();

      await expect(
        page.getByRole("button", { name: "remove" })
      ).not.toBeVisible();
    });

    test("blogs are sorted by the amount of likes they have", async ({
      page,
    }) => {
      await createTestBlog(page, "a", "a", "www.fi");
      await createTestBlog(page, "b", "b", "www.fi");
      await createTestBlog(page, "c", "c", "www.fi");

      await like(page, "a a", 1);
      await like(page, "b b", 1);
      await like(page, "b b", 2);
      await like(page, "c c", 1);
      await like(page, "c c", 2);
      await like(page, "c c", 3);

      await page
        .getByText("a a")
        .locator("..")
        .getByRole("button", { name: "view" })
        .click();

      await page
        .getByText("b b")
        .locator("..")
        .getByRole("button", { name: "view" })
        .click();

      await page
        .getByText("c c")
        .locator("..")
        .getByRole("button", { name: "view" })
        .click();

      await expect(page.locator(".blog").nth(0).getByText("c c")).toBeVisible();
      await expect(
        page.locator(".blog").nth(0).getByText("likes 3")
      ).toBeVisible();

      await expect(page.locator(".blog").nth(1).getByText("b b")).toBeVisible();
      await expect(
        page.locator(".blog").nth(1).getByText("likes 2")
      ).toBeVisible();

      await expect(page.locator(".blog").nth(2).getByText("a a")).toBeVisible();
      await expect(
        page.locator(".blog").nth(2).getByText("likes 1")
      ).toBeVisible();
    });
  });
});
