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
          productos: data
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
    const {clienteInput, cantidadInput, productoInput} = this.state;
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
      <div className="form">
      <h2> Asignar Productos</h2>
      <div className="dropdown-wrapper">
         <label>Cliente </label>
       <select className="dropdown" onChange={this.getCliente}>
          {
            this.state.clientes.map((cliente,index) => <option key={index} value={cliente.id}>{cliente.nombre}</option>)

          }
        </select>   
      </div>
      <div className="dropdown-wrapper">
        <label>Categoría </label>
        <select className="dropdown" onChange={this.getCategoria}>
          {
            this.state.categorias.map((categoria,index) => <option key={index} value={categoria.id}>{categoria.nombre}</option>)

          }
        </select>
      </div >
      <div className="dropdown-wrapper">
        <label>Producto: </label>
        <select className="dropdown" onChange={this.getProducto}>
          {
            this.state.productos.map((producto,index) => <option key={index} value={producto.id}>{producto.nombre}</option>)

          }
        </select>
      </div>
      <div className="input-wrapper">
          <label>Cantidad</label>
        <input type="number" onChange={this.getCantidad} value={this.state.cantidadInput} />
      </div>
      <div className="btn-wrapper">
        <button onClick={this.saveClienteProducto}>Guardar Compra</button>
        {this.state.error ? error : ''}
        {this.state.errorUpdate ? errorUpdate : ''}
      </div>
      </div>
    );
  }
}
  
export default Purchase;