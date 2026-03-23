export interface Multi_vaultEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Multi_vaultQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Multi_vaultAction8 = { type: 'create'; payload: Omit<Multi_vaultEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Multi_vaultEntity8> } | { type: 'delete'; id: string };
