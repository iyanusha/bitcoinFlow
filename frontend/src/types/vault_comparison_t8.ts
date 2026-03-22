export interface Vault_comparisonEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_comparisonQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_comparisonAction8 = { type: 'create'; payload: Omit<Vault_comparisonEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_comparisonEntity8> } | { type: 'delete'; id: string };
