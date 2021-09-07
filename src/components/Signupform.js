import React from 'react';
import '../App.css';

function Signupform() {
  return (
    <div>
      <form action=''>
        <label htmlFor='username'>Username: </label>
        <input type='text' />
        <label htmlFor='email'>Email: </label>
        <input type='email' />
        <label htmlFor='password'>Password: </label>
        <input type='password' />
      </form>
    </div>
  );
}

export default Signupform;
