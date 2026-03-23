export interface Yield_calculatorEntity68 { id: string; name: string; value: number; status: 'active' | 'pending' | 'closed'; createdAt: number; updatedAt: number; }
export interface Yield_calculatorQuery68 { page: number; limit: number; sort: 'asc' | 'desc'; filter?: string; }
export type Yield_calculatorAction68 = { type: 'create'; payload: Omit<Yield_calculatorEntity68, 'id'> } | { type: 'update'; id: string; payload: Partial<Yield_calculatorEntity68> } | { type: 'delete'; id: string };
