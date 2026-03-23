export interface Vault_migrationEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_migrationQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_migrationAction28 = { type: 'create'; payload: Omit<Vault_migrationEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_migrationEntity28> } | { type: 'delete'; id: string };
