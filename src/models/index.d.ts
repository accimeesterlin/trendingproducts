import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type NRTMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EveriMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class NRT {
  readonly id: string;
  readonly NrtID: string;
  readonly OrganizationName: string;
  readonly PropertyName: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly userNrtId?: string;
  constructor(init: ModelInit<NRT, NRTMetaData>);
  static copyOf(source: NRT, mutator: (draft: MutableModel<NRT, NRTMetaData>) => MutableModel<NRT, NRTMetaData> | void): NRT;
}

export declare class Everi {
  readonly id: string;
  readonly EveriID: string;
  readonly EveriName: string;
  readonly Amount: string;
  readonly Date: string;
  readonly Casino: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly userEveryId?: string;
  constructor(init: ModelInit<Everi, EveriMetaData>);
  static copyOf(source: Everi, mutator: (draft: MutableModel<Everi, EveriMetaData>) => MutableModel<Everi, EveriMetaData> | void): Everi;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly role: string;
  readonly nrt?: (NRT | null)[];
  readonly every?: (Everi | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}