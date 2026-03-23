export interface Vault_migrationEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_migrationQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_migrationAction58 = { type: 'create'; payload: Omit<Vault_migrationEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_migrationEntity58> } | { type: 'delete'; id: string };
