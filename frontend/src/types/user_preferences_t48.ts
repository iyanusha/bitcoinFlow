export interface User_preferencesEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface User_preferencesQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type User_preferencesAction48 = { type: 'create'; payload: Omit<User_preferencesEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<User_preferencesEntity48> } | { type: 'delete'; id: string };
