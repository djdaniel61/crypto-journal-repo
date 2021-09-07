import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listTrades as ListTrades } from '../graphql/queries';
import { listTags as ListTags } from '../graphql/queries';
import { getTag as GetTag } from '../graphql/queries';
import { getTrade as GetTrade } from '../graphql/queries';

import '../App.css';
import axios from 'axios';
import MaterialTable from 'material-table';

function DashboardContent() {
  const [trades, setTrades] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagTrades, setTagTrades] = useState([]);
  const [price, setPrice] = useState([]);
  const [error, setError] = useState(false);
  const [ethPrice, setEthPrice] = useState(0);
  const [xrpPrice, setXrpPrice] = useState(0);
  const [btcPrice, setBtcPrice] = useState(0);
  const [eosPrice, setEosPrice] = useState(0);

  let indexedpriceData = {};

  useEffect(() => {
    getTrades();
    getTags();
    fetchPrices();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchPrices();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  async function getTrades() {
    try {
      const tradeData = await API.graphql(graphqlOperation(ListTrades));
      console.log('tradeData:', tradeData);
      const updatedTradeData = tradeData.data.listTrades.items.filter(
        (item) => !item._deleted
      );
      setTrades(updatedTradeData);
      console.log('trades are:', trades);
    } catch (err) {
      console.log('error fetching trades...', err);
    }
  }

  async function getTags() {
    try {
      const tagData = await API.graphql(graphqlOperation(ListTags));
      console.log('tagData:', tagData);
      const updatedTagData = tagData.data.listTags.items.filter(
        (item) => !item._deleted
      );
      setTags(updatedTagData);
      console.log('tags are:', tags);
      tags.map((tag) => {
        getTagTrades(tag.id);
      });
    } catch (err) {
      console.log('error fetching tags...', err);
    }
  }

  async function getTagTrades(tag) {
    try {
      const getTagData = await API.graphql(
        graphqlOperation(GetTag, { id: tag })
      );

      var tags = getTagData.data.getTag.TagTrades.items.filter(
        (item) => !item._deleted
      );
      tags.map((tag) => {
        getTrade(tag.tradeID);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getTrade(trade) {
    try {
      const getTradeData = await API.graphql(
        graphqlOperation(GetTrade, { id: trade })
      );
      console.log(getTradeData);
    } catch (error) {
      console.log(error);
    }
  }

  // ################# stats overall calculations #######################
  const numberTrades = trades.length;

  const all_eth_trades = trades.filter((trade) => trade.symbol === 'ETHUSD');
  const all_xrp_trades = trades.filter((trade) => trade.symbol === 'XRPUSD');
  const all_btc_trades = trades.filter((trade) => trade.symbol === 'BTCUSD');
  const all_eos_trades = trades.filter((trade) => trade.symbol === 'EOSUSD');

  const total_ethusd_pnl = all_eth_trades.reduce(
    (sum, li) => sum + li.closed_pnl,
    0
  );
  const total_xrpusd_pnl = all_xrp_trades.reduce(
    (sum, li) => sum + li.closed_pnl,
    0
  );
  const total_btcusd_pnl = all_btc_trades.reduce(
    (sum, li) => sum + li.closed_pnl,
    0
  );
  const total_eosusd_pnl = all_eos_trades.reduce(
    (sum, li) => sum + li.closed_pnl,
    0
  );

  const total_btcusd_pnl_$ = total_btcusd_pnl * btcPrice;
  const total_ethusd_pnl_$ = total_ethusd_pnl * ethPrice;
  const total_xrpusd_pnl_$ = total_xrpusd_pnl * xrpPrice;
  const total_eosusd_pnl_$ = total_eosusd_pnl * eosPrice;

  const total_pnl_$ =
    total_btcusd_pnl_$ +
    total_ethusd_pnl_$ +
    total_eosusd_pnl_$ +
    total_xrpusd_pnl_$;

  const average_ethusd_pnl = total_ethusd_pnl / all_eth_trades.length;
  const average_xrpusd_pnl = total_xrpusd_pnl / all_xrp_trades.length;
  const average_btcusd_pnl = total_btcusd_pnl / all_btc_trades.length;
  const average_eosusd_pnl = total_eosusd_pnl / all_eos_trades.length;

  const allWinners = trades.filter((trade) => trade.closed_pnl > 0);

  const all_btc_winners = allWinners.filter(
    (trade) => trade.symbol === 'BTCUSD'
  );

  const total_btcusd_winners_pnl_$ =
    all_btc_winners.reduce((sum, li) => sum + li.closed_pnl, 0) * btcPrice;

  const all_eth_winners = allWinners.filter(
    (trade) => trade.symbol === 'ETHUSD'
  );

  const total_ethusd_winners_pnl_$ =
    all_eth_winners.reduce((sum, li) => sum + li.closed_pnl, 0) * ethPrice;

  const all_xrp_winners = allWinners.filter(
    (trade) => trade.symbol === 'XRPUSD'
  );
  const total_xrpusd_winners_pnl_$ =
    all_xrp_winners.reduce((sum, li) => sum + li.closed_pnl, 0) * xrpPrice;

  const all_eos_winners = allWinners.filter(
    (trade) => trade.symbol === 'EOSUSD'
  );
  const total_eosusd_winners_pnl_$ =
    all_eos_winners.reduce((sum, li) => sum + li.closed_pnl, 0) * eosPrice;

  const numberWinners = allWinners.length;
  const averageWinner =
    (total_btcusd_winners_pnl_$ +
      total_ethusd_winners_pnl_$ +
      total_xrpusd_winners_pnl_$ +
      total_eosusd_winners_pnl_$) /
    numberWinners;

  const allLosers = trades.filter((trade) => trade.closed_pnl < 0);

  const all_btc_losers = allLosers.filter((trade) => trade.symbol === 'BTCUSD');
  const total_btcusd_losers_pnl_$ =
    all_btc_losers.reduce((sum, li) => sum + li.closed_pnl, 0) * btcPrice;

  const all_eth_losers = allLosers.filter((trade) => trade.symbol === 'ETHUSD');
  const total_ethusd_losers_pnl_$ =
    all_eth_losers.reduce((sum, li) => sum + li.closed_pnl, 0) * ethPrice;

  const all_xrp_losers = allLosers.filter((trade) => trade.symbol === 'XRPUSD');
  const total_xrpusd_losers_pnl_$ =
    all_xrp_losers.reduce((sum, li) => sum + li.closed_pnl, 0) * xrpPrice;

  const all_eos_losers = allLosers.filter((trade) => trade.symbol === 'EOSUSD');
  const total_eosusd_losers_pnl_$ =
    all_eos_losers.reduce((sum, li) => sum + li.closed_pnl, 0) * eosPrice;

  const numberLosers = allLosers.length;
  const averageLoser =
    (total_btcusd_losers_pnl_$ +
      total_ethusd_losers_pnl_$ +
      total_xrpusd_losers_pnl_$ +
      total_eosusd_losers_pnl_$) /
    numberLosers;

  // // ################### stats today calculations #########################
  function resolveDate(date) {
    var dateFormated = new Date(date * 1000).toLocaleDateString('en-GB');
    return dateFormated;
  }

  const tradesToday = trades.filter(
    (trade) => resolveDate(trade.created_at) == resolveDate(Date.now() / 1000)
  );

  const numberTradesToday = tradesToday.length;

  const all_eth_tradesToday = tradesToday.filter(
    (trade) => trade.symbol === 'ETHUSD'
  );
  const all_xrp_tradesToday = tradesToday.filter(
    (trade) => trade.symbol === 'XRPUSD'
  );
  const all_btc_tradesToday = tradesToday.filter(
    (trade) => trade.symbol === 'BTCUSD'
  );
  const all_eos_tradesToday = tradesToday.filter(
    (trade) => trade.symbol === 'EOSUSD'
  );

  const total_ethusd_pnlToday = all_eth_tradesToday.reduce(
    (sum, li) => sum + li.closed_pnl,
    0
  );
  const total_xrpusd_pnlToday = all_xrp_tradesToday.reduce(
    (sum, li) => sum + li.closed_pnl,
    0
  );
  const total_btcusd_pnlToday = all_btc_tradesToday.reduce(
    (sum, li) => sum + li.closed_pnl,
    0
  );
  const total_eosusd_pnlToday = all_eos_tradesToday.reduce(
    (sum, li) => sum + li.closed_pnl,
    0
  );

  const total_btcusd_pnl_$Today = total_btcusd_pnlToday * btcPrice;
  const total_ethusd_pnl_$Today = total_ethusd_pnlToday * ethPrice;
  const total_xrpusd_pnl_$Today = total_xrpusd_pnlToday * xrpPrice;
  const total_eosusd_pnl_$Today = total_eosusd_pnlToday * eosPrice;

  const total_pnl_$Today =
    total_btcusd_pnl_$Today +
    total_ethusd_pnl_$Today +
    total_eosusd_pnl_$Today +
    total_xrpusd_pnl_$Today;

  const average_ethusd_pnlToday =
    total_ethusd_pnlToday / all_eth_tradesToday.length;
  const average_xrpusd_pnlToday =
    total_xrpusd_pnlToday / all_xrp_tradesToday.length;
  const average_btcusd_pnlToday =
    total_btcusd_pnlToday / all_btc_tradesToday.length;
  const average_eosusd_pnlToday =
    total_eosusd_pnlToday / all_eos_tradesToday.length;

  const allWinnersToday = tradesToday.filter((trade) => trade.closed_pnl > 0);

  const all_btc_winnersToday = allWinnersToday.filter(
    (trade) => trade.symbol === 'BTCUSD'
  );

  const total_btcusd_winners_pnl_$Today =
    all_btc_winnersToday.reduce((sum, li) => sum + li.closed_pnl, 0) * btcPrice;

  const all_eth_winnersToday = allWinnersToday.filter(
    (trade) => trade.symbol === 'ETHUSD'
  );

  const total_ethusd_winners_pnl_$Today =
    all_eth_winnersToday.reduce((sum, li) => sum + li.closed_pnl, 0) * ethPrice;

  const all_xrp_winnersToday = allWinnersToday.filter(
    (trade) => trade.symbol === 'XRPUSD'
  );
  const total_xrpusd_winners_pnl_$Today =
    all_xrp_winnersToday.reduce((sum, li) => sum + li.closed_pnl, 0) * xrpPrice;

  const all_eos_winnersToday = allWinnersToday.filter(
    (trade) => trade.symbol === 'EOSUSD'
  );
  const total_eosusd_winners_pnl_$Today =
    all_eos_winnersToday.reduce((sum, li) => sum + li.closed_pnl, 0) * eosPrice;

  const numberWinnersToday = allWinnersToday.length;
  const averageWinnerToday =
    (total_btcusd_winners_pnl_$Today +
      total_ethusd_winners_pnl_$Today +
      total_xrpusd_winners_pnl_$Today +
      total_eosusd_winners_pnl_$Today) /
    numberWinnersToday;

  const allLosersToday = tradesToday.filter((trade) => trade.closed_pnl < 0);

  const all_btc_losersToday = allLosersToday.filter(
    (trade) => trade.symbol === 'BTCUSD'
  );
  const total_btcusd_losers_pnl_$Today =
    all_btc_losersToday.reduce((sum, li) => sum + li.closed_pnl, 0) * btcPrice;

  const all_eth_losersToday = allLosersToday.filter(
    (trade) => trade.symbol === 'ETHUSD'
  );
  const total_ethusd_losers_pnl_$Today =
    all_eth_losersToday.reduce((sum, li) => sum + li.closed_pnl, 0) * ethPrice;

  const all_xrp_losersToday = allLosers.filter(
    (trade) => trade.symbol === 'XRPUSD'
  );
  const total_xrpusd_losers_pnl_$Today =
    all_xrp_losersToday.reduce((sum, li) => sum + li.closed_pnl, 0) * xrpPrice;

  const all_eos_losersToday = allLosersToday.filter(
    (trade) => trade.symbol === 'EOSUSD'
  );
  const total_eosusd_losers_pnl_$Today =
    all_eos_losersToday.reduce((sum, li) => sum + li.closed_pnl, 0) * eosPrice;

  const numberLosersToday = allLosersToday.length;
  const averageLoserToday =
    (total_btcusd_losers_pnl_$Today +
      total_ethusd_losers_pnl_$Today +
      total_xrpusd_losers_pnl_$Today +
      total_eosusd_losers_pnl_$Today) /
    numberLosersToday;

  async function fetchPrices() {
    try {
      const response = await axios.get(
        'https://api.bybit.com/v2/public/tickers'
      );
      let priceData = response.data.result;

      priceData.map((item) => {
        if (item.symbol == 'ETHUSD') {
          setEthPrice(item.last_price);
        } else if (item.symbol == 'XRPUSD') {
          setXrpPrice(item.last_price);
        } else if (item.symbol == 'BTCUSD') {
          setBtcPrice(item.last_price);
        } else if (item.symbol == 'EOSUSD') {
          setEosPrice(item.last_price);
        }
      });
      setPrice(indexedpriceData);
      console.log(ethPrice);
      console.log(xrpPrice);
      console.log(btcPrice);
      console.log(eosPrice);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }
  return (
    <div className='hero-container'>
      <div className='dashboard-component'>
        <div className='stats-container'>
          <h3>Statistics Overall</h3>
          <table>
            <thead>
              <th>Coin:</th>
              <th>Bitcoin</th>
              <th>Ethereum</th>
              <th>Ripple</th>
              <th>EOS</th>
            </thead>
            <tbody>
              <tr>
                <td>Total Profit/Loss</td>
                <td>
                  {total_btcusd_pnl.toFixed(5)} ($
                  {total_btcusd_pnl_$.toFixed(1)})
                </td>
                <td>
                  {total_ethusd_pnl.toFixed(4)} ($
                  {total_ethusd_pnl_$.toFixed(1)})
                </td>
                <td>
                  {total_xrpusd_pnl.toFixed(2)} ($
                  {total_xrpusd_pnl_$.toFixed(1)})
                </td>
                <td>
                  {total_eosusd_pnl.toFixed(2)} ($
                  {total_eosusd_pnl_$.toFixed(1)})
                </td>
              </tr>
              <tr>
                <td>Average Profit/Loss</td>
                <td>
                  {average_btcusd_pnl} ($
                  {(average_btcusd_pnl * btcPrice).toFixed(1)})
                </td>
                <td>
                  {average_ethusd_pnl.toFixed(4)} ($
                  {(average_ethusd_pnl * ethPrice).toFixed(1)})
                </td>
                <td>
                  {average_xrpusd_pnl.toFixed(2)} ($
                  {(average_xrpusd_pnl * xrpPrice).toFixed(1)})
                </td>
                <td>
                  {average_eosusd_pnl.toFixed(2)} ($
                  {(average_eosusd_pnl * eosPrice).toFixed(1)})
                </td>
              </tr>
              <tr>
                <td>Number of Trades</td>
                <td>{all_btc_trades.length}</td>
                <td>{all_eth_trades.length}</td>
                <td>{all_xrp_trades.length}</td>
                <td>{all_eos_trades.length}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td>Total Profit/Loss:</td>
                <td>${total_pnl_$.toFixed(1)}</td>
              </tr>
              <tr>
                <td>Average Profit/Loss per Trade:</td>
                <td>${(total_pnl_$ / trades.length).toFixed(1)}</td>
              </tr>

              <tr>
                <td>Average Winning Trade:</td>
                <td>${averageWinner.toFixed(1)}</td>
              </tr>
              <tr>
                <td>Average Losing Trade:</td>
                <td>${averageLoser.toFixed(1)}</td>
              </tr>
              <tr>
                <td>Total Number of Trades</td>
                <td>{numberTrades}</td>
              </tr>
              <tr>
                <td>Number of Winning Trades:</td>
                <td>{numberWinners}</td>
              </tr>
              <tr>
                <td>Number of Losing Trades:</td>
                <td>{numberLosers}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div className='stats-container'>
          <h3>Statistics Today</h3>
          <table>
            <thead>
              <th>Coin:</th>
              <th>Bitcoin</th>
              <th>Ethereum</th>
              <th>Ripple</th>
              <th>EOS</th>
            </thead>
            <tbody>
              <tr>
                <td>Total Profit/Loss</td>
                <td>
                  {total_btcusd_pnlToday.toFixed(5)} ($
                  {total_btcusd_pnl_$Today.toFixed(1)})
                </td>
                <td>
                  {total_ethusd_pnlToday.toFixed(4)} ($
                  {total_ethusd_pnl_$Today.toFixed(1)})
                </td>
                <td>
                  {total_xrpusd_pnlToday.toFixed(2)} ($
                  {total_xrpusd_pnl_$Today.toFixed(1)})
                </td>
                <td>
                  {total_eosusd_pnlToday.toFixed(2)} ($
                  {total_eosusd_pnl_$Today.toFixed(1)})
                </td>
              </tr>
              <tr>
                <td>Average Profit/Loss</td>
                <td>
                  {average_btcusd_pnlToday} ($
                  {(average_btcusd_pnlToday * btcPrice).toFixed(1)})
                </td>
                <td>
                  {average_ethusd_pnlToday.toFixed(4)} ($
                  {(average_ethusd_pnlToday * ethPrice).toFixed(1)})
                </td>
                <td>
                  {average_xrpusd_pnlToday.toFixed(2)} ($
                  {(average_xrpusd_pnlToday * xrpPrice).toFixed(1)})
                </td>
                <td>
                  {average_eosusd_pnlToday.toFixed(2)} ($
                  {(average_eosusd_pnlToday * eosPrice).toFixed(1)})
                </td>
              </tr>
              <tr>
                <td>Number of Trades</td>
                <td>{all_btc_tradesToday.length}</td>
                <td>{all_eth_tradesToday.length}</td>
                <td>{all_xrp_tradesToday.length}</td>
                <td>{all_eos_tradesToday.length}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td>Total Profit/Loss:</td>
                <td>${total_pnl_$Today.toFixed(1)}</td>
              </tr>
              <tr>
                <td>Average Profit/Loss per Trade:</td>
                <td>${(total_pnl_$Today / tradesToday.length).toFixed(1)}</td>
              </tr>

              <tr>
                <td>Average Winning Trade:</td>
                <td>${averageWinnerToday.toFixed(1)}</td>
              </tr>
              <tr>
                <td>Average Losing Trade:</td>
                <td>${averageLoserToday.toFixed(1)}</td>
              </tr>
              <tr>
                <td>Total Number of Trades</td>
                <td>{tradesToday.length}</td>
              </tr>
              <tr>
                <td>Number of Winning Trades:</td>
                <td>{numberWinnersToday}</td>
              </tr>
              <tr>
                <td>Number of Losing Trades:</td>
                <td>{numberLosersToday}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='dashboard-component'>
        <h3>Tag Report</h3>
        {/* <MaterialTable
          title='All Trades'
          columns={columns}
          data={trades}
          actions={[
            {
              icon: 'book',
              tooltip: 'Journal Trade',
              onClick: (event, rowData) => {
                setShowForm(!showForm);
                setCurrentRow(rowData);
              }
            }
          ]}
          editable={{
            // onRowAdd: (newData) =>
            //   new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //       setTrades([...trades, newData]);

            //       // console.log(newData);
            //       // createTrade(newData);
            //       resolve();
            //     }, 1000);
            //   }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...trades];
                  const index = oldData.tableData.id;
                  console.log(index, dataUpdate);
                  dataUpdate[index] = newData;
                  updateTradeByID(trades[index].id, newData);
                  setTrades([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...trades];
                  const index = oldData.tableData.id;
                  deleteTradeByID(trades[index].id, trades[index]._version);
                  dataDelete.splice(index, 1);
                  setTrades([...dataDelete]);

                  resolve();
                }, 1000);
              })
          }}
          options={{
            search: true,
            paging: false,
            filtering: true,
            exportButton: true
          }}
        /> */}
      </div>
    </div>
  );
}

export default DashboardContent;
