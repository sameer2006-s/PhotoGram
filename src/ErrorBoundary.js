import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        // Reset error state when retrying
        Object.defineProperty(this, "resetError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.setState({ hasError: false, error: null });
            }
        });
        this.state = {
            hasError: false,
            error: null,
        };
    }
    // React lifecycle method to catch errors
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    // Optional: Log the error to an external service
    componentDidCatch(error, errorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (_jsxs("div", { children: [_jsx("h1", { children: "Something went wrong." }), _jsx("p", { children: this.state.error?.message }), _jsx("button", { onClick: this.resetError, children: "Retry" })] }));
        }
        return this.props.children;
    }
}
