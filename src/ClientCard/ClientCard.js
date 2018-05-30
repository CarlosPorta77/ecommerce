import React from 'react';

//import './ProductCard.css';

const card = (props) => {
    return (
        <div className="Card">
            <div className="name">
                <span>{props.name}</span>
            </div>
            <div className="container">
                {props.category}
            </div>
            <div className="actions">
                <button className="danger" onClick={props.handleDeleteClick}>DELETE</button>
                <button className="update" onClick={props.handleUpdateClick}>EDITION</button>
            </div>
        </div>
    );
};

export default card;
