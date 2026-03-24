/**
 * Form helper utilities for common form operations.
 */

/** Convert a FormData instance to a plain object */
export function formDataToObject(formData: FormData): Record<string, string> {
  const obj: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === 'string') {
      obj[key] = value;
    }
  });
  return obj;
}

/** Check if any form field has changed from initial values */
export function hasFormChanges(
  current: Record<string, string>,
  initial: Record<string, string>,
): boolean {
  return Object.keys(initial).some(key => current[key] !== initial[key]);
}

/** Get list of changed field names */
export function getChangedFields(
  current: Record<string, string>,
  initial: Record<string, string>,
): string[] {
  return Object.keys(initial).filter(key => current[key] !== initial[key]);
}

/** Build a query string from form values (filtering empty strings) */
export function formValuesToQueryString(values: Record<string, string>): string {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    if (value.trim()) {
      params.set(key, value.trim());
    }
  });
  return params.toString();
}

/** Parse a query string back to form values */
export function queryStringToFormValues(
  query: string,
  fields: string[],
): Record<string, string> {
  const params = new URLSearchParams(query);
  const values: Record<string, string> = {};
  fields.forEach(field => {
    values[field] = params.get(field) || '';
  });
  return values;
}
