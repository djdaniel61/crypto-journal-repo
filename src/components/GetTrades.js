import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { API, graphqlOperation } from 'aws-amplify';
import MaterialTable from 'material-table';
import '../App.css';

import { listTrades as ListTrades } from '../graphql/queries';
import { createTrade, deleteTrade as DeleteTrade } from '../graphql/mutations';
import { updateTrade as UpdateTrade } from '../graphql/mutations';
import { createTrade as CreateTrade } from '../graphql/mutations';
import { getTrade as GetTrade } from '../graphql/queries';

import { listTags as ListTags } from '../graphql/queries';

import { createTagTrade as CreateTagTrade } from '../graphql/mutations';
import { deleteTagTrade as DeleteTagTrade } from '../graphql/mutations';

// Columns for table of all trades
const columns = [
  {
    title: 'Symbol',
    field: 'symbol'
  },
  {
    title: 'Quantity',
    field: 'qty',
    type: 'numeric'
  },
  {
    title: 'Side',
    field: 'side'
  },
  {
    title: 'Entry Price',
    field: 'avg_entry_price',
    type: 'numeric',
    render: (rowData) => resolvePrice(2, rowData.avg_entry_price)
  },
  {
    title: 'Exit Price',
    field: 'avg_exit_price',
    type: 'numeric',
    render: (rowData) => resolvePrice(2, rowData.avg_exit_price)
  },
  {
    title: 'Closed Pnl',
    field: 'closed_pnl',
    type: 'numeric',
    render: (rowData) => resolvePrice(2, rowData.closed_pnl)
  },
  {
    title: 'Leverage',
    field: 'leverage',
    type: 'numeric'
  },
  {
    title: 'Trade Closed On',
    field: 'created_at',
    type: 'datetime',
    render: (rowData) => resolveDate(rowData.created_at)
  }
];
//Columns for table of tags that can be added and removed from a trade
const columnsTags = [
  {
    title: 'Title',
    field: 'title'
  },
  {
    title: 'Description',
    field: 'description'
  }
];

//takes a unix timestamp and returns a string of the date + time
function resolveDate(date) {
  var convertedDate = parseFloat(date);
  var dateFormated = new Date(convertedDate).toLocaleDateString('en-GB');
  var timeFormated = new Date(convertedDate).toLocaleTimeString('en-GB');
  return `${dateFormated} ${timeFormated}`;
}

//takes a float and returns float with a "decimal" number of significant numbers
function resolvePrice(decimals, price) {
  if (price) {
    var newPrice = price.toFixed(decimals);
  }

  return newPrice;
}

