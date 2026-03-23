export interface Reward_trackerEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reward_trackerQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reward_trackerAction68 = { type: 'create'; payload: Omit<Reward_trackerEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Reward_trackerEntity68> } | { type: 'delete'; id: string };
