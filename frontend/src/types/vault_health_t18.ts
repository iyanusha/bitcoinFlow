export interface Vault_healthEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_healthQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_healthAction18 = { type: 'create'; payload: Omit<Vault_healthEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_healthEntity18> } | { type: 'delete'; id: string };