const GetTrades = () => {
  //custom hook for prefilling the form when selecting "Journal Trade" from the Trades table
  const { register, handleSubmit, reset } = useForm();
  //state for storing all trades
  const [trades, setTrades] = useState([]);
  //state for all tags
  const [tags, setTags] = useState([]);
  //state for tags that have been added to a trade
  const [selectedTags, setSelectedTags] = useState([]);
  //state for selected row when any action is performed on the trade table
  const [currentRow, setCurrentRow] = useState([]);
  //toggles view for table of all trades/form
  const [showForm, setShowForm] = useState(false);
  //toggles visibility of tags tables
  const [showTagsContainer, setShowTagsContainer] = useState(false);

  //columns for tags table
  const tagsTags = [
    {
      title: 'Tag',
      field: 'tagID',
      render: (rowData) => resolveTagID(rowData.tagID)
    },
    {
      title: 'Description',
      field: 'tagID',
      render: (rowData) => resolveTagDescription(rowData.tagID)
    }
  ];

  useEffect(() => {
    getData();
    getTags();
  }, []);

  //updates selectedTags state when a new trade is being edited
  useEffect(() => {
    reset(currentRow);
    getTradeTags(currentRow.id);
  }, [currentRow]);

  //takes tag ID, returns tag's decription
  function resolveTagDescription(id) {
    var resolvedTag;
    tags.map((tag) => {
      if (id == tag.id) {
        resolvedTag = tag.description;
      }
    });
    return resolvedTag;
  }
  //takes tag ID, returns tag's title
  function resolveTagID(id) {
    var resolvedTag;
    tags.map((tag) => {
      if (id == tag.id) {
        resolvedTag = tag.title;
      }
    });
    return resolvedTag;
  }
  //posts updated trade data
  function createJournal() {
    console.log(currentRow);

    var newData = {
      id: currentRow.id,
      user_id: currentRow.user_id,
      symbol: currentRow.symbol,
      qty: currentRow.qty,
      order_type: currentRow.order_type,
      exec_type: currentRow.exec_type,
      avg_entry_price: currentRow.avg_entry_price,
      cum_entry_value: currentRow.cum_entry_value,
      avg_exit_price: currentRow.avg_exit_price,
      cum_exit_value: currentRow.cum_exit_value,
      closed_pnl: currentRow.closed_pnl,
      side: currentRow.side,
      created_at: currentRow.created_at,
      leverage: currentRow.leverage,
      comments: document.getElementById('comments').value,
      attachment: document.getElementById('attachment').value,
      _version: currentRow._version
    };
    updateTradeByID(currentRow.id, newData);

    setShowForm(!showForm);
  }
  //takes a trade ID and version to be deleted
  async function deleteTradeByID(tradeID, version) {
    try {
      await API.graphql(
        graphqlOperation(DeleteTrade, {
          input: { id: tradeID, _version: version }
        })
      );
      console.log(tradeID, version);
    } catch (error) {
      console.log(error);
      console.log(tradeID, version);
    }
  }
  //used in createJournal() to send data to db
  async function updateTradeByID(tradeID, tradeData) {
    var editedTradeData = {
      id: tradeID,
      user_id: tradeData.user_id,
      symbol: tradeData.symbol,
      qty: tradeData.qty,
      order_type: tradeData.order_type,
      exec_type: tradeData.exec_type,
      avg_entry_price: tradeData.avg_entry_price,
      cum_entry_value: tradeData.cum_entry_value,
      avg_exit_price: tradeData.avg_exit_price,
      cum_exit_value: tradeData.cum_exit_value,
      closed_pnl: tradeData.closed_pnl,
      side: tradeData.side,
      created_at: Date.parse(`${tradeData.created_at}`),
      leverage: tradeData.leverage,
      comments: tradeData.comments,
      attachment: tradeData.attachment,
      _version: tradeData._version
    };
    try {
      await API.graphql(
        graphqlOperation(UpdateTrade, { input: editedTradeData })
      );

      console.log(editedTradeData);
      console.log('Trade Successfully Updated');
    } catch (error) {
      console.log(error);
    }
  }
  //   async function createTrade(newData) {
  // const trade = {
  //   avg_entry_price: newData.avg_entry_price,
  //   avg_exit_price: newData.avg_exit_price,
  //   closed_pnl: newData.closed_pnl,
  //   created_at: newData.created_at,
  //   leverage: newData.leverage,
  //   side: newData.side,
  //   symbol: newData.symbol,
  //   qty: newData.qty,
  //   };
  //   }

  //on load fetches all tags
  async function getTags() {
    try {
      const tagData = await API.graphql(graphqlOperation(ListTags));
      console.log('tagData:', tagData);
      const updatedTagData = tagData.data.listTags.items.filter(
        (item) => !item._deleted
      );
      setTags(updatedTagData);
      console.log('tags are:', tags);
    } catch (err) {
      console.log('error fetching tags...', err);
    }
  }
  //on load fetches all trades
  async function getData() {
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
  //takes trade id and tag id, creates a TagTrade item
  async function addTag(tag, trade) {
    var inputData = { tagID: tag, tradeID: trade };
    console.log(inputData);
    try {
      const addedTag = await API.graphql(
        graphqlOperation(CreateTagTrade, {
          input: inputData
        })
      );
      console.log(addedTag);
    } catch (error) {
      console.log(error);
    }
  }
  //takes a tagTrade id and version to be deleted
  async function removeTag(tagID, version) {
    var inputData = { id: tagID, _version: version };
    try {
      const removedTag = await API.graphql(
        graphqlOperation(DeleteTagTrade, {
          input: inputData
        })
      );
      console.log(removedTag);
    } catch (error) {
      console.log(error);
    }
  }
  //returns all tags added to a trade
  async function getTradeTags(trade) {
    try {
      const getTradeData = await API.graphql(
        graphqlOperation(GetTrade, { id: trade })
      );

      const tagsList = getTradeData.data.getTrade.tags.items.filter(
        (item) => !item._deleted
      );
      console.table(tagsList);
      setSelectedTags(tagsList);
    } catch (error) {
      console.log(error);
    }
  }
  function toggleView() {
    setShowForm(!showForm);
  }

  return (
    <>
      <br />
      <br />
      {showForm ? (
        <>
          <button className='return-button' onClick={toggleView}>
            &lt;&lt; Return
          </button>
          <h2>Journal</h2>
          <h3>
            Add a journal entry to your {currentRow.symbol} trade from the{' '}
            {resolveDate(currentRow.created_at)}
          </h3>

          <div className='form-container'>
            <form onSubmit={handleSubmit(createJournal)}>
              <label htmlFor='symbol'>Symbol</label>
              <input
                {...register('symbol')}
                className='disabled-input'
                name='symbol'
                id='symbol'
                disabled
              />
              <label htmlFor='side'>Side</label>
              <input
                {...register('side')}
                className='disabled-input'
                id='side'
                name='side'
                disabled
              />
              <label htmlFor='qty'>Quantity</label>
              <input
                {...register('qty')}
                className='disabled-input'
                id='qty'
                name='qty'
                disabled
              />
              <label htmlFor='order_type'>Order Type</label>
              <input
                {...register('order_type')}
                className='disabled-input'
                id='order_type'
                name='order_type'
                disabled
              />
              <label htmlFor='avg_entry_price'>Average Entry Price</label>
              <input
                {...register('avg_entry_price')}
                className='disabled-input'
                id='avg_entry_price'
                name='avg_entry_price'
                disabled
              />
              <label htmlFor='cum_entry_value'>Cumulative Entry Value</label>
              <input
                {...register('cum_entry_value')}
                className='disabled-input'
                id='cum_entry_value'
                name='cum_entry_value'
                disabled
              />
              <label htmlFor='avg_exit_price'>Average Exit Price</label>
              <input
                {...register('avg_exit_price')}
                className='disabled-input'
                id='avg_exit_price'
                name='avg_exit_price'
                disabled
              />
              <label htmlFor='cum_exit_value'>Cumulative Exit Value</label>
              <input
                {...register('cum_exit_value')}
                className='disabled-input'
                id='cum_exit_value'
                name='cum_exit_value'
                disabled
              />
              <label htmlFor='closed_pnl'>Closed Profit/Loss</label>
              <input
                {...register('closed_pnl')}
                className='disabled-input'
                id='closed_pnl'
                name='closed_pnl'
                disabled
              />
              <label htmlFor='leverage'>Leverage</label>
              <input
                {...register('leverage')}
                className='disabled-input'
                id='leverage'
                name='leverage'
                disabled
              />
              <label htmlFor='attachment'>Attachments</label>
              <input
                {...register('attachment')}
                className='disabled-input'
                id='attachment'
                name='attachment'
              />
              <label className='wide-label' htmlFor='comments'>
                Journal Entry
              </label>
              <textarea
                {...register('comments')}
                className='comments-input'
                id='comments'
                name='comments'
                autoFocus={true}
              />

              <button className='form-save'>Save And Return</button>
            </form>
          </div>
          <h2>Tags:</h2>
          {showTagsContainer ? (
            <div className='tags-container'>
              <div className='tags-table'>
                <MaterialTable
                  title='Selected Tags'
                  columns={tagsTags}
                  data={selectedTags}
                  actions={[
                    {
                      icon: 'remove',
                      tooltip: 'Remove Tag',
                      onClick: (event, rowData) => {
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            console.log(rowData.id, rowData._version);
                            removeTag(rowData.id, rowData._version);
                            getTradeTags(currentRow.id);
                            resolve();
                          }, 1000);
                        });
                      }
                    }
                  ]}
                  options={{
                    rowStyle: {
                      fontSize: '0.8rem'
                    },
                    search: false,
                    paging: false,
                    filtering: false,
                    exportButton: false
                  }}
                />
              </div>
              <div className='tags-table'>
                <MaterialTable
                  title='All your Tags'
                  columns={columnsTags}
                  data={tags}
                  actions={[
                    {
                      icon: 'add',
                      tooltip: 'Add Tag',
                      onClick: (event, rowData) => {
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            addTag(rowData.id, currentRow.id);
                            getTradeTags(currentRow.id);
                            resolve();
                          }, 1000);
                        });
                      }
                    }
                  ]}
                  editable={{
                    onRowAdd: (newData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          setTags([...tags, newData]);

                          resolve();
                        }, 1000);
                      })
                    // onRowUpdate: (newData, oldData) =>
                    //   new Promise((resolve, reject) => {
                    //     setTimeout(() => {
                    //       const dataUpdate = [...tags];
                    //       const index = oldData.tableData.id;
                    //       console.log(index, dataUpdate);
                    //       dataUpdate[index] = newData;
                    //       updateTagByID(tags[index].id, newData);
                    //       setTags([...dataUpdate]);

                    //       resolve();
                    //     }, 1000);
                    //   }),
                    // onRowDelete: (oldData) =>
                    //   new Promise((resolve, reject) => {
                    //     setTimeout(() => {
                    //       const dataDelete = [...tags];
                    //       const index = oldData.tableData.id;
                    //       deleteTagByID(tags[index].id, tags[index]._version);
                    //       dataDelete.splice(index, 1);
                    //       setTags([...dataDelete]);

                    //       resolve();
                    //     }, 1000);
                    //   })
                  }}
                  options={{
                    rowStyle: {
                      fontSize: '0.8rem'
                    },
                    search: false,
                    paging: false,
                    filtering: false,
                    exportButton: false
                  }}
                />
              </div>
              <button
                className='tags-save-button'
                onClick={() => setShowTagsContainer(!showTagsContainer)}
              >
                Save
              </button>
            </div>
          ) : (
            <button
              className='tags-add-button'
              onClick={() => setShowTagsContainer(!showTagsContainer)}
            >
              Add Tags
            </button>
          )}
        </>
      ) : (
        <MaterialTable
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
        />
      )}
    </>
  );
};

export default GetTrades;
