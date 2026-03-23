export interface Multi_vaultEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Multi_vaultQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Multi_vaultAction78 = { type: 'create'; payload: Omit<Multi_vaultEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Multi_vaultEntity78> } | { type: 'delete'; id: string };
