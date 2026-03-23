export interface Vault_migrationEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Vault_migrationQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Vault_migrationAction48 = { type: 'create'; payload: Omit<Vault_migrationEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Vault_migrationEntity48> } | { type: 'delete'; id: string };
