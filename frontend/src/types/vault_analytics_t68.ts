export interface Vault_analyticsEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_analyticsQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_analyticsAction68 = { type: 'create'; payload: Omit<Vault_analyticsEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_analyticsEntity68> } | { type: 'delete'; id: string };
