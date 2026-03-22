export interface Contract_eventsEntity28 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Contract_eventsQuery28 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Contract_eventsAction28 = { type: 'create'; payload: Omit<Contract_eventsEntity28, 'id'> } | { type: 'update'; id: string; payload: Partial<Contract_eventsEntity28> } | { type: 'delete'; id: string };
