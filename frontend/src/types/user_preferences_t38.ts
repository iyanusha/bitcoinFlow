export interface User_preferencesEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface User_preferencesQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type User_preferencesAction38 = { type: 'create'; payload: Omit<User_preferencesEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<User_preferencesEntity38> } | { type: 'delete'; id: string };
