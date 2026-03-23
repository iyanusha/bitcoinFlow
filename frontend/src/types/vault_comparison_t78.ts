export interface Vault_comparisonEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_comparisonQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_comparisonAction78 = { type: 'create'; payload: Omit<Vault_comparisonEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_comparisonEntity78> } | { type: 'delete'; id: string };
