import React, {Component} from 'react';
import axios from 'axios';
import Card from '../ClientCard/ClientCard';


class ClientList extends Component {

  state = {
    error: null,
    client: [],
    productos:[],
    cliente_productos:[],
    productosAMostrar: [],
  };

  constructor(props, context){
    
    super(props, context);
    axios.get('http://10.0.1.153:4000/clientes')
      .then(response => {
        const {data} = response;
        this.setState({
          client: data})
        })
     axios.get('http://10.0.1.153:4000/productos')
       .then(response => {
            const {data} = response;
            this.setState({
              productos: data})
              console.log(this.mostrarProductos(1))
            })
              axios.get('http://10.0.1.153:4000/cliente_producto')
              .then(response => {
                const {data} = response;
                this.setState({
                  cliente_productos: data
                 })
                
      })
      
  }

  deleteCard = (id) => {
    axios.delete(`http://10.0.1.153:4000/clientes/${id}`)
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
    console.log(clienteId)
    return axios.get(`http://10.0.1.153:4000/cliente_producto/?clienteId=${clienteId}`)
    
    .then(response => {
      const {data} = response 
      console.log(this.state.productos)
      var productoAMostrar = data.forEach(cliente_producto => {
        console.log(data)
        return productoAMostrar = this.state.productos.filter(producto => {
          producto.id === cliente_producto.productoId
          
        })
        console.log(productoAMostrar)  
      })
         

    } )
  }

  getClients = () => {
    return this.state.clients
      .map(client => {
        return (
          <Card key={client.id}
            id={client.id}
            nombre={client.nombre}
            handleDeleteClick={() => this.deleteClient(client.id)}
            handleUpdateClick={() => this.updateElement(client.id)}
          >
            {/* {this.state.producto.nombre} */}
          </Card>
        );
      });
  };
 

  render() {
    const client = this.getClients();
    const error = (<div className="error">{this.state.error}</div>);
 //  const nombreDeProductos = this.productoAMostrar();

    return (
      <div className="Wrap">
        {this.state.error ? error : client} 
        
      </div>
    );
  }
}

export default ClientList;
