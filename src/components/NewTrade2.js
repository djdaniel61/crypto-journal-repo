import React, { useReducer, useForm } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createTrade as CreateTrade } from '../graphql/mutations';
import '../index.css';
import { Form, Button, Col } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const initialState = {
  Id: '',
  User_id: '',
  Symbol: '',
  Qty: '',
  Order_type: '',
  Exec_type: '',
  Avg_entry_price: '',
  Cum_entry_value: '',
  Avg_exit_price: '',
  Cum_exit_value: '',
  Closed_pnl: '',
  Side: '',
  Created_at: '',
  Leverage: '',
  Comments: '',
  Attachment: '',
  trades: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TRADES':
      return { ...state, trades: action.trades };
    case 'SET_INPUT':
      return { ...state, [action.key]: action.value };
    case 'CLEAR_INPUT':
      return { ...initialState, trades: state.trades };
    default:
      return state;
  }
}
const preloadedRowData = {
  id: 1,
  symbol: 1,
  qty: 1,
  order_type: 1,
  exec_type: 1,
  avg_entry_price: 1,
  cum_entry_value: 1,
  avg_exit_price: 1,
  cum_exit_value: 1,
  closed_pnl: 1,
  side: 1,
  created_at: 1,
  leverage: 1
};
function NewTrade2() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { updateTrade } = useForm({
    defaultValues: preloadedRowData
  });

  async function createTrade() {
    const {
      id,
      user_id,
      symbol,
      qty,
      order_type,
      exec_type,
      avg_entry_price,
      cum_entry_value,
      avg_exit_price,
      cum_exit_value,
      closed_pnl,
      side,
      created_at,
      leverage,
      comments,
      attachment
    } = state;
    if (
      id === '' ||
      user_id === '' ||
      symbol === '' ||
      qty === '' ||
      order_type === '' ||
      exec_type === '' ||
      avg_entry_price === '' ||
      cum_entry_value === '' ||
      avg_exit_price === '' ||
      cum_exit_value === '' ||
      closed_pnl === '' ||
      side === '' ||
      created_at === '' ||
      leverage === '' ||
      comments === '' ||
      attachment === ''
    )
      return;

    const trade = {
      id,
      user_id,
      symbol,
      qty,
      order_type,
      exec_type,
      avg_entry_price,
      cum_entry_value,
      avg_exit_price,
      cum_exit_value,
      closed_pnl,
      side,
      created_at,
      leverage,
      comments,
      attachment
    };
    const trades = [...state.trades, trade];
    dispatch({ type: 'SET_TRADES', trades });
    dispatch({ type: 'CLEAR_INPUT' });

    try {
      await API.graphql(graphqlOperation(CreateTrade, { input: trade }));
      console.log('trade created');
    } catch (err) {
      console.log('error fetching trades...', err);
    }
  }

  function onChange(e) {
    dispatch({ type: 'SET_INPUT', key: e.target.name, value: e.target.value });
  }

  return (
    <div className='newtrade-container'>
      <form>
        <input
          ref={updateTrade}
          className=''
          id='symbol'
          name='symbol'
          onChange={onChange}
          value={state.symbol}
          placeholder='XRPUSD'
        />
        <input
          ref={updateTrade}
          className=''
          id='side'
          name='side'
          onChange={onChange}
          value={state.side}
          placeholder='Buy'
        />

        <input
          ref={updateTrade}
          className=''
          id='qty'
          name='qty'
          onChange={onChange}
          value={state.qty}
          placeholder='20'
        />

        <input
          ref={updateTrade}
          className=''
          id='order_type'
          name='order_type'
          onChange={onChange}
          value={state.order_type}
          placeholder='Market'
        />

        <input
          ref={updateTrade}
          className=''
          id='avg_entry_price'
          name='avg_entry_price'
          onChange={onChange}
          value={state.avg_entry_price}
          placeholder='1700'
        />

        <input
          ref={updateTrade}
          className=''
          id='cum_entry_value'
          name='cum_entry_value'
          onChange={onChange}
          value={state.cum_entry_value}
          placeholder='34000'
        />

        <input
          ref={updateTrade}
          className=''
          id='avg_exit_price'
          name='avg_exit_price'
          onChange={onChange}
          value={state.avg_exit_price}
          placeholder='1702'
        />

        <input
          ref={updateTrade}
          className=''
          id='cum_exit_value'
          name='cum_exit_value'
          onChange={onChange}
          value={state.cum_exit_value}
          placeholder='34040'
        />

        <input
          ref={updateTrade}
          className=''
          id='closed_pnl'
          name='closed_pnl'
          onChange={onChange}
          value={state.closed_pnl}
          placeholder='40'
        />

        <input
          ref={updateTrade}
          className=''
          id='leverage'
          name='leverage'
          onChange={onChange}
          value={state.leverage}
          placeholder='40'
        />

        <input
          ref={updateTrade}
          className=''
          id='created_at'
          name='created_at'
          onChange={onChange}
          value={state.created_at}
          placeholder='Date'
        />

        <input
          ref={updateTrade}
          className=''
          id='comments'
          name='comments'
          onChange={onChange}
          value={state.comments}
          placeholder='Journal the trade here...'
          style={{ height: '100px' }}
        />

        <button variant='primary' type='submit' onClick={createTrade}>
          Create Trade
        </button>
      </form>
    </div>
  );
}

export default NewTrade2;
