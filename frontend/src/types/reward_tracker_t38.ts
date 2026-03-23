export interface Reward_trackerEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Reward_trackerQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Reward_trackerAction38 = { type: 'create'; payload: Omit<Reward_trackerEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Reward_trackerEntity38> } | { type: 'delete'; id: string };
