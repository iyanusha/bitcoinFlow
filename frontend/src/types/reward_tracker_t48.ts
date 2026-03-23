export interface Reward_trackerEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reward_trackerQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reward_trackerAction48 = { type: 'create'; payload: Omit<Reward_trackerEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Reward_trackerEntity48> } | { type: 'delete'; id: string };
