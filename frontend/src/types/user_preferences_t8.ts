export interface User_preferencesEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface User_preferencesQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type User_preferencesAction8 = { type: 'create'; payload: Omit<User_preferencesEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<User_preferencesEntity8> } | { type: 'delete'; id: string };
