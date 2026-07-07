import { useState } from "react";
import { calculatorService } from "../services/api";
import type { CalculatorRequest } from "../types/calculator";

export function useCalculator(){
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const calculate = async (request: CalculatorRequest) => {
        setIsLoading(true);
        setError(null);
        setResult(null);
        try{
            const data = await calculatorService.calculate(request);

            if(data.error){
                setError(data.error);
            }else if(data.result !== undefined){
                setResult(data.result);
            }
        } catch (err){
            if(err instanceof Error){
                setError(err.message);
            }else {
                setError('An unknown error occurred.');
            }
        }finally{
            setIsLoading(false);
        }
    };

    // Return the state and the calculate function
    return { result, error, isLoading, calculate };
}