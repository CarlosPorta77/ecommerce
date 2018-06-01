import React, {Component} from 'react';
import axios from 'axios';
import Card from '../ClientCard/ClientCard';


class ClientList extends Component {

  state = {
    error: null,
    clientes: [],
    productos:[],
    cliente_producto:[],
    productosAMostrar: [],
  };

  constructor(props){
    
    super(props);

    axios.get('http://10.0.1.153:4000/clientes')
    .then(result => {
      const {data} = result;
      this.setState({
        clientes: data
      });
    });

    axios.get('http://10.0.1.153:4000/productos')
    .then(result => {
      const {data} = result;
      this.setState({
        productos: data
      });
    });

    axios.get('http://10.0.1.153:4000/cliente_producto')
    .then(result => {
      const {data} = result;
      this.setState({
        cliente_producto: data
      });
    });

      
  }

  deleteClient= (id) => {
    axios.delete(`http://10.0.1.153:4000/clientes/${id}`)
      .then(() => {
        const newClient = this.state.clientes.filter(client => {
          return client.id !== id;
        });
        this.setState({
          clientes: newClient
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  }

  updateElement = (clientId) => {
    this.props.history.push(`/clientCreate/${clientId}`)
  };

  mostrarProductos = (clienteId) =>{
    return axios.get(`http://10.0.1.153:4000/cliente_producto/?clienteId=${clienteId}`)
    
    .then(response => {
      const {data} = response 
      console.log(this.state.productos)
      var productoAMostrar = data.forEach(cliente_producto => {
        console.log(data)
        return productoAMostrar = this.state.productos.filter(producto => {
          producto.id === cliente_producto.productoId
          
        })
      })
         

    } )
  }

  getClients = () => {
    return this.state.clientes
      .map(client => {
        return (
          <Card key={client.id}
            id={client.id}
            nombre={client.nombre}
            productos= {this.mostrarProductos(client.id)}
            handleDeleteClick={() => this.deleteClient(client.id)}
            handleUpdateClick={() => this.updateElement(client.id)}
          >
            
          </Card>
        );
      });
  };
 

  render() {
    const client = this.getClients()
    const error = (<div className="error">{this.state.error}</div>);

    return (
      <div className="Wrap">
        {this.state.error ? error : client} 
        
      </div>
    );
  }
}

export default ClientList;
