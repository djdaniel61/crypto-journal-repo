import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function NewTrade3() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {}
  });
  const loadedRowData = {
    symbol: rowData.symbol,
    side: 1,
    qty: '1',
    order_type: '1',
    avg_entry_price: 1,
    cum_entry_value: 1,
    avg_exit_price: 1,
    cum_exit_value: 1,
    closed_pnl: 1,
    created_at: 1,
    leverage: 1,
    comments: 1
  };
  useEffect(() => {
    reset(loadedRowData);
  }, [reset]);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('symbol')}
        name='symbol'
        // onChange={onChange}
        // value={state.symbol}
      />
      <input
        {...register('side')}
        className=''
        id='side'
        name='side'
        // onChange={onChange}
        // value={state.side}
      />

      <input
        {...register('qty')}
        className=''
        id='qty'
        name='qty'
        // onChange={onChange}
        // value={state.qty}
      />

      <input
        {...register('order_type ')}
        className=''
        id='order_type'
        name='order_type'
        // onChange={onChange}
        // value={state.order_type}
      />

      <input
        {...register('avg_entry_price')}
        className=''
        id='avg_entry_price'
        name='avg_entry_price'
        // onChange={onChange}
        // value={state.avg_entry_price}
      />

      <input
        {...register('cum_entry_value')}
        className=''
        id='cum_entry_value'
        name='cum_entry_value'
        // onChange={onChange}
        // value={state.cum_entry_value}
      />

      <input
        {...register('avg_exit_price')}
        className=''
        id='avg_exit_price'
        name='avg_exit_price'
        // onChange={onChange}
        // value={state.avg_exit_price}
      />

      <input
        {...register('cum_exit_value')}
        className=''
        id='cum_exit_value'
        name='cum_exit_value'
        // onChange={onChange}
        // value={state.cum_exit_value}
      />

      <input
        {...register('closed_pnl')}
        className=''
        id='closed_pnl'
        name='closed_pnl'
        // onChange={onChange}
        // value={state.closed_pnl}
      />

      <input
        {...register('leverage')}
        className=''
        id='leverage'
        name='leverage'
        // onChange={onChange}
        // value={state.leverage}
      />

      <input
        {...register('created_at')}
        className=''
        id='created_at'
        name='created_at'
        // onChange={onChange}
        // value={state.created_at}
      />

      <input
        {...register('comments')}
        className=''
        id='comments'
        name='comments'
        // onChange={onChange}
        // value={state.comments}

        style={{ height: '100px' }}
      />

      <button>Create Trade</button>
    </form>
  );
}
