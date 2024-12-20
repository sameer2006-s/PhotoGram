import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RouterProvider } from "react-router-dom";
import router from './routes';
import ErrorBoundary from './ErrorBoundary';
import { UserAuthProvider } from './context/userAuthContext';
const App = (props) => {
    return _jsx(ErrorBoundary, { children: _jsxs(UserAuthProvider, { children: [" ", _jsx(RouterProvider, { router: router })] }) });
};
export default App;
