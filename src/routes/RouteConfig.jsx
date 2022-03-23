import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layouts/mainlayout/MainLayout';
import Login from '../components/auths/login/Login';
import Register from '../components/auths/register/Register';
import Home from '../pages/home/Home';
import { AuthContext } from '../contexts/AuthContext';

const routes = {
    guest: [
        { path: '/', element: <Home /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '*', element: <Navigate to="/" replace={true} /> },
    ],
    user: [
        { path: '/', element: <Home /> },
        { path: '*', element: <Navigate to="/" replace={true} /> },
    ],
    admin: [
        { path: '/', element: <Home /> },
        { path: '*', element: <Navigate to="/" replace={true} /> },
    ],
};

function RouteConfig() {
    const { role, user } = useContext(AuthContext);

    if ((role === 'user' || role === 'admin') && !user) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    return (
        <>
            {role === 'user' ? (
                <>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            {routes[role].map((item) => (
                                <Route
                                    path={item.path}
                                    element={item.element}
                                    key={item.path}
                                />
                            ))}
                        </Route>
                    </Routes>
                    {/* <Footer /> */}
                </>
            ) : role === 'admin' ? (
                <>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            {routes[role]?.map((item) => (
                                <Route
                                    path={item.path}
                                    element={item.element}
                                    key={item.path}
                                />
                            ))}
                        </Route>
                    </Routes>
                </>
            ) : (
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        {routes[role]?.map((item) => (
                            <Route
                                path={item.path}
                                element={item.element}
                                key={item.path}
                            />
                        ))}
                    </Route>
                </Routes>
            )}
        </>
    );
}

export default RouteConfig;
