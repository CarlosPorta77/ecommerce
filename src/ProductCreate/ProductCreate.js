// Dependencies
import React, {Component} from 'react';
import axios from 'axios';

// Assets
import '../Form.css';


class ProductCreate extends Component {

  state = {
    error: null,
    errorUpdate: null,
    nombreInput: '',
    stockInput: '',
    categoriaInput: '',
    id: '',
    categorias: []
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
  }

  getNombre = (event) => {
    const nombreInput = event.target.value;
    this.setState({nombreInput});
  };

  getStock = (event) => {
    const stockInput = event.target.value;
    this.setState({stockInput});
  };

  getCategoria = (event) => {
    const categoria_ID = event.target.value;
    this.setState({categoriaInput: categoria_ID});
  };

  saveClient = () => {
    const {nombreInput, stockInput, categoriaInput} = this.state;
    axios.post('http://10.0.1.153:4000/productos', {
      nombre: nombreInput,
      stock: stockInput,
      categoriaID : categoriaInput
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
        <h2>Agregar Un Producto Nuevo</h2>
        <div className="input-wrapper">
          <label>Nombre Producto</label>
          <input onChange={this.getNombre} value={this.state.nombreInput} />
        </div>
        <div className="input-wrapper">
          <label>Stock</label>
          <input type="number" onChange={this.getStock} value={this.state.stockInput} />
        </div>
        <div className="dropdown-wrapper">
          <select className="dropdown" onChange={this.getCategoriaId}>
            {
              this.state.categorias.map((categoria,index) => <option key={index} value={categoria.id}>{categoria.nombre}</option>)

            }
          </select>
        </div>
        <div className="btn-wrapper">
          <button onClick={this.saveClient}>Guardar</button>
          {this.state.error ? error : ''}
          {this.state.errorUpdate ? errorUpdate : ''}
        </div>
      </div>
    );
  }
}

export default ProductCreate;

