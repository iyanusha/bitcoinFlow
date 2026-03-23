export interface User_preferencesEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface User_preferencesQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type User_preferencesAction28 = { type: 'create'; payload: Omit<User_preferencesEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<User_preferencesEntity28> } | { type: 'delete'; id: string };
