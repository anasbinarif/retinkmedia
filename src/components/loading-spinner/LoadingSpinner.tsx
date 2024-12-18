export function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-blue-600 font-semibold">Generating...</span>
        </div>
    );
}

export default LoadingSpinner;