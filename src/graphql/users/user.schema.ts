/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class NewUser {
  name: string;
  email: string;
  password: string;
}

export class UpdateUser {
  id: string;
  name?: Nullable<string>;
  email?: Nullable<string>;
  password?: Nullable<string>;
}

export class User {
  id: string;
  name: string;
  email: string;
  password: boolean;
}

export abstract class IQuery {
  abstract users(): User[] | Promise<User[]>;

  abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
  abstract createUser(input: NewUser): User | Promise<User>;

  abstract updateUser(
    input: UpdateUser,
  ): Nullable<User> | Promise<Nullable<User>>;

  abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class ISubscription {
  abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
