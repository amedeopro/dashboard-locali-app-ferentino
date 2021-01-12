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
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mt-5 mb-3">
              <h1>Gestione Locali APP Ferentino</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col-lg-6 col-xs-12 box">
              { this.state.locali.map(locale =>
                  <div className="row mb-3 mt-3">
                    <div className="col-lg-3">
                      <div className="immagineLocale" style={{backgroundImage : `url(${locale.imgurl})`}}></div>
                    </div>
                    <div className="col-lg-9 d-flex flex-column justify-content-center text-left">
                      <p className="font-weight-bold">{locale.nomeLocale}</p>
                      <p><small>{locale.indirizzo}</small></p>
                    </div>
                  </div>)}
              {/*<ul>*/}
              {/*  { this.state.locali.map(locale => <li><div className="immagineLocale" style={{backgroundImage : `url(${locale.imgurl})`}}></div><p>{locale.nomeLocale}</p><div>{locale.indirizzo}</div></li>)}*/}
              {/*</ul>*/}
            </div>
            <div className="col-lg-6 col-xs-12">
                <button className="btn btn-primary mr-2">Inserisci un nuovo Locale</button>
                <button className="btn btn-primary mr-2">Modifica un Locale</button>
                <button className="btn btn-primary mr-2">Elimina un Locale</button>
                <button className="btn btn-primary mt-3">Aggiorna Lista</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
