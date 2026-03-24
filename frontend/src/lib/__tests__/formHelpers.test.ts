import { describe, expect, it } from 'vitest';
import {
  formDataToObject,
  hasFormChanges,
  getChangedFields,
  formValuesToQueryString,
  queryStringToFormValues,
} from '../formHelpers';

describe('formDataToObject', () => {
  it('converts FormData to object', () => {
    const fd = new FormData();
    fd.set('name', 'John');
    fd.set('age', '30');
    expect(formDataToObject(fd)).toEqual({ name: 'John', age: '30' });
  });

  it('returns empty object for empty FormData', () => {
    expect(formDataToObject(new FormData())).toEqual({});
  });
});

describe('hasFormChanges', () => {
  it('returns false when values match', () => {
    const initial = { a: '1', b: '2' };
    expect(hasFormChanges({ ...initial }, initial)).toBe(false);
  });

  it('returns true when values differ', () => {
    const initial = { a: '1', b: '2' };
    expect(hasFormChanges({ a: '1', b: '3' }, initial)).toBe(true);
  });
});

describe('getChangedFields', () => {
  it('returns changed field names', () => {
    const initial = { a: '1', b: '2', c: '3' };
    const current = { a: '1', b: 'changed', c: '3' };
    expect(getChangedFields(current, initial)).toEqual(['b']);
  });

  it('returns empty array when nothing changed', () => {
    const initial = { a: '1' };
    expect(getChangedFields({ ...initial }, initial)).toEqual([]);
  });
});

describe('formValuesToQueryString', () => {
  it('converts values to query string', () => {
    const qs = formValuesToQueryString({ amount: '5', token: 'sBTC' });
    expect(qs).toContain('amount=5');
    expect(qs).toContain('token=sBTC');
  });

  it('skips empty values', () => {
    const qs = formValuesToQueryString({ amount: '5', empty: '' });
    expect(qs).not.toContain('empty');
  });

  it('trims whitespace', () => {
    const qs = formValuesToQueryString({ amount: ' 5 ' });
    expect(qs).toBe('amount=5');
  });
});

describe('queryStringToFormValues', () => {
  it('parses query string to values', () => {
    const values = queryStringToFormValues('amount=5&token=sBTC', ['amount', 'token']);
    expect(values).toEqual({ amount: '5', token: 'sBTC' });
  });

  it('defaults missing fields to empty string', () => {
    const values = queryStringToFormValues('amount=5', ['amount', 'missing']);
    expect(values.missing).toBe('');
  });
});
