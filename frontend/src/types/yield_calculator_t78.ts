export interface Yield_calculatorEntity78 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Yield_calculatorQuery78 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Yield_calculatorAction78 = { type: 'create'; payload: Omit<Yield_calculatorEntity78, 'id'> } | { type: 'update'; id: string; payload: Partial<Yield_calculatorEntity78> } | { type: 'delete'; id: string };
