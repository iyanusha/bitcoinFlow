export interface Block_explorer_linkEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Block_explorer_linkQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Block_explorer_linkAction48 = { type: 'create'; payload: Omit<Block_explorer_linkEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Block_explorer_linkEntity48> } | { type: 'delete'; id: string };
