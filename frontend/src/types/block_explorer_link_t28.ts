export interface Block_explorer_linkEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Block_explorer_linkQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Block_explorer_linkAction28 = { type: 'create'; payload: Omit<Block_explorer_linkEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Block_explorer_linkEntity28> } | { type: 'delete'; id: string };
