export interface Vault_analyticsEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_analyticsQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_analyticsAction8 = { type: 'create'; payload: Omit<Vault_analyticsEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_analyticsEntity8> } | { type: 'delete'; id: string };
