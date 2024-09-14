import { test, expect } from '@playwright/test';

const UI_URL="http://localhost:5173"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // Expect a title "to contain" a substring.
  await page.getByRole("link",{name:"Sign In"}).click();
  await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible()
  await page.locator("[name=email]").fill("asif@gmail.com")
  await page.locator("[name=password]").fill("asif@123")

  await page.getByRole("button",{name:"LogIn"}).click()

  await expect(page.getByText("Sign in successful!")).toBeVisible()
  await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible()
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible()
  await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible()
});

test('should allow the user to register', async ({ page }) => {
  const testEmail=`test_register_${Math.floor(Math.random()*90000)+10000}@test.com`
  await page.goto(UI_URL);
  // Expect a title "to contain" a substring.
  await page.getByRole("link",{name:"Sign In"}).click();
  await page.getByRole("link",{name:"Create an account"}).click();
  await expect(page.getByRole("heading",{name:"Create an account"})).toBeVisible()

  // Wait for the First Name field to be visible before filling it
  await page.getByLabel("First Name").fill("asif");
  await page.getByLabel("Last Name").fill("mohd");
  await page.getByLabel("Email").fill(testEmail);
  await page.locator('input[name="password"]').fill("asif2@123");
await page.locator('input[name="confirmPassword"]').fill("asif2@123");


  await page.getByRole("button",{name:"Register"}).click()

  await expect(page.getByText("Registration Successful!")).toBeVisible()
  await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible()
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible()
  await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible()
});