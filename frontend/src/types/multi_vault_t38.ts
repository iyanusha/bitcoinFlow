export interface Multi_vaultEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Multi_vaultQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Multi_vaultAction38 = { type: 'create'; payload: Omit<Multi_vaultEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Multi_vaultEntity38> } | { type: 'delete'; id: string };
