import React from 'react';
import '../../App.css';
import GetClientAPIKey from '../GetClientAPIKey';

function APIImport() {
  return (
    <>
      <br />
      <br />
      <h2>Bybit API Import</h2>
      <h4>Take over your Bybit trades automatically to JournalChampions</h4>
      <br />
      <br />
      <h3>Import Trades</h3>
      <GetClientAPIKey />
    </>
  );
}

export default APIImport;
