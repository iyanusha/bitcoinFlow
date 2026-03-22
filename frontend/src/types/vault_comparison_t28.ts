export interface Vault_comparisonEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_comparisonQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_comparisonAction28 = { type: 'create'; payload: Omit<Vault_comparisonEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_comparisonEntity28> } | { type: 'delete'; id: string };
