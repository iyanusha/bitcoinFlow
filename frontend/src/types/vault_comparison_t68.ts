export interface Vault_comparisonEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_comparisonQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_comparisonAction68 = { type: 'create'; payload: Omit<Vault_comparisonEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_comparisonEntity68> } | { type: 'delete'; id: string };
