export interface User_preferencesEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface User_preferencesQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type User_preferencesAction58 = { type: 'create'; payload: Omit<User_preferencesEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<User_preferencesEntity58> } | { type: 'delete'; id: string };
