export interface User_preferencesEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface User_preferencesQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type User_preferencesAction18 = { type: 'create'; payload: Omit<User_preferencesEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<User_preferencesEntity18> } | { type: 'delete'; id: string };
