// Dependencies
import React, {Component} from 'react';
import axios from 'axios';

import './Purchase.css';


class Purchase extends Component {

  state = {
    error: null,
    errorUpdate: null,
    cantidadInput: '',
    categoriaInput: '',
    productoInput: '',
    clienteInput: '',
    id: '',
    categorias: [],
    clientes:[],
    productos:[]
  };

  constructor(props){
    super(props);

    axios.get('http://10.0.1.153:4000/categorias')
      .then(result => {
        const {data} = result;
        this.setState({
          categorias: data
        });
      });

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
          clientes: data
        });
      });


  }

  getCantidad = (event) => {
    const cantidadIn = event.target.value;
    this.setState({cantidadInput : cantidadIn});
  };

  getCategoria = (event) => {
    const categoria_ID = event.target.value;
    this.setState({categoriaInput: categoria_ID});
  };

  getProducto = (event) => {
    const producto_ID = event.target.value;
    this.setState({productoInput: producto_ID});
  };

  getCliente = (event) => {
    const cliente_ID = event.target.value;
    this.setState({clienteInput: cliente_ID});
  };

  saveClienteProducto = () => {
    const {nombreInput, categoriaInput} = this.state;
    axios.post('http://10.0.1.153:4000/cliente_producto', {
      clienteId: clienteInput,
      productoId : productoInput,
      cantidad: cantidadInput
    }).then(response => {
      this.props.history.push("/");
    })
    .catch(error => {
      this.setState({error: error.message});
    })
  };



  render() {
    const error = (<label>{this.state.error}</label>);
    const errorUpdate = (<label>{this.state.errorUpdate}</label>);
    return (
      <div className="Form">
      <h2> Nueva Compra</h2>
        <br><br> 
       
       <select className="dropdown" onChange={this.getCliente}>
          {
            this.state.clientes.map((cliente,index) => <option key={index} value={cliente.id}>{cliente.nombre}</option>)

          }
        </select>   
       <br>
        <select className="dropdown" onChange={this.getCategoria}>
          {
            this.state.categorias.map((categoria,index) => <option key={index} value={categoria.id}>{categoria.nombre}</option>)

          }
        </select>
        <br>
        <select className="dropdown" onChange={this.getProducto}>
          {
            this.state.producto.map((producto,index) => <option key={index} value={producto.id}>{producto.nombre}</option>)

          }
        </select>
        <br>
        <input placeholder="Cantidad " onChange={this.getCantidad} value={this.state.cantidadInput} />
    
           <button onClick={this.saveClienteProducto}>Guardar Compra</button>
        {this.state.error ? error : ''}
        {this.state.errorUpdate ? errorUpdate : ''}
      </div>
    );
  }
}

export default Purchase;