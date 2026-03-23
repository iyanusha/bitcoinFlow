export interface User_preferencesEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface User_preferencesQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type User_preferencesAction68 = { type: 'create'; payload: Omit<User_preferencesEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<User_preferencesEntity68> } | { type: 'delete'; id: string };
