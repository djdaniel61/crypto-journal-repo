import React, { useState, useEffect } from 'react';
import axios from 'axios';
import crypto from 'crypto';
import { listBybitAPIs as ListBybitAPIs } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

// Setting consts for REST Get Request
const baseUrl = 'https://api.bybit.com';
const url = `${baseUrl}/v2/private/trade/closed-pnl/list`;
var apiKey;
var secret;
var timestamp = Date.now();

// Create sign for bybit import
function getSignature(parameters, secret) {
  var orderedParams = '';
  Object.keys(parameters)
    .sort()
    .forEach(function (key) {
      orderedParams += key + '=' + parameters[key] + '&';
    });
  orderedParams = orderedParams.substring(0, orderedParams.length - 1);

  return crypto
    .createHmac('sha256', secret)
    .update(orderedParams)
    .digest('hex');
}

function ImportTrades() {
  const [tradeData, setTradeData] = useState([]);
  const [clientAPIdata, setClientAPIdata] = useState([]);
  const [importStatus, setImportStatus] = useState(false);

  useEffect(() => {
    getClientAPIdata();
  }, [clientAPIdata]);

  async function getClientAPIdata() {
    try {
      const apiData = await API.graphql(graphqlOperation(ListBybitAPIs));
      console.log('apiData:', apiData);
      setClientAPIdata(apiData.data.listBybitAPIs.items);
      console.log('clientAPIdata is:', clientAPIdata);
    } catch (err) {
      console.log('error fetching clientAPIdata...', err);
    }
    return apiKey, secret;
  }

  async function fetchTrades(symbol) {
    await getClientAPIdata();
    var params = {
      api_key: apiKey,
      symbol: symbol,
      timestamp: timestamp
    };
    axios
      .get(`${url}`, {
        params: {
          ...params,
          sign: getSignature(params, secret)
        }
      })
      .then((response) => {
        setTradeData(response.data.result.data);
      })
      .catch((error) => {
        console.error(error);
        setImportStatus(false);
      });
  }

  return (
    <>
      <section className='form'></section>
      <section className='importedTrades'>
        <select name='symbols' id='symbols'>
          <option value='ETHUSD'>ETHUSD</option>
          <option value='XRPUSD'>XRPUSD</option>
          <option value='BTCUSD'>BTCUSD</option>
          <option value='EOSUSD'>EOSUSD</option>
        </select>
        <br />

        <button
          onClick={() => fetchTrades(document.getElementById('symbols').value)}
        >
          Import Trades
        </button>
      </section>
      {importStatus ? <h3>Trades succesfully imported</h3> : null}
    </>
  );
}

export default ImportTrades;
