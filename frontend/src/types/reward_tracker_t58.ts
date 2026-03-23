export interface Reward_trackerEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reward_trackerQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reward_trackerAction58 = { type: 'create'; payload: Omit<Reward_trackerEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Reward_trackerEntity58> } | { type: 'delete'; id: string };
