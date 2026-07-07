import type { ReactNode } from "react";

interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
    variant?: 'number' | 'operator' | 'action';
    disabled?: boolean;
}

export function Button({ onClick, children, variant = 'number', disabled = false}: ButtonProps){
    const baseClasses = "px-4 py-2 rounded text-white font-bold transition-colors duration-300";
    const variantClasses = {
        number: "bg-blue-500 hover:bg-blue-600",
        operator: "bg-green-500 hover:bg-green-600",
        action: "bg-red-500 hover:bg-red-600"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(1.2)')}
            onMouseOut={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
        >
            {children}
        </button>
    )
}