export interface Vault_migrationEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_migrationQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_migrationAction78 = { type: 'create'; payload: Omit<Vault_migrationEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_migrationEntity78> } | { type: 'delete'; id: string };
