import React, { useReducer } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createTag as CreateTag } from '../graphql/mutations';
import '../index.css';
import { Form, Button, Col } from 'react-bootstrap';

const initialState = {
  Title: '',
  Description: '',
  tags: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TAGS':
      return { ...state, tags: action.tags };
    case 'SET_INPUT':
      return { ...state, [action.key]: action.value };
    case 'CLEAR_INPUT':
      return { ...initialState, tags: state.tags };
    default:
      return state;
  }
}

function NewTag() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function createTag() {
    const { id, title, description } = state;
    if (id === '' || title === '' || description === '') return;

    const tag = {
      id,
      title,
      description
    };
    const tags = [...state.tags, tag];
    dispatch({ type: 'SET_TAGS', tags });
    dispatch({ type: 'CLEAR_INPUT' });

    try {
      await API.graphql(graphqlOperation(CreateTag, { input: tag }));
      console.log('tag created');
    } catch (err) {
      console.log('error fetching tags...', err);
    }
  }

  function onChange(e) {
    dispatch({ type: 'SET_INPUT', key: e.target.name, value: e.target.value });
  }

  return (
    <div className='newtag-container'>
      <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              className=''
              id='title'
              name='title'
              onChange={onChange}
              value={state.title}
              placeholder='Example: VWAP Touch'
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              className=''
              id='description'
              name='description'
              onChange={onChange}
              value={state.description}
              placeholder='Describe your tag here'
            />
          </Form.Group>
        </Form.Row>

        <Button variant='primary' type='submit' onClick={createTag}>
          Create Tag
        </Button>
      </Form>
    </div>
  );
}

export default NewTag;
