export interface CalculatorRequest {
    operation: string;
    numberA: number;
    numberB: number;
}

export interface CalculatorResponse {
    result?: number;
    error?: string;
}