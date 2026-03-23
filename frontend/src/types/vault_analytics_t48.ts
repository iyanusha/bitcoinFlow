export interface Vault_analyticsEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_analyticsQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_analyticsAction48 = { type: 'create'; payload: Omit<Vault_analyticsEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_analyticsEntity48> } | { type: 'delete'; id: string };
