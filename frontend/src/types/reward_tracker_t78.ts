export interface Reward_trackerEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reward_trackerQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reward_trackerAction78 = { type: 'create'; payload: Omit<Reward_trackerEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Reward_trackerEntity78> } | { type: 'delete'; id: string };
