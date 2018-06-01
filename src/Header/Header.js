import React from 'react';

import './Header.css';

import Search from '../Search/Search';

import ClientCreate from '../ClientCreate/ClientCreate';
import ClientList from '../ClientList/ClientList';
import ProductCreate from '../ProductCreate/ProductCreate';
//import ProductsDeleteAll from '../ProductsDeleteAll/ProductsDeleteAll';
import ProductList from '../ProductList/ProductList'
import CategoryCreate from '../CategoryCreate/CategoryCreate';
import Purchase from '../Purchase/Purchase';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


const header = (props) => {

    return (
        <Router>
            <div className="App">
                <div className="header">
                    <div className="contenedor-rutas">
                        <div className="ruta"><Link to={'/search'}>Buscar</Link></div> 
                        <div className="ruta"><Link to={'/categoryCreate'}>Crear Categoria</Link></div> 
                        <div className="ruta"><Link to={'/clientCreate'}>Crear Cliente</Link></div>
                        <div className="ruta"><Link to={'/productCreate'}>Crear Productos</Link></div>    
                        <div className="ruta"><Link to={'/clientList'}>Lista Clientes</Link></div>
                        <div className="ruta"><Link to={'/productList'}>Lista Productos</Link></div>
                        <div className="ruta"><Link to={'/productsDeleteAll'}>Borrar Productos</Link></div>
                        <div className="ruta"><Link to={'/purchase'}>Purchase</Link></div>
                    </div>
                </div>
                <Switch>
                    <Route path="/search" component={Search}/>
                    <Route path="/categoryCreate" component={CategoryCreate}/>
                    <Route path="/clientCreate/:clientId?" component={ClientCreate}/>
                    <Route path="/productCreate/:productId?" component={ProductCreate}/>
                    <Route path="/clientList" component={ClientList}/>
                    {/* <Route path="/productList" component={ProductList}/> */}
                    {/* <Route path="/productsDeleteAll/:productId?" component={ProductsDeleteAll}/> */}
                    <Route path="/purchase" component={Purchase}/>
                </Switch>
            </div>
        </Router>
    )
};

export default header;
