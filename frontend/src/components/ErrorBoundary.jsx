import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Unhandled React render error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                    <div className="max-w-md w-full bg-white border border-slate-200 rounded-lg shadow-sm p-6 text-center">
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">ShopEZ could not load</h1>
                        <p className="text-slate-600 mb-5">Please refresh the page. If it still happens, clear site data and sign in again.</p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                        >
                            Refresh
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;