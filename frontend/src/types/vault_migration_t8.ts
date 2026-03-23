export interface Vault_migrationEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_migrationQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_migrationAction8 = { type: 'create'; payload: Omit<Vault_migrationEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_migrationEntity8> } | { type: 'delete'; id: string };
