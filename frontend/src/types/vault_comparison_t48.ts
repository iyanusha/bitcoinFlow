export interface Vault_comparisonEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_comparisonQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_comparisonAction48 = { type: 'create'; payload: Omit<Vault_comparisonEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_comparisonEntity48> } | { type: 'delete'; id: string };
