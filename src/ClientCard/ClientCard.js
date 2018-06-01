import React from 'react';

import './ClientCard.css';

const ClientCard = (props) => {
    return (
        <div className="Card">
            <div className="name">
                <span>{props.nombre}</span>
            </div>
            <div className="container">
                {//props.productos.map( producto => producto.nombre )
                        <p>aca van los productos</p>
                    }
            </div>
            <div className="actions">
                <button className="danger" onClick={props.handleDeleteClick}>DELETE</button>
                <button className="update" onClick={props.handleUpdateClick}>EDITION</button>
            </div>
        </div>
    );
};

export default ClientCard;
