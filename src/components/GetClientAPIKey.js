import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import crypto from 'crypto';
import { listBybitAPIs as ListBybitAPIs } from '../graphql/queries';
import { deleteBybitAPI as DeleteBybitAPI } from '../graphql/mutations';
import { updateBybitAPI as UpdateBybitAPI } from '../graphql/mutations';
import { createBybitAPI as CreateBybitAPI } from '../graphql/mutations';
import { createTrade as CreateTrade } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import MaterialTable from 'material-table';

const baseUrl = 'https://api.bybit.com';
const url = `${baseUrl}/v2/private/trade/closed-pnl/list`;

const columnsApiTable = [
  {
    title: 'Account Name',
    field: 'name'
  },
  {
    title: 'API Key',
    field: 'apiKey'
  },
  {
    title: 'Secret',
    field: 'secret'
  }
];

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

async function deleteAPIByID(apiID, version) {
  try {
    await API.graphql(
      graphqlOperation(DeleteBybitAPI, {
        input: { id: apiID, _version: version }
      })
    );
    console.log(apiID, version);
  } catch (error) {
    console.log(error);
    console.log(apiID, version);
  }
}

async function updateAPIByID(apiID, APIData) {
  var editedAPIData = {
    id: apiID,
    apiKey: APIData.apiKey,
    secret: APIData.secret,
    _version: APIData._version
  };
  try {
    await API.graphql(
      graphqlOperation(UpdateBybitAPI, { input: editedAPIData })
    );

    console.log(editedAPIData);
  } catch (error) {
    console.log(error);
  }
}

function GetClientAPIKey() {
  const [clientAPIdata, setClientAPIdata] = useState([]);
  const [tradeData, setTradeData] = useState([]);
  const [importStatus, setImportStatus] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getClientAPIdata();
  }, [importStatus]);

  async function createTrade(trade) {
    var editedTradeData = {
      id: trade.id,
      user_id: trade.user_id,
      symbol: trade.symbol,
      qty: trade.qty,
      order_type: trade.order_type,
      exec_type: trade.exec_type,
      avg_entry_price: trade.avg_entry_price,
      cum_entry_value: trade.cum_entry_value,
      avg_exit_price: trade.avg_exit_price,
      cum_exit_value: trade.cum_exit_value,
      closed_pnl: trade.closed_pnl,
      side: trade.side,
      created_at: trade.created_at,
      leverage: trade.leverage,
      comments: trade.comments,
      attachment: trade.attachment
    };

    try {
      await API.graphql(
        graphqlOperation(CreateTrade, { input: editedTradeData })
      );
      console.log('Trade imported');
    } catch (err) {
      console.log('error creating trade...', err);
    }
  }

  async function createAPIKey(newName, newAPI, newSecret) {
    const newInput = { name: newName, apiKey: newAPI, secret: newSecret };

    try {
      await API.graphql(graphqlOperation(CreateBybitAPI, { input: newInput }));
      console.log('Client API Key added');
    } catch (err) {
      console.log('error adding...', err);
    }
  }

  const fetchTrades = async (apiKey, symbol, secret) => {
    var params = {
      api_key: apiKey,
      symbol: symbol,
      timestamp: Date.now() - 1000
    };
    console.log('Parameters sent to axios: ' + JSON.stringify(params));
    try {
      const response = await axios.get(`${url}`, {
        params: {
          ...params,
          sign: getSignature(params, secret)
        }
      });
      console.table();
      setTradeData(response.data.result.data);
      response.data.result.data.map((item) => createTrade(item));

      setImportStatus(true);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  async function getClientAPIdata() {
    try {
      const apiData = await API.graphql(graphqlOperation(ListBybitAPIs));
      console.log('apiData:', apiData);
      const updatedAPIData = apiData.data.listBybitAPIs.items.filter(
        (item) => !item._deleted
      );
      setClientAPIdata(updatedAPIData);
      console.log('clientAPIdata is:', clientAPIdata);
    } catch (err) {
      console.log('error fetching clientAPIdata...', err);
    }
  }
  return (
    <section className='clientApiKey'>
      <select name='symbols' id='symbols'>
        <option value='ETHUSD'>ETHUSD</option>
        <option value='XRPUSD'>XRPUSD</option>
        <option value='BTCUSD'>BTCUSD</option>
        <option value='EOSUSD'>EOSUSD</option>
      </select>
      <MaterialTable
        title='Your API Keys'
        columns={columnsApiTable}
        data={clientAPIdata}
        actions={[
          {
            icon: 'download',
            tooltip: 'Import Trades',
            onClick: (event, rowData) => {
              fetchTrades(
                rowData.apiKey,
                document.getElementById('symbols').value,
                rowData.secret
              );
            }
          }
        ]}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setClientAPIdata([...clientAPIdata, newData]);
                createAPIKey(newData.name, newData.apiKey, newData.secret);
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...clientAPIdata];
                const index = oldData.tableData.id;
                console.log(index, dataUpdate);
                dataUpdate[index] = newData;
                updateAPIByID(clientAPIdata[index].id, newData);
                setClientAPIdata([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...clientAPIdata];
                const index = oldData.tableData.id;
                deleteAPIByID(
                  clientAPIdata[index].id,
                  clientAPIdata[index]._version
                );
                dataDelete.splice(index, 1);
                setClientAPIdata([...dataDelete]);

                resolve();
              }, 1000);
            })
        }}
        options={{
          search: false,
          paging: false,
          filtering: true,
          exportButton: false
        }}
      />
      <br />
      <br />

      {importStatus == true ? <h3> Trades succesfully imported</h3> : null}
      {error == true ? <h3>Error Importing Trades</h3> : null}

      {/* <MaterialTable
        title='Imported Trades'
        columns={columnsTradesTable}
        data={tradeData}
        actions={[
          {
            icon: 'book',
            tooltip: 'Journal Trade',
            onClick: (event, rowData) => {
              console.log(tradeData);
            }
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          search: true,
          paging: false,
          filtering: true,
          exportButton: true
        }}
      /> */}
    </section>
  );
}

export default GetClientAPIKey;
