import { expect, test } from '@playwright/test';

/**
 * A rail collapses to a 44px icon strip and gives its width back to the
 * terminal (HIVE rail-collapse plan, task 10).
 *
 * Every other claim in this feature is provable in `happy-dom` — the store
 * flips a boolean, the rail paints at 44px, the tab strip swaps its markup.
 * What `happy-dom` cannot show is that the terminal *noticed*: it performs no
 * layout, so xterm is never instantiated for real there (AGENTS.md), and a
 * unit test can only assert what `--cc-rail-w-left` was set to, never what the
 * stage actually measures. This is the one spec that closes that gap — a real
 * browser, a real xterm, a real `.xterm-screen` that has to get wider.
 */
test('collapsing the left rail gives its width to the terminal', async ({ page }) => {
  await page.goto('/?sim=0');

  const rail = page.getByRole('navigation', { name: 'Projects, work, and agents' });
  await expect(rail).toBeVisible();
  await expect(rail).toHaveCSS('width', /^\d{3}px$/);

  const screenEl = page.locator('.xterm-screen').first();
  await expect(screenEl).toBeVisible();
  const before = await screenEl.evaluate((el) => el.clientWidth);

  // The left rail's default tab is `projects` (ui-store), so clicking it while
  // it is already active is what collapses the rail rather than reselecting it.
  await page.getByRole('tab', { name: /Projects/ }).click();

  await expect(rail).toHaveCSS('width', '44px');

  await expect
    .poll(() => screenEl.evaluate((el) => el.clientWidth))
    .toBeGreaterThan(before);
});

test('the collapsed rail still opens a panel when a strip icon is clicked', async ({
  page,
}) => {
  await page.goto('/?sim=0');

  const rail = page.getByRole('navigation', { name: 'Projects, work, and agents' });

  await page.getByRole('tab', { name: /Projects/ }).click();
  await expect(rail).toHaveCSS('width', '44px');

  // Regex, not an exact string: this tab carries a badge count for asks
  // waiting on an answer, and its accessible name in the collapsed strip
  // includes that count when it is non-zero.
  await page.getByRole('tab', { name: /Agents/ }).click();

  // Scoped to the left rail: the activity rail on the right renders its own
  // `tabpanel` at the same time, and an unscoped query would hit both.
  await expect(rail.getByRole('tabpanel')).toBeVisible();
  await expect(rail).not.toHaveCSS('width', '44px');
});
