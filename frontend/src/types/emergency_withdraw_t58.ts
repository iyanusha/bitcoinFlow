export interface Emergency_withdrawEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Emergency_withdrawQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Emergency_withdrawAction58 = { type: 'create'; payload: Omit<Emergency_withdrawEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Emergency_withdrawEntity58> } | { type: 'delete'; id: string };
