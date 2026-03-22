export interface Block_explorer_linkEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Block_explorer_linkQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Block_explorer_linkAction18 = { type: 'create'; payload: Omit<Block_explorer_linkEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Block_explorer_linkEntity18> } | { type: 'delete'; id: string };
