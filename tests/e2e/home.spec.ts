import { test, expect } from '@playwright/test';

test('loads the starter home page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /scalable foundation/i })).toBeVisible();
});
