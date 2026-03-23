export interface Contract_eventsEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Contract_eventsQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Contract_eventsAction68 = { type: 'create'; payload: Omit<Contract_eventsEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Contract_eventsEntity68> } | { type: 'delete'; id: string };
