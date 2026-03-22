export interface Vault_comparisonEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_comparisonQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_comparisonAction58 = { type: 'create'; payload: Omit<Vault_comparisonEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_comparisonEntity58> } | { type: 'delete'; id: string };
