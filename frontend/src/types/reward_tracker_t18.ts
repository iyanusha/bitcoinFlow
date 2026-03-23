export interface Reward_trackerEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reward_trackerQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reward_trackerAction18 = { type: 'create'; payload: Omit<Reward_trackerEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Reward_trackerEntity18> } | { type: 'delete'; id: string };
