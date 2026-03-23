export interface Multi_vaultEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Multi_vaultQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Multi_vaultAction48 = { type: 'create'; payload: Omit<Multi_vaultEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Multi_vaultEntity48> } | { type: 'delete'; id: string };
