// Dependencies
import React, {Component} from 'react';
import axios from 'axios';

// Assets
import '../Form.css';

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
      <div className="form">
        <h2>Crear Categoría</h2>
        <div class="input-wrapper">
          <label>Categoría</label>
          <input onChange={this.getNombreCategoria} value={this.state.nombreCategoria} />
        </div>
        <div className="btn-wrapper">
          <button onClick={this.saveCategoria}>Crear</button>
          {this.state.error ? error : ''}
          {this.state.errorUpdate ? errorUpdate : ''}
        </div>
      </div>
    );
  }
}

export default CategoryCreate;
