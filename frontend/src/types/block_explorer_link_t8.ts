export interface Block_explorer_linkEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Block_explorer_linkQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Block_explorer_linkAction8 = { type: 'create'; payload: Omit<Block_explorer_linkEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Block_explorer_linkEntity8> } | { type: 'delete'; id: string };
