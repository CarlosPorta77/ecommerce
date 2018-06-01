// Dependencies
import React, {Component} from 'react';
import axios from 'axios';


class Search extends Component {

  state = {
    error: null,
    errorUpdate: null,
    nombreInput: '',
    productos : []
  };

  constructor(props){
    super(props);


  }

  getNombre = (event) => {
    const nombreInput = event.target.value;
    this.setState({nombreInput});
    if (nombreInput.lenght() > 3) this.searchProducto(nombreInput.toLowerCase())
  };

searchProducto = (parametro) => {
    axios.get('http://10.0.1.153:4000/productos/?nombre={$parametro}')
      .then(result => {
        const {data} = result;
        this.setState({
          productos: data
        });
      });


   }




  render() {
    const error = (<label>{this.state.error}</label>);
    const errorUpdate = (<label>{this.state.errorUpdate}</label>);
    return (
        <div className="Form">
          <h2>Buscar producto por nombre </h2>
          <input placeholder="Nombre Producto " onChange={this.getNombre} value={this.state.nombreInput} />
          {/*this.state.error ? error : ''}
          {this.state.errorUpdate ? errorUpdate : ''*/}
          <br/>
          <br/>
          <h2> Resultado de la búsqueda: </h2>
          <ul>
          { 
          <li>
                {/*this.state.productos.map((producto,index) => (producto.nombre) )*/}
            </li> 
          
          }
          </ul>

        </div>

    );
  }
}

export default Search;