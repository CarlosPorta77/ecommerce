import React, {Component} from 'react';
import axios from 'axios';
import ClientCard from '../ClientCard/ClientCard';


class ClientList extends Component {

  state = {
    error: null,
    client: [],
    productos:[],
    cliente_productos:[],
  };

  constructor(props, context){
    super(props, context);
    axios.get('10.0.1.153:4000/clientes')
      .then(response => {
        const {data} = response;
        this.setState({
          client: data})
        })
          axios.get('http://localhost:4000/productos')
          .then(response => {
            const {data} = response;
            this.setState({
              productos: data})
            })
              axios.get('http://localhost:4000/cliente_producto')
              .then(response => {
                const {data} = response;
                this.setState({
                  cliente_productos: data
                 })
      })

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

  updateElement = (clientId) => {
    this.props.history.push(`/clientCreate/${clientId}`)
  };

  mostrarProductos = (clienteId) =>{
    return axios.get(`http://localhost:4000/cliente_producto/${clienteId}`)
    .then(response => {
      const {data} = response
      const productoAMostrar = this.state.productos.filter(producto => {
        return data.cliente_producto.filter(cliente_producto => cliente_producto.productoid === producto.id)
      }) 
      console.log(productoAMostrar)

    } )
  }

  getClients = () => {
    return this.state.client
      .map(client => {
        return (
          <ClientCard key={client.id}
            id={client.id}
            nombre={client.nombre}
            handleDeleteClick={() => this.deleteClient(client.id)}
            handleUpdateClick={() => this.updateElement(client.id)}
          >
            {this.state.producto.nombre}
          </ClientCard>
        );
      });
  };


  render() {
    const client = this.getClients();
    const error = (<div className="error">{this.state.error}</div>);

    return (
      <div className="Wrap">
        {this.state.error ? error : client}
      </div>
    );
  }
}

export default ClientList;
