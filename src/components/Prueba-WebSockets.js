import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from "react-bootstrap"

const client = new WebSocket('wss://wssx.gntapi.com:443');

export default function Home(){

    const [prices, setPrices] = useState([]);
    const [ask, setAsk] = useState(0);
    const [bid, setBid] = useState(0);
    const [colorAsk, setColorAsk] = useState('');
    const [colorBid, setColorBid] = useState(''); 

    useEffect(() => {

        client.onopen = function (event) {
            client.send('prices');           
        };

        client.onmessage = function (message) {
            let data = JSON.parse(message.data);          
            setPrices(data.prices);
        };
   
    })


    function getValue(price){
             
        if (prices.hasOwnProperty(price)) {
            
            setAsk(prices[price].ask);
            setBid(prices[price].bid);

            if (prices[price].ask > ask) {
                setColorAsk('green');
            } else if(prices[price].ask < ask){
                setColorAsk('red');
            }

            if (prices[price].bid > bid) {
                setColorBid('green');
            } else if(prices[price].bid < bid){
                setColorBid('red');
            }
            
        }                
    }

    return ( 
    <Container> 
        <Row>
            <Col md={12} className="mt-3">
                <h3>Visualizador de precios GNT</h3>
            </Col>
            <Col md={12} className="mt-5">
                <select className='btn btn-primary' name='divisas' onChange={event => getValue(event.target.value)}>
                    <option style={{ background: "white", color: "black" }} selected disabled>Selecciona una divisa</option>
                    {Object.keys(prices).map((price, value) => 
                        <option style={{ background: "white", color: "black" }} value={price}>{ price }</option>
                    )
                    }
                </select>
            </Col>

            <Col md={6} className="mt-3">
                <p className="m-0"><strong>Ask:</strong></p>
                <label style={{ color: colorAsk }}>{ ask }</label>
            </Col>

            <Col md={6} className="mt-3">
                <p className="m-0"><strong>Bid:</strong></p>
                <label style={{ color: colorBid }}>{ bid }</label>
            </Col>
        </Row>      

    </Container>
    );
    
}