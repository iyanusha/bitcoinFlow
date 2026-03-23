export interface Vault_healthEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_healthQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_healthAction58 = { type: 'create'; payload: Omit<Vault_healthEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_healthEntity58> } | { type: 'delete'; id: string };
