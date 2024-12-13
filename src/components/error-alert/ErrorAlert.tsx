import React from 'react';
import {type ErrorAlertProps} from "./ErrorAlert.types";

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{message}</span>
            <button
                type="button"
                className="absolute top-0 bottom-0 right-0 px-4 py-3 text-red-700"
                onClick={onClose}
            >
                <span className="font-bold">×</span>
            </button>
        </div>
    );
};

export default ErrorAlert;