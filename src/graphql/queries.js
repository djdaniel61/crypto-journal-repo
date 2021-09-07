/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBybitAPI = /* GraphQL */ `
  query GetBybitAPI($id: ID!) {
    getBybitAPI(id: $id) {
      id
      name
      secret
      apiKey
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listBybitAPIs = /* GraphQL */ `
  query ListBybitAPIs(
    $filter: ModelBybitAPIFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBybitAPIs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        secret
        apiKey
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncBybitAPIS = /* GraphQL */ `
  query SyncBybitAPIS(
    $filter: ModelBybitAPIFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBybitAPIS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        secret
        apiKey
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTrade = /* GraphQL */ `
  query GetTrade($id: ID!) {
    getTrade(id: $id) {
      id
      user_id
      symbol
      qty
      order_type
      exec_type
      avg_entry_price
      cum_entry_value
      avg_exit_price
      cum_exit_value
      closed_pnl
      side
      created_at
      leverage
      comments
      attachment
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      tags {
        items {
          id
          tagID
          tradeID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const listTrades = /* GraphQL */ `
  query ListTrades(
    $filter: ModelTradeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrades(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_id
        symbol
        qty
        order_type
        exec_type
        avg_entry_price
        cum_entry_value
        avg_exit_price
        cum_exit_value
        closed_pnl
        side
        created_at
        leverage
        comments
        attachment
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        tags {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTrades = /* GraphQL */ `
  query SyncTrades(
    $filter: ModelTradeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTrades(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        user_id
        symbol
        qty
        order_type
        exec_type
        avg_entry_price
        cum_entry_value
        avg_exit_price
        cum_exit_value
        closed_pnl
        side
        created_at
        leverage
        comments
        attachment
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        tags {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
      id
      title
      description
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      TagTrades {
        items {
          id
          tagID
          tradeID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        TagTrades {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTags = /* GraphQL */ `
  query SyncTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTags(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        description
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        TagTrades {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTagTrades = /* GraphQL */ `
  query SyncTagTrades(
    $filter: ModelTagTradeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTagTrades(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        tagID
        tradeID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        trade {
          id
          user_id
          symbol
          qty
          order_type
          exec_type
          avg_entry_price
          cum_entry_value
          avg_exit_price
          cum_exit_value
          closed_pnl
          side
          created_at
          leverage
          comments
          attachment
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        tag {
          id
          title
          description
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
