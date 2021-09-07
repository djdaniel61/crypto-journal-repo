import React from 'react';
import '../../App.css';
import GetClientAPIKey from '../GetClientAPIKey';
// import ImportTrades from '../ImportTrades';
// import SetClientAPIKey from '../SetClientAPIKey';
// import NewAPIKey from '../NewAPIKey';

function APIImport() {
  return (
    <>
      <br />
      <br />
      <h2>Bybit API Import</h2>
      <h4>Take over your Bybit trades automatically to JournalChampions</h4>
      {/* <h3>Add an API Key</h3>
      <NewAPIKey />
      <SetClientAPIKey /> */}
      <br />
      <br />
      <h3>Import Trades</h3>
      <GetClientAPIKey />
    </>
  );
}

export default APIImport;
