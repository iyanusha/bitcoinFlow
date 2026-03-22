export interface Vault_analyticsEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_analyticsQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_analyticsAction78 = { type: 'create'; payload: Omit<Vault_analyticsEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_analyticsEntity78> } | { type: 'delete'; id: string };
