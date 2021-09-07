/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBybitAPI = /* GraphQL */ `
  subscription OnCreateBybitAPI {
    onCreateBybitAPI {
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
export const onUpdateBybitAPI = /* GraphQL */ `
  subscription OnUpdateBybitAPI {
    onUpdateBybitAPI {
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
export const onDeleteBybitAPI = /* GraphQL */ `
  subscription OnDeleteBybitAPI {
    onDeleteBybitAPI {
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
export const onCreateTrade = /* GraphQL */ `
  subscription OnCreateTrade {
    onCreateTrade {
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
export const onUpdateTrade = /* GraphQL */ `
  subscription OnUpdateTrade {
    onUpdateTrade {
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
export const onDeleteTrade = /* GraphQL */ `
  subscription OnDeleteTrade {
    onDeleteTrade {
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag {
    onUpdateTag {
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
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
export const onCreateTagTrade = /* GraphQL */ `
  subscription OnCreateTagTrade {
    onCreateTagTrade {
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
export const onUpdateTagTrade = /* GraphQL */ `
  subscription OnUpdateTagTrade {
    onUpdateTagTrade {
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
export const onDeleteTagTrade = /* GraphQL */ `
  subscription OnDeleteTagTrade {
    onDeleteTagTrade {
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
