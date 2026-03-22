export interface Vault_comparisonEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_comparisonQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_comparisonAction18 = { type: 'create'; payload: Omit<Vault_comparisonEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_comparisonEntity18> } | { type: 'delete'; id: string };
