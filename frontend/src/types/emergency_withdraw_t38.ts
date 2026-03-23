export interface Emergency_withdrawEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Emergency_withdrawQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Emergency_withdrawAction38 = { type: 'create'; payload: Omit<Emergency_withdrawEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Emergency_withdrawEntity38> } | { type: 'delete'; id: string };
