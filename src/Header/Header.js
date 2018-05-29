import React from 'react';

import './Header.css';

import ClientList from '../ClientList/ClientList';
import ProductList from '../ProductList/ProductList'

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const header = (props) => {
    return (
        <Router>
            <div>
                <div className="header">
                    <div className="contenedor-rutas">
                        <div className="ruta"><Link to={'/clientList'}>Clientes</Link></div>
                        <div className="ruta"><Link to={'/clientCreate'}>Crear Cliente</Link></div>
                        <div className="ruta"><Link to={'/productList'}>Productos</Link></div>
                        <div className="ruta"><Link to={'/productCreate'}>Crear Productos</Link></div>
                        <div className="ruta"><Link to={'/productsDeleteAll'}>Borrar Productos</Link></div>
                    </div>
                </div>
                <Switch>
                    <Route path="/clientList" component={ClientList}/>
                    <Route path="/clientCreate/:clientId?" component={ClientCreate}/>
                    <Route path="/productList" component={ProductList}/>
                    <Route path="/productCreate/:productId?" component={ProductCreate}/>
                    <Route path="/productsDeleteAll/:productId?" component={ProductsDeleteAll}/>
                </Switch>
            </div>
        </Router>
    )
};

export default header;
