import React, { useReducer } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createTrade as CreateTrade } from '../graphql/mutations';
import '../index.css';
import { Form, Button, Col } from 'react-bootstrap';

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

function NewTrade() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
      <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Symbol</Form.Label>
            <Form.Control
              className=''
              id='symbol'
              name='symbol'
              onChange={onChange}
              value={state.symbol}
              placeholder='XRPUSD'
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Side</Form.Label>
            <Form.Control
              className=''
              id='side'
              name='Side'
              onChange={onChange}
              value={state.side}
              placeholder='Buy'
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              className=''
              id='qty'
              name='qty'
              onChange={onChange}
              value={state.qty}
              placeholder='20'
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Order Type</Form.Label>
            <Form.Control
              className=''
              id='order_type'
              name='order_type'
              onChange={onChange}
              value={state.order_type}
              placeholder='Market'
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Entry Price</Form.Label>
            <Form.Control
              className=''
              id='avg_entry_price'
              name='avg_entry_price'
              onChange={onChange}
              value={state.avg_entry_price}
              placeholder='1700'
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Cumulative Entry Value</Form.Label>
            <Form.Control
              className=''
              id='cum_entry_value'
              name='cum_entry_value'
              onChange={onChange}
              value={state.cum_entry_value}
              placeholder='34000'
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Exit Price</Form.Label>
            <Form.Control
              className=''
              id='avg_exit_price'
              name='avg_exit_price'
              onChange={onChange}
              value={state.avg_exit_price}
              placeholder='1702'
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Cumulative Exit Value</Form.Label>
            <Form.Control
              className=''
              id='cum_exit_value'
              name='cum_exit_value'
              onChange={onChange}
              value={state.cum_exit_value}
              placeholder='34040'
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Closed P/L</Form.Label>
            <Form.Control
              className=''
              id='closed_pnl'
              name='closed_pnl'
              onChange={onChange}
              value={state.closed_pnl}
              placeholder='40'
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Leverage</Form.Label>
            <Form.Control
              className=''
              id='leverage'
              name='leverage'
              onChange={onChange}
              value={state.leverage}
              placeholder='40'
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Created at</Form.Label>
            <Form.Control
              className=''
              id='created_at'
              name='created_at'
              onChange={onChange}
              value={state.created_at}
              placeholder='Date'
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Comments</Form.Label>
            <Form.Control
              className=''
              id='comments'
              name='comments'
              onChange={onChange}
              value={state.comments}
              placeholder='Journal the trade here...'
              style={{ height: '100px' }}
            />
          </Form.Group>
        </Form.Row>
        <Button variant='primary' type='submit' onClick={createTrade}>
          Create Trade
        </Button>
      </Form>
    </div>
  );
}

export default NewTrade;
