export interface Vault_analyticsEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_analyticsQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_analyticsAction38 = { type: 'create'; payload: Omit<Vault_analyticsEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_analyticsEntity38> } | { type: 'delete'; id: string };
