import React from 'react';

import './ClientCard.css';

const card = (props) => {
    return (
        <div className="Card">
            <div className="name">
                <span>{props.name}</span>
            </div>
            <div className="container">
                {props.products}
            </div>
            <div className="actions">
                <button className="danger" onClick={props.handleDeleteClick}>DELETE</button>
                <button className="update" onClick={props.handleUpdateClick}>EDITION</button>
                <button className="buy" onClick={props.handleBuyClick}>BUY</button>
            </div>
        </div>
    );
};

export default card;
