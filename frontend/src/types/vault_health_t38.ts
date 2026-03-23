export interface Vault_healthEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_healthQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_healthAction38 = { type: 'create'; payload: Omit<Vault_healthEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_healthEntity38> } | { type: 'delete'; id: string };
