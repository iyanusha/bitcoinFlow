export interface Multi_vaultEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Multi_vaultQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Multi_vaultAction28 = { type: 'create'; payload: Omit<Multi_vaultEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Multi_vaultEntity28> } | { type: 'delete'; id: string };
