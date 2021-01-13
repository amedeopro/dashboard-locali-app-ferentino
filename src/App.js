import axios from 'axios';
import './App.css';
import React, { Component } from 'react';

class App extends React.Component {

  state = {
    locali: [],
      visualizzaInserimento: false
  }

  componentDidMount(){
    axios.get('http://localhost:8080/feed/posts/')
    .then(res => {
      const locali = res.data.locali;
      this.setState({locali});
      console.log(locali);
    })
  }

  toggleiewInsert = () => {

      const visualizza = this.state.visualizzaInserimento

      this.setState({
          visualizzaInserimento: !visualizza
      })
}




  render() {
      return(
      <div className="App">

          {this.state.visualizzaInserimento &&
        <div className="container mt-5">
          <div className="row">
                <div className="col-lg-6 mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Nome locale</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1"
                         placeholder="es. Pizzeria da ..."></input>
                  <label htmlFor="exampleFormControlInput1" className="form-label">Indirizzo</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1"
                         placeholder="ex. Via Casilina ..."></input>
                  <label htmlFor="exampleFormControlInput1" className="form-label">Latitudine</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1"
                         placeholder="es. 144.123456"></input>
                  <label htmlFor="exampleFormControlInput1" className="form-label">Link Immagine</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1"
                         placeholder="es. https://www.test.com/img.jpeg"></input>
                </div>
                <div className="col-lg-6 mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Tipologia di locale</label>
                  <select className="form-control" name="" id="">
                    <option value="">Pizzeria</option>
                    <option value="">Ristorante</option>
                    <option value="">Pub</option>
                    <option value="">Cocktail Bar</option>
                  </select>
                  <label htmlFor="exampleFormControlInput1" className="form-label">Numero di Telefono</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1"
                         placeholder="es. 0775123456"></input>
                  <label htmlFor="exampleFormControlInput1" className="form-label">Longitudine</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1"
                         placeholder="ex -122.987654"></input>
                </div>
          </div>
        </div> }
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
                      <div className="immagineLocale" style={{backgroundImage : `url('http://localhost:8080/${locale.imgurl}`}}></div>
                    </div>
                    <div className="col-lg-9 d-flex flex-column justify-content-center text-left">
                      <p className="font-weight-bold">{locale.nomeLocale}</p>
                      <p><small>{locale.indirizzo}</small></p>
                    </div>
                  </div>)}
            </div>
            <div className="col-lg-6 col-xs-12">
                <button className="btn btn-primary mr-2" onClick={this.toggleiewInsert}>Inserisci un nuovo Locale</button>
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
