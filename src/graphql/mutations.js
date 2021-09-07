/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBybitAPI = /* GraphQL */ `
  mutation CreateBybitAPI(
    $input: CreateBybitAPIInput!
    $condition: ModelBybitAPIConditionInput
  ) {
    createBybitAPI(input: $input, condition: $condition) {
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
export const updateBybitAPI = /* GraphQL */ `
  mutation UpdateBybitAPI(
    $input: UpdateBybitAPIInput!
    $condition: ModelBybitAPIConditionInput
  ) {
    updateBybitAPI(input: $input, condition: $condition) {
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
export const deleteBybitAPI = /* GraphQL */ `
  mutation DeleteBybitAPI(
    $input: DeleteBybitAPIInput!
    $condition: ModelBybitAPIConditionInput
  ) {
    deleteBybitAPI(input: $input, condition: $condition) {
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
export const createTrade = /* GraphQL */ `
  mutation CreateTrade(
    $input: CreateTradeInput!
    $condition: ModelTradeConditionInput
  ) {
    createTrade(input: $input, condition: $condition) {
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
export const updateTrade = /* GraphQL */ `
  mutation UpdateTrade(
    $input: UpdateTradeInput!
    $condition: ModelTradeConditionInput
  ) {
    updateTrade(input: $input, condition: $condition) {
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
export const deleteTrade = /* GraphQL */ `
  mutation DeleteTrade(
    $input: DeleteTradeInput!
    $condition: ModelTradeConditionInput
  ) {
    deleteTrade(input: $input, condition: $condition) {
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
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
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
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
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
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
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
export const createTagTrade = /* GraphQL */ `
  mutation CreateTagTrade(
    $input: CreateTagTradeInput!
    $condition: ModelTagTradeConditionInput
  ) {
    createTagTrade(input: $input, condition: $condition) {
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
        tags {
          nextToken
          startedAt
        }
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
        TagTrades {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const updateTagTrade = /* GraphQL */ `
  mutation UpdateTagTrade(
    $input: UpdateTagTradeInput!
    $condition: ModelTagTradeConditionInput
  ) {
    updateTagTrade(input: $input, condition: $condition) {
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
        tags {
          nextToken
          startedAt
        }
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
        TagTrades {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const deleteTagTrade = /* GraphQL */ `
  mutation DeleteTagTrade(
    $input: DeleteTagTradeInput!
    $condition: ModelTagTradeConditionInput
  ) {
    deleteTagTrade(input: $input, condition: $condition) {
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
        tags {
          nextToken
          startedAt
        }
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
        TagTrades {
          nextToken
          startedAt
        }
      }
    }
  }
`;
