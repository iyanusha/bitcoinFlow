export interface Contract_eventsEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Contract_eventsQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Contract_eventsAction38 = { type: 'create'; payload: Omit<Contract_eventsEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Contract_eventsEntity38> } | { type: 'delete'; id: string };
