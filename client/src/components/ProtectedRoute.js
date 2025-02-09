import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchUsuarioLogado } from '../utils/loginUtils';

const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            await fetchUsuarioLogado(setUsuarioLogado);
            setLoading(false);
        };
        fetchUser();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        usuarioLogado && allowedRoles.includes(usuarioLogado.Perfil) ? (
            <Component {...rest} />
        ) : (
            <Navigate to="/not-authorized" />
        )
    );
};

export default ProtectedRoute;
