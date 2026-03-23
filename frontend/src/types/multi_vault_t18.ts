export interface Multi_vaultEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Multi_vaultQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Multi_vaultAction18 = { type: 'create'; payload: Omit<Multi_vaultEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Multi_vaultEntity18> } | { type: 'delete'; id: string };
