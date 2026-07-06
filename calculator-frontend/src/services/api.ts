import type { CalculatorRequest, CalculatorResponse } from "../types/calculator";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const calculatorService = {
    async calculate(payload: CalculatorRequest): Promise<CalculatorResponse> {
        
        const response = await fetch(`${API_BASE_URL}/calculate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok){
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.error || 'Network response was not ok');
        }
        return response.json();
        
    }
}