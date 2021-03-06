import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media(min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;

  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  
  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;


function App() {

  //Crear el state
  const [moneda, guardarMoneda] = useState("");
  const [criptomoneda, guardarCriptomoneda] = useState("");
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);


  //Se ejecutara una vez se de submit en el formulario
  useEffect(()=>{
    console.log("Entre al useffect");
    //Evitamos la ejecucion la primera vez
    if(moneda === "") return;

      const cotizarCriptomoneda = async() =>{
        
        //Consultar la API
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        
        const resultado = await axios.get(url);
        
        //Mostrar el spinner
        guardarCargando(true);
        setTimeout(() => {
          guardarCargando(false);
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        }, 3000);

      }

    cotizarCriptomoneda();
  }, [moneda, criptomoneda])

  return (
   <Contenedor>
      <div>
        <Imagen src={imagen}
        alt = "Imagen criptomonedas"
        />
      </div>
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Formulario 
          guardarMoneda = {guardarMoneda}
          guardarCriptomoneda = {guardarCriptomoneda}
        />
        {cargando? <Spinner/> : null}
        <Cotizacion 
          resultado = {resultado}
        />
      </div>
   </Contenedor>
  );
}

export default App;
