export interface Contract_eventsEntity48 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Contract_eventsQuery48 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Contract_eventsAction48 = { type: 'create'; payload: Omit<Contract_eventsEntity48, 'id'> } | { type: 'update'; id: string; payload: Partial<Contract_eventsEntity48> } | { type: 'delete'; id: string };
