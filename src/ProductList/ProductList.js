// Dependencies
import React, {Component} from 'react';
import axios from 'axios';

import './ProductList.css';


class ProductList extends Component {

  state = {
    error: null,
    errorUpdate: null,
    nombreInput: '',
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

  getCategoria = (event) => {
    const categoria_ID = event.target.value;
    this.setState({categoriaInput: categoria_ID});
  };

  saveClient = () => {
    const {nombreInput, categoriaInput} = this.state;
    axios.post('http://10.0.1.153:4000/productos', {
      nombre: nombreInput,
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
      <div className="Form">
      <h2> no implementado </h2>
        <input placeholder=" proximamente " onChange={this.getNombre} value={this.state.nombreInput} />



           <button onClick={this.saveClient}>Guardar</button>
        {this.state.error ? error : ''}
        {this.state.errorUpdate ? errorUpdate : ''}
      </div>
    );
  }
}

export default ProductList;