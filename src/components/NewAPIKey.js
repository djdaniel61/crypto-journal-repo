import React, { useReducer, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createBybitAPI as CreateBybitAPI } from '../graphql/mutations';
import '../index.css';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: '25ch'
  },
  textField2: {
    width: '50ch'
  }
}));

export default function InputAdornments() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
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
    console.log(id, name, apiKey, secret);
    try {
      await API.graphql(graphqlOperation(CreateBybitAPI, { input: APIkey }));
      console.log('Client API Key added');
    } catch (err) {
      console.log('error adding...', err);
    }
  }
  function onChange(e) {
    dispatch({
      type: 'SET_INPUT',
      key: e.target.name,
      value: e.target.value
    });
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <form onSubmit={createKey}>
        <FormControl
          className={clsx(classes.margin, classes.textField2)}
          variant='outlined'
        >
          <InputLabel htmlFor='name'>Account Name</InputLabel>
          <OutlinedInput
            id='name'
            variant='outlined'
            value={state.name}
            onChange={onChange}
            labelWidth={110}
          />
        </FormControl>

        <FormControl
          className={clsx(classes.margin, classes.textField2)}
          variant='outlined'
        >
          <InputLabel htmlFor='api_key'>API Key</InputLabel>
          <OutlinedInput
            id='api_key'
            variant='outlined'
            value={state.apiKey}
            onChange={onChange}
            labelWidth={60}
          />
        </FormControl>
        <FormControl
          className={clsx(classes.margin, classes.textField2)}
          variant='outlined'
        >
          <InputLabel htmlFor='secret'>API Secret</InputLabel>
          <OutlinedInput
            id='secret'
            type={showPassword ? 'text' : 'password'}
            value={state.secret}
            onChange={onChange}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={80}
          />
        </FormControl>
        <button type='submit'>Save Key</button>
      </form>
    </div>
  );
}
