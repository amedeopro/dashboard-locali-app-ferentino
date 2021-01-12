import axios from 'axios';
import './App.css';
import React from 'react';

class App extends React.Component {

  state = {
    locali: []
  }

componentDidMount(){
  axios.get('http://localhost:8080/feed/posts/')
  .then(res => {
    const locali = res.data.locali;
    this.setState({locali});
    console.log(locali);
  })
}

  render() {
    return(
      <div className="App">
        <h1>Lista Locali Attivi</h1>
        <ul style={{listStyle: "none"}}>
        { this.state.locali.map(locale => <li>{locale.nomeLocale}</li>)}
      </ul>
      </div>
    );
  }
}

export default App;
