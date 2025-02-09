import React from 'react';
import { Link } from 'react-router-dom';
import './notAuthorized.css';

const NotAuthorized = () => {
    return (
        <div className="not-authorized">
            <h1>Acesso Não Autorizado</h1>
            <p>Você não tem permissão para acessar esta página.</p>
            <Link to="/dashboard">Voltar para o Dashboard</Link>
        </div>
    );
};

export default NotAuthorized;
