export interface Contract_eventsEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Contract_eventsQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Contract_eventsAction18 = { type: 'create'; payload: Omit<Contract_eventsEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Contract_eventsEntity18> } | { type: 'delete'; id: string };
