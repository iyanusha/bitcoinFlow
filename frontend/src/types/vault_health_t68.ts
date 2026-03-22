export interface Vault_healthEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_healthQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_healthAction68 = { type: 'create'; payload: Omit<Vault_healthEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_healthEntity68> } | { type: 'delete'; id: string };
