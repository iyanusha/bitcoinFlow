export interface Yield_calculatorEntity38 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Yield_calculatorQuery38 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Yield_calculatorAction38 = { type: 'create'; payload: Omit<Yield_calculatorEntity38, 'id'> } | { type: 'update'; id: string; payload: Partial<Yield_calculatorEntity38> } | { type: 'delete'; id: string };
