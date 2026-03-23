export interface Emergency_withdrawEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Emergency_withdrawQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Emergency_withdrawAction18 = { type: 'create'; payload: Omit<Emergency_withdrawEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Emergency_withdrawEntity18> } | { type: 'delete'; id: string };
