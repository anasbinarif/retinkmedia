import React from 'react';
import { type ErrorAlertProps } from "./ErrorAlert.types";
import { FiX } from "react-icons/fi";

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div
            className="fixed bottom-4 left-4 max-w-sm bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg flex items-center space-x-4"
            role="alert"
        >
            <span className="flex-1 font-medium">{message}</span>
            <button
                type="button"
                className="text-red-700 text-2xl focus:outline-none hover:text-red-900"
                onClick={onClose}
            >
                <FiX />
            </button>
        </div>
    );
};

export default ErrorAlert;
