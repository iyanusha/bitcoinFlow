export interface Vault_healthEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_healthQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_healthAction8 = { type: 'create'; payload: Omit<Vault_healthEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_healthEntity8> } | { type: 'delete'; id: string };
