export interface Vault_analyticsEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_analyticsQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_analyticsAction18 = { type: 'create'; payload: Omit<Vault_analyticsEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_analyticsEntity18> } | { type: 'delete'; id: string };
