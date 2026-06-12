import { beforeAll, afterAll, afterEach } from 'vitest';
import { config } from 'dotenv';

beforeAll(() => {
  config({ path: '.env.test' });
});

afterEach(() => {});

afterAll(() => {
  console.log('✅ Test suite completed');
});
