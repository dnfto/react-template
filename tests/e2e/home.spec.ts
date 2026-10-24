import { test, expect } from '@playwright/test';

test('loads the starter home page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /scalable foundation/i })).toBeVisible();
});

test('loads mocked users without a backend', async ({ page }) => {
  await page.goto('/users');

  await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
  await expect(page.getByText('Ada Lovelace')).toBeVisible();
});
