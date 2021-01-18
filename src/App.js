import axios from 'axios';
import './App.css';
import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";

function App() {

    const [locali, setLocali] = useState([]);
    const [visualizzaInserimento, setVisualizzaInserimento] = useState(false);

    useEffect(() => {
            getLocali();
    }, []);

    function getLocali(){
        axios.get('http://localhost:8080/feed/posts/')
            .then(res => {
                const localiData = res.data.locali;
                setLocali({localiData});
            })
    }

      return(
      <div className="App">

              <h1>Gestione Locali APP Ferentino</h1>
        <Grid container spacing={3}>
          <Grid item xs={6}>
              { Array.isArray(locali.localiData) &&  locali.localiData.map(locale =>
                  <div className="row mb-3 mt-3">
                    <div className="col-lg-3">
                      <div className="immagineLocale" style={{backgroundImage : `url('http://localhost:8080/${locale.imgurl}`}}></div>
                    </div>
                    <div className="col-lg-9 d-flex flex-column justify-content-center text-left">
                      <p className="font-weight-bold">{locale.nomeLocale}</p>
                      <p><small>{locale.indirizzo}</small></p>
                    </div>
                  </div>)}
          </Grid>
<Grid item xs={6}>
            <Box component="span" m={1}>
                <Button color="primary" variant="contained" onClick={() => setVisualizzaInserimento(!visualizzaInserimento)}>Inserisci un nuovo Locale</Button>
            </Box>
            <Box component="span" m={1}>
                <Button color="primary" variant="contained">Modifica un Locale</Button>
            </Box>
            <Box component="span" m={1}>
                <Button color="primary" variant="contained">Elimina un Locale</Button>
            </Box>
            <Box component="span" m={1}>
                <Button color="primary" variant="contained">Aggiorna Lista</Button>
            </Box>

    {visualizzaInserimento &&
    <Container>
        <Formik
            initialValues={{
                nomeLocale:'',
                tipologia: '',
                indirizzo: '',
                tel: '',
                imgurl: '',
                lat: 0,
                longitudine: 0
            }}
            // validate={values => {
            //     const errors = {};
            //     if (!values.email) {
            //         errors.email = 'Required';
            //     } else if (
            //         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            //     ) {
            //         errors.email = 'Invalid email address';
            //     }
            //     return errors;
            // }}
            onSubmit={async (values) => {
                axios.post('http://localhost:8080/feed/post/', values)
                    .then(res =>{
                        console.log(res);
                        getLocali();
                        ;                          })
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                <Form onSubmit={handleSubmit} >

                    <TextField
                        label="Nome del locale"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="text"
                        id="nomeLocale"
                        name="nomeLocale"
                        placeholder="Nome del locale"
                        value={values.nomeLocale}
                        onChange={handleChange}
                        helperText="Es. Pizzeria da ..."
                    ></TextField>

                    <TextField
                        label="Indirizzo"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="text"
                        id="indirizzo"
                        name="indirizzo"
                        placeholder="ex. Via Casilina ..."
                        value={values.indirizzo}
                        onChange={handleChange}></TextField>

                    <TextField
                        label="Url dell'Immagine"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="text"
                        id="imgurl"
                        name="imgurl"
                        placeholder="es. https://www.test.com/img.jpeg"
                        value={values.imgurl}
                        onChange={handleChange}></TextField>


                    <Select
                        label="Tipologia di attività"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="tipologia"
                        id="tipologia"
                        value={values.tipologia}
                        onChange={handleChange}>
                        <MenuItem value="Pizzeria">Pizzeria</MenuItem>
                        <MenuItem value="Ristorante">Ristorante</MenuItem>
                        <MenuItem value="Pub">Pub</MenuItem>
                        <MenuItem value="Cocktail Bar">Cocktail Bar</MenuItem>
                    </Select>

                    <TextField
                        label="Numero di telefono"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="text"
                        id="tel"
                        name="tel"
                        placeholder="es. 0775123456"
                        value={values.tel}
                        onChange={handleChange}></TextField>

                    <TextField
                        label="Latitudine"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="text"
                        id="lat"
                        name="lat"
                        placeholder="es. 144.123456"
                        value={values.lat}
                        onChange={handleChange}></TextField>

                    <TextField
                        label="Longitudine"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="text"
                        id="longitudine"
                        name="longitudine"
                        placeholder="ex -122.987654"
                        value={values.longitudine}
                        onChange={handleChange}></TextField>

                    <Button color="primary" variant="contained" fullWidth type="submit">INSERISCI</Button>

                </Form>
            )}
        </Formik>

    </Container>
    }

</Grid>
          </Grid>
      </div>
    );

}

export default App;
