export interface Reward_trackerEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reward_trackerQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reward_trackerAction8 = { type: 'create'; payload: Omit<Reward_trackerEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Reward_trackerEntity8> } | { type: 'delete'; id: string };
