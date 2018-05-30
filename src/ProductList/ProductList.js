import React, {Component} from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';


class ClientList extends Component {

  state = {
    error: null,
    cards: []
  };

  constructor(props, context){
    super(props, context);
    axios.get('http://localhost:4000/client')
      .then(response => {
        const {data} = response;
        this.setState({
          client: data
        });
      });

  }

  deleteCard = (id) => {
    axios.delete(`http://localhost:4000/client/${id}`)
      .then(() => {
        const newClient = this.state.client.filter(client => {
          return client.id !== id;
        });
        this.setState({
          client: newClient
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  };

  updateElement = (clienteId) => {
    this.props.history.push(`/clientCreate/${clienteId}`)
  };

  getClients = () => {
    return this.state.client
      .map(client => {
        return (
          <Client key={client.id}
            id={client.id}
            nombre={client.nombre}
            handleDeleteClick={() => this.deleteClient(client.id)}
            handleUpdateClick={() => this.updateElement(client.id)}
          >
            {cliente.nombre}
          </Client>
        );
      });
  };

  render() {
    const cards = this.getCards();
    const error = (<div className="error">{this.state.error}</div>);

    return (
      <div className="Wrap">
        {this.state.error ? error : cards}
      </div>
    );
  }
}

export default ClientList;
