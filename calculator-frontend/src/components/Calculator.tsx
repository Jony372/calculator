import { useState } from "react";
// import { useCalculator } from "../hooks/useCalculator";
import { calculatorService } from "../services/api";
import { Button } from "./Buttons";

const OPERATOR_MAP: Record<string, string> = {
    '+': 'addition',
    '-': 'subtraction',
    '*': 'multiplication',
    '/': 'division',
    '√': 'square_root',
    '%': 'percentage'
};

export function Calculator(){
    const [display, setDisplay] = useState<string>('0');
    const [numberA, setNumberA] = useState<number | null>(null);
    const [operation, setOperation] = useState<string | null>(null);
    const [waitingForNewValue, setWaitingForNewValue] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // const [numberB, setNumberB] = useState<number | ''>('');

    // Handles numeric and decimal input
    const handleNumber = (numStr: string) => {
        if (waitingForNewValue) {
            setDisplay(numStr);
            setWaitingForNewValue(false);
        } else {
            // Prevent multiple decimal points
            if(numStr === '.' && display.includes('.')) return;
            //Replace initial 0, unless it's a decimal point
            setDisplay(display === '0' && numStr !== '.' ? numStr : display + numStr);
        }
    }

    const executeCalculation = async (a: number, b: number, op: string): Promise<number | null> => {
        setIsLoading(true);
        try{
            const response = await calculatorService.calculate({
                numberA: a,
                numberB: b,
                operation: op
            });
            if(response.error){
                setError(response.error);
                return null;
            }
            return response.result ?? null;
        }catch (err){
            setError('Network error');
            console.error(err);
            return null;
        } finally{
            setIsLoading(false);
        }
    }

    // Handles math operators
    const handleOperator = async (nextOperator: string, needsTwoValues: boolean = true) => {
        setError(null);
        const inputValue = parseFloat(display);
        if (!needsTwoValues && numberA === null) {
            const result = await executeCalculation(inputValue, 0, OPERATOR_MAP[nextOperator]);
            if(result !== null){
                setDisplay(String(result));
                setNumberA(result);
            }
            return;
        }
        if (numberA !== null && operation && !waitingForNewValue) {
            const result = await executeCalculation(numberA, inputValue, operation);
            if(result !== null){
                setDisplay(String(result));
                setNumberA(result);
            }
        } else {
            setNumberA(inputValue);
            setDisplay('0');
        }

        setWaitingForNewValue(true);
        setOperation(OPERATOR_MAP[nextOperator]);
    }

    // Handles the '=' button
    const handleEquals = async () => {
        if(numberA === null || operation === null) return;
        const inputValue = parseFloat(display);
        const result = await executeCalculation(numberA, inputValue, operation);
        if(result !== null){
            setDisplay(String(result));
            setNumberA(null);
            setOperation(null);
            setWaitingForNewValue(true);
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setNumberA(null);
        setOperation(null);
        setWaitingForNewValue(false);
        setError(null);
    }

    const handleBackspace = () => {
        if(waitingForNewValue) return;
        setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    }

    return (
        <>
        <div
            className="max-w-80 md:max-w-xl w-full my-8 mx-auto m-4"
        >
            {/* Display area */}
            <div
                className="bg-gray-800 text-white p-6 rounded-t-xl text-right min-h-20 flex flex-col justify-end"
            >
                {error ? (
                    <span className="text-red-400 text-xl">{error}</span>
                ):(
                    <span className="text-4xl overflow-hidden">{isLoading?'...':display}</span>
                )}

            </div>
        {/* Keypad area */}
        <div
            className="grid grid-cols-4 gap-2 bg-black p-3 rounded-b-xl"
        >
            {/* Row 1 */}
            <Button onClick={handleClear} variant="action" disabled={isLoading}>AC</Button>
            <Button onClick={() => {handleOperator('√', false)}} variant="operator" disabled={isLoading}>√</Button>
            <Button onClick={() => {handleOperator('%')}} variant="operator" disabled={isLoading}>%</Button>
            <Button onClick={handleBackspace} variant="action" disabled={isLoading}>⌫</Button>

            {/* Row 2 */}
            <Button onClick={() => {handleNumber('7')}} variant="number" disabled={isLoading}>7</Button>
            <Button onClick={() => {handleNumber('8')}} variant="number" disabled={isLoading}>8</Button>
            <Button onClick={() => {handleNumber('9')}} variant="number" disabled={isLoading}>9</Button>
            <Button onClick={() => {handleOperator('/')}} variant="operator" disabled={isLoading}>÷</Button>

            {/* Row 3 */}
            <Button onClick={() => {handleNumber('4')}} variant="number" disabled={isLoading}>4</Button>
            <Button onClick={() => {handleNumber('5')}} variant="number" disabled={isLoading}>5</Button>
            <Button onClick={() => {handleNumber('6')}} variant="number" disabled={isLoading}>6</Button>
            <Button onClick={() => {handleOperator('*')}} variant="operator" disabled={isLoading}>×</Button>

            {/* Row 4 */}
            <Button onClick={() => {handleNumber('1')}} variant="number" disabled={isLoading}>1</Button>
            <Button onClick={() => {handleNumber('2')}} variant="number" disabled={isLoading}>2</Button>
            <Button onClick={() => {handleNumber('3')}} variant="number" disabled={isLoading}>3</Button>
            <Button onClick={() => {handleOperator('-')}} variant="operator" disabled={isLoading}>−</Button>

            {/* Row 5 */}
            <Button onClick={() => {handleNumber('0')}} variant="number" disabled={isLoading}>0</Button>
            <Button onClick={() => {handleNumber('.')}} variant="number" disabled={isLoading}>.</Button>
            <Button onClick={handleEquals} variant="operator" disabled={isLoading}>=</Button>
            <Button onClick={() => {handleOperator('+')}} variant="operator" disabled={isLoading}>+</Button>

        </div>
        </div>
        </>
    )

    // Use the custom hook to manage calculator state and logic
    // const { result, error, isLoading, calculate } = useCalculator();
}