import { Component } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import Searchbox from './components/search-box/search-box.component';


class App extends Component {
  constructor(){
    super();
    this.state = {
      monsters: [],
      searchField: '',
    }
}
componentDidMount(){
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users) => this.setState(
      () => {
        return {monsters:users};
      })
  ); //returneaza un obiect unde monstri sunt users
}

onSearchChange = (event)=>
  {
  const searchField = event.target.value.toLocaleLowerCase();
 
    this.setState(()=>{
      return{searchField};
    });
  }

render(){
    const {monsters,searchField} = this.state;
    const {onSearchChange} = this;
    const filterMonsters = monsters.filter((monster) => { 
    return monster.name.toLocaleLowerCase().includes(searchField); // daca numele include string ul atunci va returna true
    });
    return (
      <div className='App'>
        <h1 className='app-title'>Monsters Rolodex</h1>
        <Searchbox onChangeHandler={onSearchChange} placeholder = 'search monsters' className='monsters-search-box' />
        <CardList monsters={filterMonsters} />       
        
      </div>
    );
  };
}

export default App;
