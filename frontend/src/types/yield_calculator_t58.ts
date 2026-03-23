export interface Yield_calculatorEntity58 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Yield_calculatorQuery58 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Yield_calculatorAction58 = { type: 'create'; payload: Omit<Yield_calculatorEntity58, 'id'> } | { type: 'update'; id: string; payload: Partial<Yield_calculatorEntity58> } | { type: 'delete'; id: string };
