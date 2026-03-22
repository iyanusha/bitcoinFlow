export interface Contract_eventsEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Contract_eventsQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Contract_eventsAction8 = { type: 'create'; payload: Omit<Contract_eventsEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Contract_eventsEntity8> } | { type: 'delete'; id: string };
