export interface Contract_eventsEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Contract_eventsQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Contract_eventsAction78 = { type: 'create'; payload: Omit<Contract_eventsEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Contract_eventsEntity78> } | { type: 'delete'; id: string };
