import { assert, describe, it } from './harness.mjs';

/**
 * A terminal knows what holds its tty (terminals, phase 2).
 *
 * The unit suite proves the poll's plumbing against a scripted `process`
 * getter. Only a real pty can prove the getter reads the foreground process
 * group of a real shell: `null` at the prompt, `sleep` while one runs, and
 * `null` again when it returns.
 *
 * ## Why `/bin/bash` here, when the rest of the suite says `/bin/sh`
 *
 * The prompt reading is `null` because the poll suppresses **the shell's own
 * name**, and it recognises the shell by the basename of the path that was
 * spawned. node-pty's `process` getter answers with the kernel's comm name —
 * the name of the *executable* — and on macOS `/bin/sh` is the bash binary, so
 * the getter says `bash` where the path said `sh` and the prompt is reported as
 * a running process called `bash` for as long as the session lives (measured
 * here: `{"type":"foreground","name":"bash"}` one second after the spawn).
 * Linux has the same shape with dash. So the shell's identity *is* the subject
 * in this group, and it is pinned to a path whose basename is the binary's own
 * name — the case every real config is, and the only one in which the product's
 * claim is even expressible.
 */
describe('foreground', () => {
  it('reports the prompt, then the running command, then the prompt', async (context) => {
    const session = await context.ready(
      context.open({ shell: '/bin/bash', foreground: true }),
    );

    await session.waitForForeground((name) => name === null, { timeout: 3_000 });

    session.send('sleep 2');
    await session.waitForForeground((name) => name === 'sleep', { timeout: 3_000 });

    await session.waitForForeground((name) => name === null, { timeout: 5_000 });
    assert.equal(session.foreground, null);
  });

  it('reports nothing for a session that did not ask', async (context) => {
    const session = await context.ready(context.open());
    session.send('sleep 1');
    await session.waitForOutput(/sleep 1/);
    // The one shape a polled predicate cannot express: nothing arriving. The
    // wait is longer than the poll's own cadence, so a host that reported
    // regardless of the flag would have spoken by now.
    await new Promise((resolve) => setTimeout(resolve, 1_500));
    assert.equal(session.foreground, undefined);
  });
});
