export interface Vault_analyticsEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_analyticsQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_analyticsAction28 = { type: 'create'; payload: Omit<Vault_analyticsEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_analyticsEntity28> } | { type: 'delete'; id: string };
