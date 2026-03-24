import { describe, expect, it } from 'vitest';
import { ObjectPool } from '../objectPool';

describe('ObjectPool', () => {
  const createPool = () =>
    new ObjectPool<{ x: number; y: number }>(
      () => ({ x: 0, y: 0 }),
      (obj) => { obj.x = 0; obj.y = 0; },
      3,
      5,
    );

  it('creates initial objects', () => {
    const pool = createPool();
    expect(pool.size).toBe(3);
  });

  it('acquires from pool', () => {
    const pool = createPool();
    const obj = pool.acquire();
    expect(obj).toEqual({ x: 0, y: 0 });
    expect(pool.size).toBe(2);
  });

  it('releases back to pool', () => {
    const pool = createPool();
    const obj = pool.acquire();
    obj.x = 42;
    pool.release(obj);
    expect(pool.size).toBe(3);
    const reused = pool.acquire();
    expect(reused.x).toBe(0); // reset was called
  });

  it('creates new object when pool is empty', () => {
    const pool = createPool();
    pool.acquire();
    pool.acquire();
    pool.acquire();
    expect(pool.size).toBe(0);
    const obj = pool.acquire();
    expect(obj).toEqual({ x: 0, y: 0 });
  });

  it('does not exceed maxSize', () => {
    const pool = createPool();
    const objs = [];
    for (let i = 0; i < 10; i++) objs.push(pool.acquire());
    for (const obj of objs) pool.release(obj);
    expect(pool.size).toBe(5);
  });

  it('drains all objects', () => {
    const pool = createPool();
    pool.drain();
    expect(pool.size).toBe(0);
  });
});
