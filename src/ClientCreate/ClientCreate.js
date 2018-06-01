// Dependencies
import React, {Component} from 'react';
import axios from 'axios';

// Assets
import './ClientCreate.css';

class ClientCreate extends Component {

  state = {
    error: null,
    errorUpdate: null,
    nombreInput: '',
    id: '',
    clientes: []
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
  }

  getNombre = (event) => {
    const nombreInput = event.target.value;
    this.setState({nombreInput});
  };



  saveClient = () => {
    const {nombreInput} = this.state;
    axios.post('http://10.0.1.153:4000/clientes', {
      nombre: nombreInput
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
        <h2>Crear Un Cliente Nuevo</h2>
        <br/>
        <input placeholder="Nombre " onChange={this.getNombre} value={this.state.nombreInput} />
        <br/>
        <button onClick={this.saveClient}>Guardar</button>
        {this.state.error ? error : ''}
        {this.state.errorUpdate ? errorUpdate : ''}
      </div>
    );
  }
}

export default ClientCreate;
