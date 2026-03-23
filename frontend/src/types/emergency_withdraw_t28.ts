export interface Emergency_withdrawEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Emergency_withdrawQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Emergency_withdrawAction28 = { type: 'create'; payload: Omit<Emergency_withdrawEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Emergency_withdrawEntity28> } | { type: 'delete'; id: string };
