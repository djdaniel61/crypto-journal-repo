import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class BybitAPI {
  readonly id: string;
  readonly name: string;
  readonly secret: string;
  readonly apiKey: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<BybitAPI>);
  static copyOf(source: BybitAPI, mutator: (draft: MutableModel<BybitAPI>) => MutableModel<BybitAPI> | void): BybitAPI;
}

export declare class Trade {
  readonly id: string;
  readonly user_id?: string;
  readonly symbol?: string;
  readonly qty?: number;
  readonly order_type?: string;
  readonly exec_type?: string;
  readonly avg_entry_price?: number;
  readonly cum_entry_value?: number;
  readonly avg_exit_price?: number;
  readonly tags?: (TagTrade | null)[];
  readonly cum_exit_value?: number;
  readonly closed_pnl?: number;
  readonly side?: string;
  readonly created_at?: string;
  readonly leverage?: number;
  readonly comments?: string;
  readonly attachment?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Trade>);
  static copyOf(source: Trade, mutator: (draft: MutableModel<Trade>) => MutableModel<Trade> | void): Trade;
}

export declare class TagTrade {
  readonly id: string;
  readonly tag: Tag;
  readonly trade: Trade;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TagTrade>);
  static copyOf(source: TagTrade, mutator: (draft: MutableModel<TagTrade>) => MutableModel<TagTrade> | void): TagTrade;
}

export declare class Tag {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly TagTrades?: (TagTrade | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Tag>);
  static copyOf(source: Tag, mutator: (draft: MutableModel<Tag>) => MutableModel<Tag> | void): Tag;
}