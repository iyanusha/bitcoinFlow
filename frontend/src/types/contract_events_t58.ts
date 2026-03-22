export interface Contract_eventsEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Contract_eventsQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Contract_eventsAction58 = { type: 'create'; payload: Omit<Contract_eventsEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Contract_eventsEntity58> } | { type: 'delete'; id: string };
