export interface Yield_calculatorEntity8 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Yield_calculatorQuery8 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Yield_calculatorAction8 = { type: 'create'; payload: Omit<Yield_calculatorEntity8, 'id'> } | { type: 'update'; id: string; payload: Partial<Yield_calculatorEntity8> } | { type: 'delete'; id: string };
