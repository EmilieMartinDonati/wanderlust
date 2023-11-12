import { expect, afterEach } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

expect.extend(matchers);

// clear the dom after running each test suite
afterEach(() => {
  cleanup();
});