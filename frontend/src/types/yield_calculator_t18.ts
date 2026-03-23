export interface Yield_calculatorEntity18 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Yield_calculatorQuery18 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Yield_calculatorAction18 = { type: 'create'; payload: Omit<Yield_calculatorEntity18, 'id'> } | { type: 'update'; id: string; payload: Partial<Yield_calculatorEntity18> } | { type: 'delete'; id: string };
