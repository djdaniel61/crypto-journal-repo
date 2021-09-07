import React, { useReducer } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createBybitAPI as CreateBybitAPI } from '../graphql/mutations';
import '../index.css';

const initialState = {
  Name: '',
  ApiKey: '',
  Secret: '',
  apiKeys: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_KEYS':
      return { ...state, apiKeys: action.apiKeys };
    case 'SET_INPUT':
      return { ...state, [action.key]: action.value };
    case 'CLEAR_INPUT':
      return { ...initialState, apiKeys: state.apiKeys };
    default:
      return state;
  }
}

function SetClientAPIKey() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function createKey() {
    const { id, name, apiKey, secret } = state;
    if (id === '' || name === '' || apiKey === '' || secret === '') return;

    const APIkey = {
      id,
      name,
      apiKey,
      secret
    };
    const apiKeys = [...state.apiKeys, APIkey];
    dispatch({ type: 'SET_KEYS', apiKeys });
    dispatch({ type: 'CLEAR_INPUT' });

    try {
      await API.graphql(graphqlOperation(CreateBybitAPI, { input: APIkey }));
      console.log('Client API Key added');
    } catch (err) {
      console.log('error adding...', err);
    }
  }

  function onChange(e) {
    dispatch({ type: 'SET_INPUT', key: e.target.name, value: e.target.value });
  }

  return (
    <div className='newtrade-container'>
      <input
        name='name'
        onChange={onChange}
        value={state.name}
        placeholder='MyBybit Account 1'
      />
      <input
        name='apiKey'
        onChange={onChange}
        value={state.apiKey}
        placeholder='key'
      />
      <input
        name='secret'
        onChange={onChange}
        value={state.secret}
        placeholder='secret'
      />
      <button type='submit' onClick={createKey}>
        Save Key
      </button>
    </div>
  );
}

export default SetClientAPIKey;
