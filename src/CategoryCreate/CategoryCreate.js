// Dependencies
import React, {Component} from 'react';
import axios from 'axios';

// Assets
import './CategoryCreate.css';

class CategoryCreate extends Component {

  state = {
    error: null,
    errorUpdate: null,
    nombreCategoria: '',
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

  getNombreCategoria = (event) => {
    const nombreCategoria= event.target.value;
    this.setState({nombreCategoria});
  };



  saveCategoria = () => {
    const {nombreCategoria} = this.state;
    axios.post('http://10.0.1.153:4000/categorias', {
      nombre: nombreCategoria
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
        <h2>Crear Una Categoría Nueva</h2>
        <br/>
        <input placeholder="Categoría " onChange={this.getNombreCategoria} value={this.state.nombreCategoria} />
        <br/>
        <button onClick={this.saveCategoria}>Guardar</button>
        {this.state.error ? error : ''}
        {this.state.errorUpdate ? errorUpdate : ''}
      </div>
    );
  }
}

export default CategoryCreate;
