export interface Vault_analyticsEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_analyticsQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_analyticsAction58 = { type: 'create'; payload: Omit<Vault_analyticsEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_analyticsEntity58> } | { type: 'delete'; id: string };
