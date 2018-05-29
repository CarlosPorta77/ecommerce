// Dependencies
import React, {Component} from 'react';
import axios from 'axios';

// Assets
import './SubCardCreate.css';

class SubCardCreate extends Component {

  state = {
    error: null,
    errorUpdate: null,
    prioridadInput: '',
    descriptionInput: '',
    id_card: '',
    cards: []
  };

  constructor(props){
    super(props);

    axios.get('http://localhost:4000/cards')
      .then(result => {
        const {data} = result;
        this.setState({
          cards: data
        });
      });
  }

  getPrioridad = (event) => {
    const prioridadInput = event.target.value;
    this.setState({prioridadInput});
  };

  getDescription = (event) => {
    const descriptionInput = event.target.value;
    this.setState({descriptionInput});
  };

  getId = (event) => {
    const card_ID = event.target.value;
    this.setState({id_card: card_ID});
  };

  saveCard = () => {
    const {prioridadInput, descriptionInput, id_card} = this.state;
    axios.post('http://localhost:4000/subcards', {
      prioridad: prioridadInput.parseInt(),
      description: descriptionInput,
      id_card: id_card.parseInt()
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
        <input placeholder="Prioridad" onChange={this.getPrioridad} value={this.state.prioridadInput} />
        <input placeholder="Description" onChange={this.getDescription} value={this.state.descriptionInput} />
        <select onChange={this.getId}>
          {
            this.state.cards.map((todo,index) => <option key={index} value={todo.id}>{todo.title}</option>)

          }
        </select>
        <button onClick={this.saveCard}>Add Card</button>
        {this.state.error ? error : ''}
        {this.state.errorUpdate ? errorUpdate : ''}
      </div>
    );
  }
}

export default SubCardCreate;
