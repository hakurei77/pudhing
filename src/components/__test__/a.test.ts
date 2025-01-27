// math.test.js
import { describe, it, expect } from 'vitest';
import { add } from '../__test__/a';

describe('add', () => {
    it('should return 3 when adding 1 and 2', () => {
        expect(add(1, 2)).toBe(3);
    });

    it('should return 0 when adding -1 and 1', () => {
        expect(add(-1, 1)).toBe(0);
    });
});