export interface Vault_migrationEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_migrationQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_migrationAction38 = { type: 'create'; payload: Omit<Vault_migrationEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_migrationEntity38> } | { type: 'delete'; id: string };
