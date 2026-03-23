export interface Vault_healthEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_healthQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_healthAction28 = { type: 'create'; payload: Omit<Vault_healthEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_healthEntity28> } | { type: 'delete'; id: string };
