export interface Reward_trackerEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reward_trackerQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reward_trackerAction28 = { type: 'create'; payload: Omit<Reward_trackerEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Reward_trackerEntity28> } | { type: 'delete'; id: string };
