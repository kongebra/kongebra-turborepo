
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Store
 * 
 */
export type Store = {
  id: number
  name: string
  description: string
  imageUrl: string
  baseUrl: string
  sitemapUrl: string
  createdAt: Date
  updatedAt: Date
  slug: string
}

/**
 * Model Product
 * 
 */
export type Product = {
  id: number
  loc: string
  lastmod: string
  title: string
  description: string
  imageUrl: string
  isDisc: boolean | null
  storeId: number
  discId: number | null
  createdAt: Date
  updatedAt: Date
  latestPrice: number
}

/**
 * Model ProductPrice
 * 
 */
export type ProductPrice = {
  id: number
  amount: number
  currency: string
  productId: number
  createdAt: Date
}

/**
 * Model Brand
 * 
 */
export type Brand = {
  id: number
  name: string
  description: string
  url: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
  slug: string
}

/**
 * Model Disc
 * 
 */
export type Disc = {
  id: number
  name: string
  description: string
  imageUrl: string
  speed: number
  glide: number
  turn: number
  fade: number
  brandId: number
  createdAt: Date
  updatedAt: Date
  type: string
  slug: string
  views: number
}

/**
 * Model UserDiscFavorites
 * 
 */
export type UserDiscFavorites = {
  discId: number
  userId: string
}

/**
 * Model Account
 * 
 */
export type Account = {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token: string | null
  access_token: string | null
  expires_at: number | null
  token_type: string | null
  scope: string | null
  id_token: string | null
  session_state: string | null
}

/**
 * Model Session
 * 
 */
export type Session = {
  id: string
  sessionToken: string
  userId: string
  expires: Date
}

/**
 * Model User
 * 
 */
export type User = {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  role: string
}

/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = {
  identifier: string
  token: string
  expires: Date
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Stores
 * const stores = await prisma.store.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Stores
   * const stores = await prisma.store.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.store`: Exposes CRUD operations for the **Store** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stores
    * const stores = await prisma.store.findMany()
    * ```
    */
  get store(): Prisma.StoreDelegate<GlobalReject>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<GlobalReject>;

  /**
   * `prisma.productPrice`: Exposes CRUD operations for the **ProductPrice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductPrices
    * const productPrices = await prisma.productPrice.findMany()
    * ```
    */
  get productPrice(): Prisma.ProductPriceDelegate<GlobalReject>;

  /**
   * `prisma.brand`: Exposes CRUD operations for the **Brand** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Brands
    * const brands = await prisma.brand.findMany()
    * ```
    */
  get brand(): Prisma.BrandDelegate<GlobalReject>;

  /**
   * `prisma.disc`: Exposes CRUD operations for the **Disc** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Discs
    * const discs = await prisma.disc.findMany()
    * ```
    */
  get disc(): Prisma.DiscDelegate<GlobalReject>;

  /**
   * `prisma.userDiscFavorites`: Exposes CRUD operations for the **UserDiscFavorites** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserDiscFavorites
    * const userDiscFavorites = await prisma.userDiscFavorites.findMany()
    * ```
    */
  get userDiscFavorites(): Prisma.UserDiscFavoritesDelegate<GlobalReject>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<GlobalReject>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<GlobalReject>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export import Metrics = runtime.Metrics
  export import Metric = runtime.Metric
  export import MetricHistogram = runtime.MetricHistogram
  export import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Prisma Client JS version: 4.4.0
   * Query Engine version: f352a33b70356f46311da8b00d83386dd9f145d6
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export import FieldRef = runtime.FieldRef

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Store: 'Store',
    Product: 'Product',
    ProductPrice: 'ProductPrice',
    Brand: 'Brand',
    Disc: 'Disc',
    UserDiscFavorites: 'UserDiscFavorites',
    Account: 'Account',
    Session: 'Session',
    User: 'User',
    VerificationToken: 'VerificationToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StoreCountOutputType
   */


  export type StoreCountOutputType = {
    products: number
  }

  export type StoreCountOutputTypeSelect = {
    products?: boolean
  }

  export type StoreCountOutputTypeGetPayload<
    S extends boolean | null | undefined | StoreCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? StoreCountOutputType
    : S extends undefined
    ? never
    : S extends StoreCountOutputTypeArgs
    ?'include' extends U
    ? StoreCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof StoreCountOutputType ? StoreCountOutputType[P] : never
  } 
    : StoreCountOutputType
  : StoreCountOutputType




  // Custom InputTypes

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the StoreCountOutputType
     * 
    **/
    select?: StoreCountOutputTypeSelect | null
  }



  /**
   * Count Type ProductCountOutputType
   */


  export type ProductCountOutputType = {
    prices: number
  }

  export type ProductCountOutputTypeSelect = {
    prices?: boolean
  }

  export type ProductCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ProductCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ProductCountOutputType
    : S extends undefined
    ? never
    : S extends ProductCountOutputTypeArgs
    ?'include' extends U
    ? ProductCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ProductCountOutputType ? ProductCountOutputType[P] : never
  } 
    : ProductCountOutputType
  : ProductCountOutputType




  // Custom InputTypes

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     * 
    **/
    select?: ProductCountOutputTypeSelect | null
  }



  /**
   * Count Type BrandCountOutputType
   */


  export type BrandCountOutputType = {
    discs: number
  }

  export type BrandCountOutputTypeSelect = {
    discs?: boolean
  }

  export type BrandCountOutputTypeGetPayload<
    S extends boolean | null | undefined | BrandCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? BrandCountOutputType
    : S extends undefined
    ? never
    : S extends BrandCountOutputTypeArgs
    ?'include' extends U
    ? BrandCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof BrandCountOutputType ? BrandCountOutputType[P] : never
  } 
    : BrandCountOutputType
  : BrandCountOutputType




  // Custom InputTypes

  /**
   * BrandCountOutputType without action
   */
  export type BrandCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the BrandCountOutputType
     * 
    **/
    select?: BrandCountOutputTypeSelect | null
  }



  /**
   * Count Type DiscCountOutputType
   */


  export type DiscCountOutputType = {
    products: number
    users: number
  }

  export type DiscCountOutputTypeSelect = {
    products?: boolean
    users?: boolean
  }

  export type DiscCountOutputTypeGetPayload<
    S extends boolean | null | undefined | DiscCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? DiscCountOutputType
    : S extends undefined
    ? never
    : S extends DiscCountOutputTypeArgs
    ?'include' extends U
    ? DiscCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof DiscCountOutputType ? DiscCountOutputType[P] : never
  } 
    : DiscCountOutputType
  : DiscCountOutputType




  // Custom InputTypes

  /**
   * DiscCountOutputType without action
   */
  export type DiscCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the DiscCountOutputType
     * 
    **/
    select?: DiscCountOutputTypeSelect | null
  }



  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    accounts: number
    sessions: number
    favorites: number
  }

  export type UserCountOutputTypeSelect = {
    accounts?: boolean
    sessions?: boolean
    favorites?: boolean
  }

  export type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ?'include' extends U
    ? UserCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
    : UserCountOutputType
  : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Store
   */


  export type AggregateStore = {
    _count: StoreCountAggregateOutputType | null
    _avg: StoreAvgAggregateOutputType | null
    _sum: StoreSumAggregateOutputType | null
    _min: StoreMinAggregateOutputType | null
    _max: StoreMaxAggregateOutputType | null
  }

  export type StoreAvgAggregateOutputType = {
    id: number | null
  }

  export type StoreSumAggregateOutputType = {
    id: number | null
  }

  export type StoreMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    imageUrl: string | null
    baseUrl: string | null
    sitemapUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    slug: string | null
  }

  export type StoreMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    imageUrl: string | null
    baseUrl: string | null
    sitemapUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    slug: string | null
  }

  export type StoreCountAggregateOutputType = {
    id: number
    name: number
    description: number
    imageUrl: number
    baseUrl: number
    sitemapUrl: number
    createdAt: number
    updatedAt: number
    slug: number
    _all: number
  }


  export type StoreAvgAggregateInputType = {
    id?: true
  }

  export type StoreSumAggregateInputType = {
    id?: true
  }

  export type StoreMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    imageUrl?: true
    baseUrl?: true
    sitemapUrl?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
  }

  export type StoreMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    imageUrl?: true
    baseUrl?: true
    sitemapUrl?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
  }

  export type StoreCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    imageUrl?: true
    baseUrl?: true
    sitemapUrl?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
    _all?: true
  }

  export type StoreAggregateArgs = {
    /**
     * Filter which Store to aggregate.
     * 
    **/
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     * 
    **/
    orderBy?: Enumerable<StoreOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stores
    **/
    _count?: true | StoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StoreMaxAggregateInputType
  }

  export type GetStoreAggregateType<T extends StoreAggregateArgs> = {
        [P in keyof T & keyof AggregateStore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStore[P]>
      : GetScalarType<T[P], AggregateStore[P]>
  }




  export type StoreGroupByArgs = {
    where?: StoreWhereInput
    orderBy?: Enumerable<StoreOrderByWithAggregationInput>
    by: Array<StoreScalarFieldEnum>
    having?: StoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StoreCountAggregateInputType | true
    _avg?: StoreAvgAggregateInputType
    _sum?: StoreSumAggregateInputType
    _min?: StoreMinAggregateInputType
    _max?: StoreMaxAggregateInputType
  }


  export type StoreGroupByOutputType = {
    id: number
    name: string
    description: string
    imageUrl: string
    baseUrl: string
    sitemapUrl: string
    createdAt: Date
    updatedAt: Date
    slug: string
    _count: StoreCountAggregateOutputType | null
    _avg: StoreAvgAggregateOutputType | null
    _sum: StoreSumAggregateOutputType | null
    _min: StoreMinAggregateOutputType | null
    _max: StoreMaxAggregateOutputType | null
  }

  type GetStoreGroupByPayload<T extends StoreGroupByArgs> = PrismaPromise<
    Array<
      PickArray<StoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StoreGroupByOutputType[P]>
            : GetScalarType<T[P], StoreGroupByOutputType[P]>
        }
      >
    >


  export type StoreSelect = {
    id?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    baseUrl?: boolean
    sitemapUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    slug?: boolean
    products?: boolean | ProductFindManyArgs
    _count?: boolean | StoreCountOutputTypeArgs
  }

  export type StoreInclude = {
    products?: boolean | ProductFindManyArgs
    _count?: boolean | StoreCountOutputTypeArgs
  }

  export type StoreGetPayload<
    S extends boolean | null | undefined | StoreArgs,
    U = keyof S
      > = S extends true
        ? Store
    : S extends undefined
    ? never
    : S extends StoreArgs | StoreFindManyArgs
    ?'include' extends U
    ? Store  & {
    [P in TrueKeys<S['include']>]:
        P extends 'products' ? Array < ProductGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? StoreCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'products' ? Array < ProductGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? StoreCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Store ? Store[P] : never
  } 
    : Store
  : Store


  type StoreCountArgs = Merge<
    Omit<StoreFindManyArgs, 'select' | 'include'> & {
      select?: StoreCountAggregateInputType | true
    }
  >

  export interface StoreDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Store that matches the filter.
     * @param {StoreFindUniqueArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends StoreFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, StoreFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Store'> extends True ? CheckSelect<T, Prisma__StoreClient<Store>, Prisma__StoreClient<StoreGetPayload<T>>> : CheckSelect<T, Prisma__StoreClient<Store | null, null>, Prisma__StoreClient<StoreGetPayload<T> | null, null>>

    /**
     * Find the first Store that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindFirstArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends StoreFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, StoreFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Store'> extends True ? CheckSelect<T, Prisma__StoreClient<Store>, Prisma__StoreClient<StoreGetPayload<T>>> : CheckSelect<T, Prisma__StoreClient<Store | null, null>, Prisma__StoreClient<StoreGetPayload<T> | null, null>>

    /**
     * Find zero or more Stores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stores
     * const stores = await prisma.store.findMany()
     * 
     * // Get first 10 Stores
     * const stores = await prisma.store.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storeWithIdOnly = await prisma.store.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends StoreFindManyArgs>(
      args?: SelectSubset<T, StoreFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Store>>, PrismaPromise<Array<StoreGetPayload<T>>>>

    /**
     * Create a Store.
     * @param {StoreCreateArgs} args - Arguments to create a Store.
     * @example
     * // Create one Store
     * const Store = await prisma.store.create({
     *   data: {
     *     // ... data to create a Store
     *   }
     * })
     * 
    **/
    create<T extends StoreCreateArgs>(
      args: SelectSubset<T, StoreCreateArgs>
    ): CheckSelect<T, Prisma__StoreClient<Store>, Prisma__StoreClient<StoreGetPayload<T>>>

    /**
     * Create many Stores.
     *     @param {StoreCreateManyArgs} args - Arguments to create many Stores.
     *     @example
     *     // Create many Stores
     *     const store = await prisma.store.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends StoreCreateManyArgs>(
      args?: SelectSubset<T, StoreCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Store.
     * @param {StoreDeleteArgs} args - Arguments to delete one Store.
     * @example
     * // Delete one Store
     * const Store = await prisma.store.delete({
     *   where: {
     *     // ... filter to delete one Store
     *   }
     * })
     * 
    **/
    delete<T extends StoreDeleteArgs>(
      args: SelectSubset<T, StoreDeleteArgs>
    ): CheckSelect<T, Prisma__StoreClient<Store>, Prisma__StoreClient<StoreGetPayload<T>>>

    /**
     * Update one Store.
     * @param {StoreUpdateArgs} args - Arguments to update one Store.
     * @example
     * // Update one Store
     * const store = await prisma.store.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends StoreUpdateArgs>(
      args: SelectSubset<T, StoreUpdateArgs>
    ): CheckSelect<T, Prisma__StoreClient<Store>, Prisma__StoreClient<StoreGetPayload<T>>>

    /**
     * Delete zero or more Stores.
     * @param {StoreDeleteManyArgs} args - Arguments to filter Stores to delete.
     * @example
     * // Delete a few Stores
     * const { count } = await prisma.store.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends StoreDeleteManyArgs>(
      args?: SelectSubset<T, StoreDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stores
     * const store = await prisma.store.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends StoreUpdateManyArgs>(
      args: SelectSubset<T, StoreUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Store.
     * @param {StoreUpsertArgs} args - Arguments to update or create a Store.
     * @example
     * // Update or create a Store
     * const store = await prisma.store.upsert({
     *   create: {
     *     // ... data to create a Store
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Store we want to update
     *   }
     * })
    **/
    upsert<T extends StoreUpsertArgs>(
      args: SelectSubset<T, StoreUpsertArgs>
    ): CheckSelect<T, Prisma__StoreClient<Store>, Prisma__StoreClient<StoreGetPayload<T>>>

    /**
     * Find one Store that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {StoreFindUniqueOrThrowArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends StoreFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, StoreFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__StoreClient<Store>, Prisma__StoreClient<StoreGetPayload<T>>>

    /**
     * Find the first Store that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindFirstOrThrowArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends StoreFindFirstOrThrowArgs>(
      args?: SelectSubset<T, StoreFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__StoreClient<Store>, Prisma__StoreClient<StoreGetPayload<T>>>

    /**
     * Count the number of Stores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreCountArgs} args - Arguments to filter Stores to count.
     * @example
     * // Count the number of Stores
     * const count = await prisma.store.count({
     *   where: {
     *     // ... the filter for the Stores we want to count
     *   }
     * })
    **/
    count<T extends StoreCountArgs>(
      args?: Subset<T, StoreCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Store.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StoreAggregateArgs>(args: Subset<T, StoreAggregateArgs>): PrismaPromise<GetStoreAggregateType<T>>

    /**
     * Group by Store.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StoreGroupByArgs['orderBy'] }
        : { orderBy?: StoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Store.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__StoreClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    products<T extends ProductFindManyArgs = {}>(args?: Subset<T, ProductFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Product>| Null>, PrismaPromise<Array<ProductGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Store base type for findUnique actions
   */
  export type StoreFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Store
     * 
    **/
    select?: StoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StoreInclude | null
    /**
     * Filter, which Store to fetch.
     * 
    **/
    where: StoreWhereUniqueInput
  }

  /**
   * Store: findUnique
   */
  export interface StoreFindUniqueArgs extends StoreFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Store base type for findFirst actions
   */
  export type StoreFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Store
     * 
    **/
    select?: StoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StoreInclude | null
    /**
     * Filter, which Store to fetch.
     * 
    **/
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     * 
    **/
    orderBy?: Enumerable<StoreOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stores.
     * 
    **/
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stores.
     * 
    **/
    distinct?: Enumerable<StoreScalarFieldEnum>
  }

  /**
   * Store: findFirst
   */
  export interface StoreFindFirstArgs extends StoreFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Store findMany
   */
  export type StoreFindManyArgs = {
    /**
     * Select specific fields to fetch from the Store
     * 
    **/
    select?: StoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StoreInclude | null
    /**
     * Filter, which Stores to fetch.
     * 
    **/
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     * 
    **/
    orderBy?: Enumerable<StoreOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stores.
     * 
    **/
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     * 
    **/
    skip?: number
    distinct?: Enumerable<StoreScalarFieldEnum>
  }


  /**
   * Store create
   */
  export type StoreCreateArgs = {
    /**
     * Select specific fields to fetch from the Store
     * 
    **/
    select?: StoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StoreInclude | null
    /**
     * The data needed to create a Store.
     * 
    **/
    data: XOR<StoreCreateInput, StoreUncheckedCreateInput>
  }


  /**
   * Store createMany
   */
  export type StoreCreateManyArgs = {
    /**
     * The data used to create many Stores.
     * 
    **/
    data: Enumerable<StoreCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Store update
   */
  export type StoreUpdateArgs = {
    /**
     * Select specific fields to fetch from the Store
     * 
    **/
    select?: StoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StoreInclude | null
    /**
     * The data needed to update a Store.
     * 
    **/
    data: XOR<StoreUpdateInput, StoreUncheckedUpdateInput>
    /**
     * Choose, which Store to update.
     * 
    **/
    where: StoreWhereUniqueInput
  }


  /**
   * Store updateMany
   */
  export type StoreUpdateManyArgs = {
    /**
     * The data used to update Stores.
     * 
    **/
    data: XOR<StoreUpdateManyMutationInput, StoreUncheckedUpdateManyInput>
    /**
     * Filter which Stores to update
     * 
    **/
    where?: StoreWhereInput
  }


  /**
   * Store upsert
   */
  export type StoreUpsertArgs = {
    /**
     * Select specific fields to fetch from the Store
     * 
    **/
    select?: StoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StoreInclude | null
    /**
     * The filter to search for the Store to update in case it exists.
     * 
    **/
    where: StoreWhereUniqueInput
    /**
     * In case the Store found by the `where` argument doesn't exist, create a new Store with this data.
     * 
    **/
    create: XOR<StoreCreateInput, StoreUncheckedCreateInput>
    /**
     * In case the Store was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<StoreUpdateInput, StoreUncheckedUpdateInput>
  }


  /**
   * Store delete
   */
  export type StoreDeleteArgs = {
    /**
     * Select specific fields to fetch from the Store
     * 
    **/
    select?: StoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StoreInclude | null
    /**
     * Filter which Store to delete.
     * 
    **/
    where: StoreWhereUniqueInput
  }


  /**
   * Store deleteMany
   */
  export type StoreDeleteManyArgs = {
    /**
     * Filter which Stores to delete
     * 
    **/
    where?: StoreWhereInput
  }


  /**
   * Store: findUniqueOrThrow
   */
  export type StoreFindUniqueOrThrowArgs = StoreFindUniqueArgsBase
      

  /**
   * Store: findFirstOrThrow
   */
  export type StoreFindFirstOrThrowArgs = StoreFindFirstArgsBase
      

  /**
   * Store without action
   */
  export type StoreArgs = {
    /**
     * Select specific fields to fetch from the Store
     * 
    **/
    select?: StoreSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: StoreInclude | null
  }



  /**
   * Model Product
   */


  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    id: number | null
    storeId: number | null
    discId: number | null
    latestPrice: number | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    storeId: number | null
    discId: number | null
    latestPrice: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    loc: string | null
    lastmod: string | null
    title: string | null
    description: string | null
    imageUrl: string | null
    isDisc: boolean | null
    storeId: number | null
    discId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    latestPrice: number | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    loc: string | null
    lastmod: string | null
    title: string | null
    description: string | null
    imageUrl: string | null
    isDisc: boolean | null
    storeId: number | null
    discId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    latestPrice: number | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    loc: number
    lastmod: number
    title: number
    description: number
    imageUrl: number
    isDisc: number
    storeId: number
    discId: number
    createdAt: number
    updatedAt: number
    latestPrice: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    storeId?: true
    discId?: true
    latestPrice?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    storeId?: true
    discId?: true
    latestPrice?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    loc?: true
    lastmod?: true
    title?: true
    description?: true
    imageUrl?: true
    isDisc?: true
    storeId?: true
    discId?: true
    createdAt?: true
    updatedAt?: true
    latestPrice?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    loc?: true
    lastmod?: true
    title?: true
    description?: true
    imageUrl?: true
    isDisc?: true
    storeId?: true
    discId?: true
    createdAt?: true
    updatedAt?: true
    latestPrice?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    loc?: true
    lastmod?: true
    title?: true
    description?: true
    imageUrl?: true
    isDisc?: true
    storeId?: true
    discId?: true
    createdAt?: true
    updatedAt?: true
    latestPrice?: true
    _all?: true
  }

  export type ProductAggregateArgs = {
    /**
     * Filter which Product to aggregate.
     * 
    **/
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     * 
    **/
    orderBy?: Enumerable<ProductOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs = {
    where?: ProductWhereInput
    orderBy?: Enumerable<ProductOrderByWithAggregationInput>
    by: Array<ProductScalarFieldEnum>
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }


  export type ProductGroupByOutputType = {
    id: number
    loc: string
    lastmod: string
    title: string
    description: string
    imageUrl: string
    isDisc: boolean | null
    storeId: number
    discId: number | null
    createdAt: Date
    updatedAt: Date
    latestPrice: number
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect = {
    id?: boolean
    loc?: boolean
    lastmod?: boolean
    title?: boolean
    description?: boolean
    imageUrl?: boolean
    isDisc?: boolean
    storeId?: boolean
    discId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    disc?: boolean | DiscArgs
    store?: boolean | StoreArgs
    prices?: boolean | ProductPriceFindManyArgs
    latestPrice?: boolean
    _count?: boolean | ProductCountOutputTypeArgs
  }

  export type ProductInclude = {
    disc?: boolean | DiscArgs
    store?: boolean | StoreArgs
    prices?: boolean | ProductPriceFindManyArgs
    _count?: boolean | ProductCountOutputTypeArgs
  }

  export type ProductGetPayload<
    S extends boolean | null | undefined | ProductArgs,
    U = keyof S
      > = S extends true
        ? Product
    : S extends undefined
    ? never
    : S extends ProductArgs | ProductFindManyArgs
    ?'include' extends U
    ? Product  & {
    [P in TrueKeys<S['include']>]:
        P extends 'disc' ? DiscGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'store' ? StoreGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'prices' ? Array < ProductPriceGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? ProductCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'disc' ? DiscGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'store' ? StoreGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'prices' ? Array < ProductPriceGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? ProductCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Product ? Product[P] : never
  } 
    : Product
  : Product


  type ProductCountArgs = Merge<
    Omit<ProductFindManyArgs, 'select' | 'include'> & {
      select?: ProductCountAggregateInputType | true
    }
  >

  export interface ProductDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProductFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProductFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Product'> extends True ? CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>> : CheckSelect<T, Prisma__ProductClient<Product | null, null>, Prisma__ProductClient<ProductGetPayload<T> | null, null>>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProductFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProductFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Product'> extends True ? CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>> : CheckSelect<T, Prisma__ProductClient<Product | null, null>, Prisma__ProductClient<ProductGetPayload<T> | null, null>>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProductFindManyArgs>(
      args?: SelectSubset<T, ProductFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Product>>, PrismaPromise<Array<ProductGetPayload<T>>>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
    **/
    create<T extends ProductCreateArgs>(
      args: SelectSubset<T, ProductCreateArgs>
    ): CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>>

    /**
     * Create many Products.
     *     @param {ProductCreateManyArgs} args - Arguments to create many Products.
     *     @example
     *     // Create many Products
     *     const product = await prisma.product.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProductCreateManyArgs>(
      args?: SelectSubset<T, ProductCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
    **/
    delete<T extends ProductDeleteArgs>(
      args: SelectSubset<T, ProductDeleteArgs>
    ): CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProductUpdateArgs>(
      args: SelectSubset<T, ProductUpdateArgs>
    ): CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProductDeleteManyArgs>(
      args?: SelectSubset<T, ProductDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProductUpdateManyArgs>(
      args: SelectSubset<T, ProductUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
    **/
    upsert<T extends ProductUpsertArgs>(
      args: SelectSubset<T, ProductUpsertArgs>
    ): CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>>

    /**
     * Find one Product that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ProductFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>>

    /**
     * Find the first Product that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProductFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>>

    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProductClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    disc<T extends DiscArgs = {}>(args?: Subset<T, DiscArgs>): CheckSelect<T, Prisma__DiscClient<Disc | Null>, Prisma__DiscClient<DiscGetPayload<T> | Null>>;

    store<T extends StoreArgs = {}>(args?: Subset<T, StoreArgs>): CheckSelect<T, Prisma__StoreClient<Store | Null>, Prisma__StoreClient<StoreGetPayload<T> | Null>>;

    prices<T extends ProductPriceFindManyArgs = {}>(args?: Subset<T, ProductPriceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ProductPrice>| Null>, PrismaPromise<Array<ProductPriceGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Product base type for findUnique actions
   */
  export type ProductFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Product
     * 
    **/
    select?: ProductSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductInclude | null
    /**
     * Filter, which Product to fetch.
     * 
    **/
    where: ProductWhereUniqueInput
  }

  /**
   * Product: findUnique
   */
  export interface ProductFindUniqueArgs extends ProductFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Product base type for findFirst actions
   */
  export type ProductFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Product
     * 
    **/
    select?: ProductSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductInclude | null
    /**
     * Filter, which Product to fetch.
     * 
    **/
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     * 
    **/
    orderBy?: Enumerable<ProductOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     * 
    **/
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     * 
    **/
    distinct?: Enumerable<ProductScalarFieldEnum>
  }

  /**
   * Product: findFirst
   */
  export interface ProductFindFirstArgs extends ProductFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Product findMany
   */
  export type ProductFindManyArgs = {
    /**
     * Select specific fields to fetch from the Product
     * 
    **/
    select?: ProductSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductInclude | null
    /**
     * Filter, which Products to fetch.
     * 
    **/
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     * 
    **/
    orderBy?: Enumerable<ProductOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     * 
    **/
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ProductScalarFieldEnum>
  }


  /**
   * Product create
   */
  export type ProductCreateArgs = {
    /**
     * Select specific fields to fetch from the Product
     * 
    **/
    select?: ProductSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductInclude | null
    /**
     * The data needed to create a Product.
     * 
    **/
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }


  /**
   * Product createMany
   */
  export type ProductCreateManyArgs = {
    /**
     * The data used to create many Products.
     * 
    **/
    data: Enumerable<ProductCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Product update
   */
  export type ProductUpdateArgs = {
    /**
     * Select specific fields to fetch from the Product
     * 
    **/
    select?: ProductSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductInclude | null
    /**
     * The data needed to update a Product.
     * 
    **/
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     * 
    **/
    where: ProductWhereUniqueInput
  }


  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs = {
    /**
     * The data used to update Products.
     * 
    **/
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     * 
    **/
    where?: ProductWhereInput
  }


  /**
   * Product upsert
   */
  export type ProductUpsertArgs = {
    /**
     * Select specific fields to fetch from the Product
     * 
    **/
    select?: ProductSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductInclude | null
    /**
     * The filter to search for the Product to update in case it exists.
     * 
    **/
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     * 
    **/
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }


  /**
   * Product delete
   */
  export type ProductDeleteArgs = {
    /**
     * Select specific fields to fetch from the Product
     * 
    **/
    select?: ProductSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductInclude | null
    /**
     * Filter which Product to delete.
     * 
    **/
    where: ProductWhereUniqueInput
  }


  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs = {
    /**
     * Filter which Products to delete
     * 
    **/
    where?: ProductWhereInput
  }


  /**
   * Product: findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs = ProductFindUniqueArgsBase
      

  /**
   * Product: findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs = ProductFindFirstArgsBase
      

  /**
   * Product without action
   */
  export type ProductArgs = {
    /**
     * Select specific fields to fetch from the Product
     * 
    **/
    select?: ProductSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductInclude | null
  }



  /**
   * Model ProductPrice
   */


  export type AggregateProductPrice = {
    _count: ProductPriceCountAggregateOutputType | null
    _avg: ProductPriceAvgAggregateOutputType | null
    _sum: ProductPriceSumAggregateOutputType | null
    _min: ProductPriceMinAggregateOutputType | null
    _max: ProductPriceMaxAggregateOutputType | null
  }

  export type ProductPriceAvgAggregateOutputType = {
    id: number | null
    amount: number | null
    productId: number | null
  }

  export type ProductPriceSumAggregateOutputType = {
    id: number | null
    amount: number | null
    productId: number | null
  }

  export type ProductPriceMinAggregateOutputType = {
    id: number | null
    amount: number | null
    currency: string | null
    productId: number | null
    createdAt: Date | null
  }

  export type ProductPriceMaxAggregateOutputType = {
    id: number | null
    amount: number | null
    currency: string | null
    productId: number | null
    createdAt: Date | null
  }

  export type ProductPriceCountAggregateOutputType = {
    id: number
    amount: number
    currency: number
    productId: number
    createdAt: number
    _all: number
  }


  export type ProductPriceAvgAggregateInputType = {
    id?: true
    amount?: true
    productId?: true
  }

  export type ProductPriceSumAggregateInputType = {
    id?: true
    amount?: true
    productId?: true
  }

  export type ProductPriceMinAggregateInputType = {
    id?: true
    amount?: true
    currency?: true
    productId?: true
    createdAt?: true
  }

  export type ProductPriceMaxAggregateInputType = {
    id?: true
    amount?: true
    currency?: true
    productId?: true
    createdAt?: true
  }

  export type ProductPriceCountAggregateInputType = {
    id?: true
    amount?: true
    currency?: true
    productId?: true
    createdAt?: true
    _all?: true
  }

  export type ProductPriceAggregateArgs = {
    /**
     * Filter which ProductPrice to aggregate.
     * 
    **/
    where?: ProductPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductPrices to fetch.
     * 
    **/
    orderBy?: Enumerable<ProductPriceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ProductPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductPrices from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductPrices.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductPrices
    **/
    _count?: true | ProductPriceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductPriceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductPriceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductPriceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductPriceMaxAggregateInputType
  }

  export type GetProductPriceAggregateType<T extends ProductPriceAggregateArgs> = {
        [P in keyof T & keyof AggregateProductPrice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductPrice[P]>
      : GetScalarType<T[P], AggregateProductPrice[P]>
  }




  export type ProductPriceGroupByArgs = {
    where?: ProductPriceWhereInput
    orderBy?: Enumerable<ProductPriceOrderByWithAggregationInput>
    by: Array<ProductPriceScalarFieldEnum>
    having?: ProductPriceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductPriceCountAggregateInputType | true
    _avg?: ProductPriceAvgAggregateInputType
    _sum?: ProductPriceSumAggregateInputType
    _min?: ProductPriceMinAggregateInputType
    _max?: ProductPriceMaxAggregateInputType
  }


  export type ProductPriceGroupByOutputType = {
    id: number
    amount: number
    currency: string
    productId: number
    createdAt: Date
    _count: ProductPriceCountAggregateOutputType | null
    _avg: ProductPriceAvgAggregateOutputType | null
    _sum: ProductPriceSumAggregateOutputType | null
    _min: ProductPriceMinAggregateOutputType | null
    _max: ProductPriceMaxAggregateOutputType | null
  }

  type GetProductPriceGroupByPayload<T extends ProductPriceGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ProductPriceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductPriceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductPriceGroupByOutputType[P]>
            : GetScalarType<T[P], ProductPriceGroupByOutputType[P]>
        }
      >
    >


  export type ProductPriceSelect = {
    id?: boolean
    amount?: boolean
    currency?: boolean
    productId?: boolean
    createdAt?: boolean
    product?: boolean | ProductArgs
  }

  export type ProductPriceInclude = {
    product?: boolean | ProductArgs
  }

  export type ProductPriceGetPayload<
    S extends boolean | null | undefined | ProductPriceArgs,
    U = keyof S
      > = S extends true
        ? ProductPrice
    : S extends undefined
    ? never
    : S extends ProductPriceArgs | ProductPriceFindManyArgs
    ?'include' extends U
    ? ProductPrice  & {
    [P in TrueKeys<S['include']>]:
        P extends 'product' ? ProductGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'product' ? ProductGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof ProductPrice ? ProductPrice[P] : never
  } 
    : ProductPrice
  : ProductPrice


  type ProductPriceCountArgs = Merge<
    Omit<ProductPriceFindManyArgs, 'select' | 'include'> & {
      select?: ProductPriceCountAggregateInputType | true
    }
  >

  export interface ProductPriceDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one ProductPrice that matches the filter.
     * @param {ProductPriceFindUniqueArgs} args - Arguments to find a ProductPrice
     * @example
     * // Get one ProductPrice
     * const productPrice = await prisma.productPrice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProductPriceFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProductPriceFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ProductPrice'> extends True ? CheckSelect<T, Prisma__ProductPriceClient<ProductPrice>, Prisma__ProductPriceClient<ProductPriceGetPayload<T>>> : CheckSelect<T, Prisma__ProductPriceClient<ProductPrice | null, null>, Prisma__ProductPriceClient<ProductPriceGetPayload<T> | null, null>>

    /**
     * Find the first ProductPrice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPriceFindFirstArgs} args - Arguments to find a ProductPrice
     * @example
     * // Get one ProductPrice
     * const productPrice = await prisma.productPrice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProductPriceFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProductPriceFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ProductPrice'> extends True ? CheckSelect<T, Prisma__ProductPriceClient<ProductPrice>, Prisma__ProductPriceClient<ProductPriceGetPayload<T>>> : CheckSelect<T, Prisma__ProductPriceClient<ProductPrice | null, null>, Prisma__ProductPriceClient<ProductPriceGetPayload<T> | null, null>>

    /**
     * Find zero or more ProductPrices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPriceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductPrices
     * const productPrices = await prisma.productPrice.findMany()
     * 
     * // Get first 10 ProductPrices
     * const productPrices = await prisma.productPrice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productPriceWithIdOnly = await prisma.productPrice.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProductPriceFindManyArgs>(
      args?: SelectSubset<T, ProductPriceFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ProductPrice>>, PrismaPromise<Array<ProductPriceGetPayload<T>>>>

    /**
     * Create a ProductPrice.
     * @param {ProductPriceCreateArgs} args - Arguments to create a ProductPrice.
     * @example
     * // Create one ProductPrice
     * const ProductPrice = await prisma.productPrice.create({
     *   data: {
     *     // ... data to create a ProductPrice
     *   }
     * })
     * 
    **/
    create<T extends ProductPriceCreateArgs>(
      args: SelectSubset<T, ProductPriceCreateArgs>
    ): CheckSelect<T, Prisma__ProductPriceClient<ProductPrice>, Prisma__ProductPriceClient<ProductPriceGetPayload<T>>>

    /**
     * Create many ProductPrices.
     *     @param {ProductPriceCreateManyArgs} args - Arguments to create many ProductPrices.
     *     @example
     *     // Create many ProductPrices
     *     const productPrice = await prisma.productPrice.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProductPriceCreateManyArgs>(
      args?: SelectSubset<T, ProductPriceCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ProductPrice.
     * @param {ProductPriceDeleteArgs} args - Arguments to delete one ProductPrice.
     * @example
     * // Delete one ProductPrice
     * const ProductPrice = await prisma.productPrice.delete({
     *   where: {
     *     // ... filter to delete one ProductPrice
     *   }
     * })
     * 
    **/
    delete<T extends ProductPriceDeleteArgs>(
      args: SelectSubset<T, ProductPriceDeleteArgs>
    ): CheckSelect<T, Prisma__ProductPriceClient<ProductPrice>, Prisma__ProductPriceClient<ProductPriceGetPayload<T>>>

    /**
     * Update one ProductPrice.
     * @param {ProductPriceUpdateArgs} args - Arguments to update one ProductPrice.
     * @example
     * // Update one ProductPrice
     * const productPrice = await prisma.productPrice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProductPriceUpdateArgs>(
      args: SelectSubset<T, ProductPriceUpdateArgs>
    ): CheckSelect<T, Prisma__ProductPriceClient<ProductPrice>, Prisma__ProductPriceClient<ProductPriceGetPayload<T>>>

    /**
     * Delete zero or more ProductPrices.
     * @param {ProductPriceDeleteManyArgs} args - Arguments to filter ProductPrices to delete.
     * @example
     * // Delete a few ProductPrices
     * const { count } = await prisma.productPrice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProductPriceDeleteManyArgs>(
      args?: SelectSubset<T, ProductPriceDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductPrices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPriceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductPrices
     * const productPrice = await prisma.productPrice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProductPriceUpdateManyArgs>(
      args: SelectSubset<T, ProductPriceUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductPrice.
     * @param {ProductPriceUpsertArgs} args - Arguments to update or create a ProductPrice.
     * @example
     * // Update or create a ProductPrice
     * const productPrice = await prisma.productPrice.upsert({
     *   create: {
     *     // ... data to create a ProductPrice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductPrice we want to update
     *   }
     * })
    **/
    upsert<T extends ProductPriceUpsertArgs>(
      args: SelectSubset<T, ProductPriceUpsertArgs>
    ): CheckSelect<T, Prisma__ProductPriceClient<ProductPrice>, Prisma__ProductPriceClient<ProductPriceGetPayload<T>>>

    /**
     * Find one ProductPrice that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ProductPriceFindUniqueOrThrowArgs} args - Arguments to find a ProductPrice
     * @example
     * // Get one ProductPrice
     * const productPrice = await prisma.productPrice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProductPriceFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ProductPriceFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ProductPriceClient<ProductPrice>, Prisma__ProductPriceClient<ProductPriceGetPayload<T>>>

    /**
     * Find the first ProductPrice that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPriceFindFirstOrThrowArgs} args - Arguments to find a ProductPrice
     * @example
     * // Get one ProductPrice
     * const productPrice = await prisma.productPrice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProductPriceFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProductPriceFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ProductPriceClient<ProductPrice>, Prisma__ProductPriceClient<ProductPriceGetPayload<T>>>

    /**
     * Count the number of ProductPrices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPriceCountArgs} args - Arguments to filter ProductPrices to count.
     * @example
     * // Count the number of ProductPrices
     * const count = await prisma.productPrice.count({
     *   where: {
     *     // ... the filter for the ProductPrices we want to count
     *   }
     * })
    **/
    count<T extends ProductPriceCountArgs>(
      args?: Subset<T, ProductPriceCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductPriceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductPrice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPriceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductPriceAggregateArgs>(args: Subset<T, ProductPriceAggregateArgs>): PrismaPromise<GetProductPriceAggregateType<T>>

    /**
     * Group by ProductPrice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPriceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductPriceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductPriceGroupByArgs['orderBy'] }
        : { orderBy?: ProductPriceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductPriceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductPriceGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductPrice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProductPriceClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    product<T extends ProductArgs = {}>(args?: Subset<T, ProductArgs>): CheckSelect<T, Prisma__ProductClient<Product | Null>, Prisma__ProductClient<ProductGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * ProductPrice base type for findUnique actions
   */
  export type ProductPriceFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ProductPrice
     * 
    **/
    select?: ProductPriceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductPriceInclude | null
    /**
     * Filter, which ProductPrice to fetch.
     * 
    **/
    where: ProductPriceWhereUniqueInput
  }

  /**
   * ProductPrice: findUnique
   */
  export interface ProductPriceFindUniqueArgs extends ProductPriceFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ProductPrice base type for findFirst actions
   */
  export type ProductPriceFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ProductPrice
     * 
    **/
    select?: ProductPriceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductPriceInclude | null
    /**
     * Filter, which ProductPrice to fetch.
     * 
    **/
    where?: ProductPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductPrices to fetch.
     * 
    **/
    orderBy?: Enumerable<ProductPriceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductPrices.
     * 
    **/
    cursor?: ProductPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductPrices from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductPrices.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductPrices.
     * 
    **/
    distinct?: Enumerable<ProductPriceScalarFieldEnum>
  }

  /**
   * ProductPrice: findFirst
   */
  export interface ProductPriceFindFirstArgs extends ProductPriceFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ProductPrice findMany
   */
  export type ProductPriceFindManyArgs = {
    /**
     * Select specific fields to fetch from the ProductPrice
     * 
    **/
    select?: ProductPriceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductPriceInclude | null
    /**
     * Filter, which ProductPrices to fetch.
     * 
    **/
    where?: ProductPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductPrices to fetch.
     * 
    **/
    orderBy?: Enumerable<ProductPriceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductPrices.
     * 
    **/
    cursor?: ProductPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductPrices from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductPrices.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ProductPriceScalarFieldEnum>
  }


  /**
   * ProductPrice create
   */
  export type ProductPriceCreateArgs = {
    /**
     * Select specific fields to fetch from the ProductPrice
     * 
    **/
    select?: ProductPriceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductPriceInclude | null
    /**
     * The data needed to create a ProductPrice.
     * 
    **/
    data: XOR<ProductPriceCreateInput, ProductPriceUncheckedCreateInput>
  }


  /**
   * ProductPrice createMany
   */
  export type ProductPriceCreateManyArgs = {
    /**
     * The data used to create many ProductPrices.
     * 
    **/
    data: Enumerable<ProductPriceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ProductPrice update
   */
  export type ProductPriceUpdateArgs = {
    /**
     * Select specific fields to fetch from the ProductPrice
     * 
    **/
    select?: ProductPriceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductPriceInclude | null
    /**
     * The data needed to update a ProductPrice.
     * 
    **/
    data: XOR<ProductPriceUpdateInput, ProductPriceUncheckedUpdateInput>
    /**
     * Choose, which ProductPrice to update.
     * 
    **/
    where: ProductPriceWhereUniqueInput
  }


  /**
   * ProductPrice updateMany
   */
  export type ProductPriceUpdateManyArgs = {
    /**
     * The data used to update ProductPrices.
     * 
    **/
    data: XOR<ProductPriceUpdateManyMutationInput, ProductPriceUncheckedUpdateManyInput>
    /**
     * Filter which ProductPrices to update
     * 
    **/
    where?: ProductPriceWhereInput
  }


  /**
   * ProductPrice upsert
   */
  export type ProductPriceUpsertArgs = {
    /**
     * Select specific fields to fetch from the ProductPrice
     * 
    **/
    select?: ProductPriceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductPriceInclude | null
    /**
     * The filter to search for the ProductPrice to update in case it exists.
     * 
    **/
    where: ProductPriceWhereUniqueInput
    /**
     * In case the ProductPrice found by the `where` argument doesn't exist, create a new ProductPrice with this data.
     * 
    **/
    create: XOR<ProductPriceCreateInput, ProductPriceUncheckedCreateInput>
    /**
     * In case the ProductPrice was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ProductPriceUpdateInput, ProductPriceUncheckedUpdateInput>
  }


  /**
   * ProductPrice delete
   */
  export type ProductPriceDeleteArgs = {
    /**
     * Select specific fields to fetch from the ProductPrice
     * 
    **/
    select?: ProductPriceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductPriceInclude | null
    /**
     * Filter which ProductPrice to delete.
     * 
    **/
    where: ProductPriceWhereUniqueInput
  }


  /**
   * ProductPrice deleteMany
   */
  export type ProductPriceDeleteManyArgs = {
    /**
     * Filter which ProductPrices to delete
     * 
    **/
    where?: ProductPriceWhereInput
  }


  /**
   * ProductPrice: findUniqueOrThrow
   */
  export type ProductPriceFindUniqueOrThrowArgs = ProductPriceFindUniqueArgsBase
      

  /**
   * ProductPrice: findFirstOrThrow
   */
  export type ProductPriceFindFirstOrThrowArgs = ProductPriceFindFirstArgsBase
      

  /**
   * ProductPrice without action
   */
  export type ProductPriceArgs = {
    /**
     * Select specific fields to fetch from the ProductPrice
     * 
    **/
    select?: ProductPriceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductPriceInclude | null
  }



  /**
   * Model Brand
   */


  export type AggregateBrand = {
    _count: BrandCountAggregateOutputType | null
    _avg: BrandAvgAggregateOutputType | null
    _sum: BrandSumAggregateOutputType | null
    _min: BrandMinAggregateOutputType | null
    _max: BrandMaxAggregateOutputType | null
  }

  export type BrandAvgAggregateOutputType = {
    id: number | null
  }

  export type BrandSumAggregateOutputType = {
    id: number | null
  }

  export type BrandMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    url: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    slug: string | null
  }

  export type BrandMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    url: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    slug: string | null
  }

  export type BrandCountAggregateOutputType = {
    id: number
    name: number
    description: number
    url: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    slug: number
    _all: number
  }


  export type BrandAvgAggregateInputType = {
    id?: true
  }

  export type BrandSumAggregateInputType = {
    id?: true
  }

  export type BrandMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    url?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
  }

  export type BrandMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    url?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
  }

  export type BrandCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    url?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    slug?: true
    _all?: true
  }

  export type BrandAggregateArgs = {
    /**
     * Filter which Brand to aggregate.
     * 
    **/
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     * 
    **/
    orderBy?: Enumerable<BrandOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Brands
    **/
    _count?: true | BrandCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BrandAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BrandSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BrandMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BrandMaxAggregateInputType
  }

  export type GetBrandAggregateType<T extends BrandAggregateArgs> = {
        [P in keyof T & keyof AggregateBrand]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBrand[P]>
      : GetScalarType<T[P], AggregateBrand[P]>
  }




  export type BrandGroupByArgs = {
    where?: BrandWhereInput
    orderBy?: Enumerable<BrandOrderByWithAggregationInput>
    by: Array<BrandScalarFieldEnum>
    having?: BrandScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BrandCountAggregateInputType | true
    _avg?: BrandAvgAggregateInputType
    _sum?: BrandSumAggregateInputType
    _min?: BrandMinAggregateInputType
    _max?: BrandMaxAggregateInputType
  }


  export type BrandGroupByOutputType = {
    id: number
    name: string
    description: string
    url: string
    imageUrl: string
    createdAt: Date
    updatedAt: Date
    slug: string
    _count: BrandCountAggregateOutputType | null
    _avg: BrandAvgAggregateOutputType | null
    _sum: BrandSumAggregateOutputType | null
    _min: BrandMinAggregateOutputType | null
    _max: BrandMaxAggregateOutputType | null
  }

  type GetBrandGroupByPayload<T extends BrandGroupByArgs> = PrismaPromise<
    Array<
      PickArray<BrandGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BrandGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BrandGroupByOutputType[P]>
            : GetScalarType<T[P], BrandGroupByOutputType[P]>
        }
      >
    >


  export type BrandSelect = {
    id?: boolean
    name?: boolean
    description?: boolean
    url?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    slug?: boolean
    discs?: boolean | DiscFindManyArgs
    _count?: boolean | BrandCountOutputTypeArgs
  }

  export type BrandInclude = {
    discs?: boolean | DiscFindManyArgs
    _count?: boolean | BrandCountOutputTypeArgs
  }

  export type BrandGetPayload<
    S extends boolean | null | undefined | BrandArgs,
    U = keyof S
      > = S extends true
        ? Brand
    : S extends undefined
    ? never
    : S extends BrandArgs | BrandFindManyArgs
    ?'include' extends U
    ? Brand  & {
    [P in TrueKeys<S['include']>]:
        P extends 'discs' ? Array < DiscGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? BrandCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'discs' ? Array < DiscGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? BrandCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Brand ? Brand[P] : never
  } 
    : Brand
  : Brand


  type BrandCountArgs = Merge<
    Omit<BrandFindManyArgs, 'select' | 'include'> & {
      select?: BrandCountAggregateInputType | true
    }
  >

  export interface BrandDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Brand that matches the filter.
     * @param {BrandFindUniqueArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BrandFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, BrandFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Brand'> extends True ? CheckSelect<T, Prisma__BrandClient<Brand>, Prisma__BrandClient<BrandGetPayload<T>>> : CheckSelect<T, Prisma__BrandClient<Brand | null, null>, Prisma__BrandClient<BrandGetPayload<T> | null, null>>

    /**
     * Find the first Brand that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindFirstArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BrandFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, BrandFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Brand'> extends True ? CheckSelect<T, Prisma__BrandClient<Brand>, Prisma__BrandClient<BrandGetPayload<T>>> : CheckSelect<T, Prisma__BrandClient<Brand | null, null>, Prisma__BrandClient<BrandGetPayload<T> | null, null>>

    /**
     * Find zero or more Brands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Brands
     * const brands = await prisma.brand.findMany()
     * 
     * // Get first 10 Brands
     * const brands = await prisma.brand.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const brandWithIdOnly = await prisma.brand.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BrandFindManyArgs>(
      args?: SelectSubset<T, BrandFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Brand>>, PrismaPromise<Array<BrandGetPayload<T>>>>

    /**
     * Create a Brand.
     * @param {BrandCreateArgs} args - Arguments to create a Brand.
     * @example
     * // Create one Brand
     * const Brand = await prisma.brand.create({
     *   data: {
     *     // ... data to create a Brand
     *   }
     * })
     * 
    **/
    create<T extends BrandCreateArgs>(
      args: SelectSubset<T, BrandCreateArgs>
    ): CheckSelect<T, Prisma__BrandClient<Brand>, Prisma__BrandClient<BrandGetPayload<T>>>

    /**
     * Create many Brands.
     *     @param {BrandCreateManyArgs} args - Arguments to create many Brands.
     *     @example
     *     // Create many Brands
     *     const brand = await prisma.brand.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BrandCreateManyArgs>(
      args?: SelectSubset<T, BrandCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Brand.
     * @param {BrandDeleteArgs} args - Arguments to delete one Brand.
     * @example
     * // Delete one Brand
     * const Brand = await prisma.brand.delete({
     *   where: {
     *     // ... filter to delete one Brand
     *   }
     * })
     * 
    **/
    delete<T extends BrandDeleteArgs>(
      args: SelectSubset<T, BrandDeleteArgs>
    ): CheckSelect<T, Prisma__BrandClient<Brand>, Prisma__BrandClient<BrandGetPayload<T>>>

    /**
     * Update one Brand.
     * @param {BrandUpdateArgs} args - Arguments to update one Brand.
     * @example
     * // Update one Brand
     * const brand = await prisma.brand.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BrandUpdateArgs>(
      args: SelectSubset<T, BrandUpdateArgs>
    ): CheckSelect<T, Prisma__BrandClient<Brand>, Prisma__BrandClient<BrandGetPayload<T>>>

    /**
     * Delete zero or more Brands.
     * @param {BrandDeleteManyArgs} args - Arguments to filter Brands to delete.
     * @example
     * // Delete a few Brands
     * const { count } = await prisma.brand.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BrandDeleteManyArgs>(
      args?: SelectSubset<T, BrandDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Brands
     * const brand = await prisma.brand.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BrandUpdateManyArgs>(
      args: SelectSubset<T, BrandUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Brand.
     * @param {BrandUpsertArgs} args - Arguments to update or create a Brand.
     * @example
     * // Update or create a Brand
     * const brand = await prisma.brand.upsert({
     *   create: {
     *     // ... data to create a Brand
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Brand we want to update
     *   }
     * })
    **/
    upsert<T extends BrandUpsertArgs>(
      args: SelectSubset<T, BrandUpsertArgs>
    ): CheckSelect<T, Prisma__BrandClient<Brand>, Prisma__BrandClient<BrandGetPayload<T>>>

    /**
     * Find one Brand that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {BrandFindUniqueOrThrowArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends BrandFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, BrandFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__BrandClient<Brand>, Prisma__BrandClient<BrandGetPayload<T>>>

    /**
     * Find the first Brand that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindFirstOrThrowArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends BrandFindFirstOrThrowArgs>(
      args?: SelectSubset<T, BrandFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__BrandClient<Brand>, Prisma__BrandClient<BrandGetPayload<T>>>

    /**
     * Count the number of Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandCountArgs} args - Arguments to filter Brands to count.
     * @example
     * // Count the number of Brands
     * const count = await prisma.brand.count({
     *   where: {
     *     // ... the filter for the Brands we want to count
     *   }
     * })
    **/
    count<T extends BrandCountArgs>(
      args?: Subset<T, BrandCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BrandCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Brand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BrandAggregateArgs>(args: Subset<T, BrandAggregateArgs>): PrismaPromise<GetBrandAggregateType<T>>

    /**
     * Group by Brand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BrandGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BrandGroupByArgs['orderBy'] }
        : { orderBy?: BrandGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BrandGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBrandGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Brand.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__BrandClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    discs<T extends DiscFindManyArgs = {}>(args?: Subset<T, DiscFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Disc>| Null>, PrismaPromise<Array<DiscGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Brand base type for findUnique actions
   */
  export type BrandFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Brand
     * 
    **/
    select?: BrandSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BrandInclude | null
    /**
     * Filter, which Brand to fetch.
     * 
    **/
    where: BrandWhereUniqueInput
  }

  /**
   * Brand: findUnique
   */
  export interface BrandFindUniqueArgs extends BrandFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Brand base type for findFirst actions
   */
  export type BrandFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Brand
     * 
    **/
    select?: BrandSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BrandInclude | null
    /**
     * Filter, which Brand to fetch.
     * 
    **/
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     * 
    **/
    orderBy?: Enumerable<BrandOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Brands.
     * 
    **/
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Brands.
     * 
    **/
    distinct?: Enumerable<BrandScalarFieldEnum>
  }

  /**
   * Brand: findFirst
   */
  export interface BrandFindFirstArgs extends BrandFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Brand findMany
   */
  export type BrandFindManyArgs = {
    /**
     * Select specific fields to fetch from the Brand
     * 
    **/
    select?: BrandSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BrandInclude | null
    /**
     * Filter, which Brands to fetch.
     * 
    **/
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     * 
    **/
    orderBy?: Enumerable<BrandOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Brands.
     * 
    **/
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     * 
    **/
    skip?: number
    distinct?: Enumerable<BrandScalarFieldEnum>
  }


  /**
   * Brand create
   */
  export type BrandCreateArgs = {
    /**
     * Select specific fields to fetch from the Brand
     * 
    **/
    select?: BrandSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BrandInclude | null
    /**
     * The data needed to create a Brand.
     * 
    **/
    data: XOR<BrandCreateInput, BrandUncheckedCreateInput>
  }


  /**
   * Brand createMany
   */
  export type BrandCreateManyArgs = {
    /**
     * The data used to create many Brands.
     * 
    **/
    data: Enumerable<BrandCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Brand update
   */
  export type BrandUpdateArgs = {
    /**
     * Select specific fields to fetch from the Brand
     * 
    **/
    select?: BrandSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BrandInclude | null
    /**
     * The data needed to update a Brand.
     * 
    **/
    data: XOR<BrandUpdateInput, BrandUncheckedUpdateInput>
    /**
     * Choose, which Brand to update.
     * 
    **/
    where: BrandWhereUniqueInput
  }


  /**
   * Brand updateMany
   */
  export type BrandUpdateManyArgs = {
    /**
     * The data used to update Brands.
     * 
    **/
    data: XOR<BrandUpdateManyMutationInput, BrandUncheckedUpdateManyInput>
    /**
     * Filter which Brands to update
     * 
    **/
    where?: BrandWhereInput
  }


  /**
   * Brand upsert
   */
  export type BrandUpsertArgs = {
    /**
     * Select specific fields to fetch from the Brand
     * 
    **/
    select?: BrandSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BrandInclude | null
    /**
     * The filter to search for the Brand to update in case it exists.
     * 
    **/
    where: BrandWhereUniqueInput
    /**
     * In case the Brand found by the `where` argument doesn't exist, create a new Brand with this data.
     * 
    **/
    create: XOR<BrandCreateInput, BrandUncheckedCreateInput>
    /**
     * In case the Brand was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<BrandUpdateInput, BrandUncheckedUpdateInput>
  }


  /**
   * Brand delete
   */
  export type BrandDeleteArgs = {
    /**
     * Select specific fields to fetch from the Brand
     * 
    **/
    select?: BrandSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BrandInclude | null
    /**
     * Filter which Brand to delete.
     * 
    **/
    where: BrandWhereUniqueInput
  }


  /**
   * Brand deleteMany
   */
  export type BrandDeleteManyArgs = {
    /**
     * Filter which Brands to delete
     * 
    **/
    where?: BrandWhereInput
  }


  /**
   * Brand: findUniqueOrThrow
   */
  export type BrandFindUniqueOrThrowArgs = BrandFindUniqueArgsBase
      

  /**
   * Brand: findFirstOrThrow
   */
  export type BrandFindFirstOrThrowArgs = BrandFindFirstArgsBase
      

  /**
   * Brand without action
   */
  export type BrandArgs = {
    /**
     * Select specific fields to fetch from the Brand
     * 
    **/
    select?: BrandSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BrandInclude | null
  }



  /**
   * Model Disc
   */


  export type AggregateDisc = {
    _count: DiscCountAggregateOutputType | null
    _avg: DiscAvgAggregateOutputType | null
    _sum: DiscSumAggregateOutputType | null
    _min: DiscMinAggregateOutputType | null
    _max: DiscMaxAggregateOutputType | null
  }

  export type DiscAvgAggregateOutputType = {
    id: number | null
    speed: number | null
    glide: number | null
    turn: number | null
    fade: number | null
    brandId: number | null
    views: number | null
  }

  export type DiscSumAggregateOutputType = {
    id: number | null
    speed: number | null
    glide: number | null
    turn: number | null
    fade: number | null
    brandId: number | null
    views: number | null
  }

  export type DiscMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    imageUrl: string | null
    speed: number | null
    glide: number | null
    turn: number | null
    fade: number | null
    brandId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    type: string | null
    slug: string | null
    views: number | null
  }

  export type DiscMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    imageUrl: string | null
    speed: number | null
    glide: number | null
    turn: number | null
    fade: number | null
    brandId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    type: string | null
    slug: string | null
    views: number | null
  }

  export type DiscCountAggregateOutputType = {
    id: number
    name: number
    description: number
    imageUrl: number
    speed: number
    glide: number
    turn: number
    fade: number
    brandId: number
    createdAt: number
    updatedAt: number
    type: number
    slug: number
    views: number
    _all: number
  }


  export type DiscAvgAggregateInputType = {
    id?: true
    speed?: true
    glide?: true
    turn?: true
    fade?: true
    brandId?: true
    views?: true
  }

  export type DiscSumAggregateInputType = {
    id?: true
    speed?: true
    glide?: true
    turn?: true
    fade?: true
    brandId?: true
    views?: true
  }

  export type DiscMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    imageUrl?: true
    speed?: true
    glide?: true
    turn?: true
    fade?: true
    brandId?: true
    createdAt?: true
    updatedAt?: true
    type?: true
    slug?: true
    views?: true
  }

  export type DiscMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    imageUrl?: true
    speed?: true
    glide?: true
    turn?: true
    fade?: true
    brandId?: true
    createdAt?: true
    updatedAt?: true
    type?: true
    slug?: true
    views?: true
  }

  export type DiscCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    imageUrl?: true
    speed?: true
    glide?: true
    turn?: true
    fade?: true
    brandId?: true
    createdAt?: true
    updatedAt?: true
    type?: true
    slug?: true
    views?: true
    _all?: true
  }

  export type DiscAggregateArgs = {
    /**
     * Filter which Disc to aggregate.
     * 
    **/
    where?: DiscWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Discs to fetch.
     * 
    **/
    orderBy?: Enumerable<DiscOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DiscWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Discs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Discs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Discs
    **/
    _count?: true | DiscCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DiscAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DiscSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DiscMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DiscMaxAggregateInputType
  }

  export type GetDiscAggregateType<T extends DiscAggregateArgs> = {
        [P in keyof T & keyof AggregateDisc]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDisc[P]>
      : GetScalarType<T[P], AggregateDisc[P]>
  }




  export type DiscGroupByArgs = {
    where?: DiscWhereInput
    orderBy?: Enumerable<DiscOrderByWithAggregationInput>
    by: Array<DiscScalarFieldEnum>
    having?: DiscScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DiscCountAggregateInputType | true
    _avg?: DiscAvgAggregateInputType
    _sum?: DiscSumAggregateInputType
    _min?: DiscMinAggregateInputType
    _max?: DiscMaxAggregateInputType
  }


  export type DiscGroupByOutputType = {
    id: number
    name: string
    description: string
    imageUrl: string
    speed: number
    glide: number
    turn: number
    fade: number
    brandId: number
    createdAt: Date
    updatedAt: Date
    type: string
    slug: string
    views: number
    _count: DiscCountAggregateOutputType | null
    _avg: DiscAvgAggregateOutputType | null
    _sum: DiscSumAggregateOutputType | null
    _min: DiscMinAggregateOutputType | null
    _max: DiscMaxAggregateOutputType | null
  }

  type GetDiscGroupByPayload<T extends DiscGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DiscGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DiscGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DiscGroupByOutputType[P]>
            : GetScalarType<T[P], DiscGroupByOutputType[P]>
        }
      >
    >


  export type DiscSelect = {
    id?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    speed?: boolean
    glide?: boolean
    turn?: boolean
    fade?: boolean
    brandId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    type?: boolean
    slug?: boolean
    brand?: boolean | BrandArgs
    products?: boolean | ProductFindManyArgs
    users?: boolean | UserDiscFavoritesFindManyArgs
    views?: boolean
    _count?: boolean | DiscCountOutputTypeArgs
  }

  export type DiscInclude = {
    brand?: boolean | BrandArgs
    products?: boolean | ProductFindManyArgs
    users?: boolean | UserDiscFavoritesFindManyArgs
    _count?: boolean | DiscCountOutputTypeArgs
  }

  export type DiscGetPayload<
    S extends boolean | null | undefined | DiscArgs,
    U = keyof S
      > = S extends true
        ? Disc
    : S extends undefined
    ? never
    : S extends DiscArgs | DiscFindManyArgs
    ?'include' extends U
    ? Disc  & {
    [P in TrueKeys<S['include']>]:
        P extends 'brand' ? BrandGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'products' ? Array < ProductGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'users' ? Array < UserDiscFavoritesGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? DiscCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'brand' ? BrandGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'products' ? Array < ProductGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'users' ? Array < UserDiscFavoritesGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? DiscCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Disc ? Disc[P] : never
  } 
    : Disc
  : Disc


  type DiscCountArgs = Merge<
    Omit<DiscFindManyArgs, 'select' | 'include'> & {
      select?: DiscCountAggregateInputType | true
    }
  >

  export interface DiscDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Disc that matches the filter.
     * @param {DiscFindUniqueArgs} args - Arguments to find a Disc
     * @example
     * // Get one Disc
     * const disc = await prisma.disc.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DiscFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DiscFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Disc'> extends True ? CheckSelect<T, Prisma__DiscClient<Disc>, Prisma__DiscClient<DiscGetPayload<T>>> : CheckSelect<T, Prisma__DiscClient<Disc | null, null>, Prisma__DiscClient<DiscGetPayload<T> | null, null>>

    /**
     * Find the first Disc that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscFindFirstArgs} args - Arguments to find a Disc
     * @example
     * // Get one Disc
     * const disc = await prisma.disc.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DiscFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DiscFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Disc'> extends True ? CheckSelect<T, Prisma__DiscClient<Disc>, Prisma__DiscClient<DiscGetPayload<T>>> : CheckSelect<T, Prisma__DiscClient<Disc | null, null>, Prisma__DiscClient<DiscGetPayload<T> | null, null>>

    /**
     * Find zero or more Discs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Discs
     * const discs = await prisma.disc.findMany()
     * 
     * // Get first 10 Discs
     * const discs = await prisma.disc.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const discWithIdOnly = await prisma.disc.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DiscFindManyArgs>(
      args?: SelectSubset<T, DiscFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Disc>>, PrismaPromise<Array<DiscGetPayload<T>>>>

    /**
     * Create a Disc.
     * @param {DiscCreateArgs} args - Arguments to create a Disc.
     * @example
     * // Create one Disc
     * const Disc = await prisma.disc.create({
     *   data: {
     *     // ... data to create a Disc
     *   }
     * })
     * 
    **/
    create<T extends DiscCreateArgs>(
      args: SelectSubset<T, DiscCreateArgs>
    ): CheckSelect<T, Prisma__DiscClient<Disc>, Prisma__DiscClient<DiscGetPayload<T>>>

    /**
     * Create many Discs.
     *     @param {DiscCreateManyArgs} args - Arguments to create many Discs.
     *     @example
     *     // Create many Discs
     *     const disc = await prisma.disc.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DiscCreateManyArgs>(
      args?: SelectSubset<T, DiscCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Disc.
     * @param {DiscDeleteArgs} args - Arguments to delete one Disc.
     * @example
     * // Delete one Disc
     * const Disc = await prisma.disc.delete({
     *   where: {
     *     // ... filter to delete one Disc
     *   }
     * })
     * 
    **/
    delete<T extends DiscDeleteArgs>(
      args: SelectSubset<T, DiscDeleteArgs>
    ): CheckSelect<T, Prisma__DiscClient<Disc>, Prisma__DiscClient<DiscGetPayload<T>>>

    /**
     * Update one Disc.
     * @param {DiscUpdateArgs} args - Arguments to update one Disc.
     * @example
     * // Update one Disc
     * const disc = await prisma.disc.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DiscUpdateArgs>(
      args: SelectSubset<T, DiscUpdateArgs>
    ): CheckSelect<T, Prisma__DiscClient<Disc>, Prisma__DiscClient<DiscGetPayload<T>>>

    /**
     * Delete zero or more Discs.
     * @param {DiscDeleteManyArgs} args - Arguments to filter Discs to delete.
     * @example
     * // Delete a few Discs
     * const { count } = await prisma.disc.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DiscDeleteManyArgs>(
      args?: SelectSubset<T, DiscDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Discs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Discs
     * const disc = await prisma.disc.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DiscUpdateManyArgs>(
      args: SelectSubset<T, DiscUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Disc.
     * @param {DiscUpsertArgs} args - Arguments to update or create a Disc.
     * @example
     * // Update or create a Disc
     * const disc = await prisma.disc.upsert({
     *   create: {
     *     // ... data to create a Disc
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Disc we want to update
     *   }
     * })
    **/
    upsert<T extends DiscUpsertArgs>(
      args: SelectSubset<T, DiscUpsertArgs>
    ): CheckSelect<T, Prisma__DiscClient<Disc>, Prisma__DiscClient<DiscGetPayload<T>>>

    /**
     * Find one Disc that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {DiscFindUniqueOrThrowArgs} args - Arguments to find a Disc
     * @example
     * // Get one Disc
     * const disc = await prisma.disc.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DiscFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DiscFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__DiscClient<Disc>, Prisma__DiscClient<DiscGetPayload<T>>>

    /**
     * Find the first Disc that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscFindFirstOrThrowArgs} args - Arguments to find a Disc
     * @example
     * // Get one Disc
     * const disc = await prisma.disc.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DiscFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DiscFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__DiscClient<Disc>, Prisma__DiscClient<DiscGetPayload<T>>>

    /**
     * Count the number of Discs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscCountArgs} args - Arguments to filter Discs to count.
     * @example
     * // Count the number of Discs
     * const count = await prisma.disc.count({
     *   where: {
     *     // ... the filter for the Discs we want to count
     *   }
     * })
    **/
    count<T extends DiscCountArgs>(
      args?: Subset<T, DiscCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DiscCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Disc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DiscAggregateArgs>(args: Subset<T, DiscAggregateArgs>): PrismaPromise<GetDiscAggregateType<T>>

    /**
     * Group by Disc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DiscGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DiscGroupByArgs['orderBy'] }
        : { orderBy?: DiscGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DiscGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiscGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Disc.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DiscClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    brand<T extends BrandArgs = {}>(args?: Subset<T, BrandArgs>): CheckSelect<T, Prisma__BrandClient<Brand | Null>, Prisma__BrandClient<BrandGetPayload<T> | Null>>;

    products<T extends ProductFindManyArgs = {}>(args?: Subset<T, ProductFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Product>| Null>, PrismaPromise<Array<ProductGetPayload<T>>| Null>>;

    users<T extends UserDiscFavoritesFindManyArgs = {}>(args?: Subset<T, UserDiscFavoritesFindManyArgs>): CheckSelect<T, PrismaPromise<Array<UserDiscFavorites>| Null>, PrismaPromise<Array<UserDiscFavoritesGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Disc base type for findUnique actions
   */
  export type DiscFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Disc
     * 
    **/
    select?: DiscSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DiscInclude | null
    /**
     * Filter, which Disc to fetch.
     * 
    **/
    where: DiscWhereUniqueInput
  }

  /**
   * Disc: findUnique
   */
  export interface DiscFindUniqueArgs extends DiscFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Disc base type for findFirst actions
   */
  export type DiscFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Disc
     * 
    **/
    select?: DiscSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DiscInclude | null
    /**
     * Filter, which Disc to fetch.
     * 
    **/
    where?: DiscWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Discs to fetch.
     * 
    **/
    orderBy?: Enumerable<DiscOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Discs.
     * 
    **/
    cursor?: DiscWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Discs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Discs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Discs.
     * 
    **/
    distinct?: Enumerable<DiscScalarFieldEnum>
  }

  /**
   * Disc: findFirst
   */
  export interface DiscFindFirstArgs extends DiscFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Disc findMany
   */
  export type DiscFindManyArgs = {
    /**
     * Select specific fields to fetch from the Disc
     * 
    **/
    select?: DiscSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DiscInclude | null
    /**
     * Filter, which Discs to fetch.
     * 
    **/
    where?: DiscWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Discs to fetch.
     * 
    **/
    orderBy?: Enumerable<DiscOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Discs.
     * 
    **/
    cursor?: DiscWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Discs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Discs.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DiscScalarFieldEnum>
  }


  /**
   * Disc create
   */
  export type DiscCreateArgs = {
    /**
     * Select specific fields to fetch from the Disc
     * 
    **/
    select?: DiscSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DiscInclude | null
    /**
     * The data needed to create a Disc.
     * 
    **/
    data: XOR<DiscCreateInput, DiscUncheckedCreateInput>
  }


  /**
   * Disc createMany
   */
  export type DiscCreateManyArgs = {
    /**
     * The data used to create many Discs.
     * 
    **/
    data: Enumerable<DiscCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Disc update
   */
  export type DiscUpdateArgs = {
    /**
     * Select specific fields to fetch from the Disc
     * 
    **/
    select?: DiscSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DiscInclude | null
    /**
     * The data needed to update a Disc.
     * 
    **/
    data: XOR<DiscUpdateInput, DiscUncheckedUpdateInput>
    /**
     * Choose, which Disc to update.
     * 
    **/
    where: DiscWhereUniqueInput
  }


  /**
   * Disc updateMany
   */
  export type DiscUpdateManyArgs = {
    /**
     * The data used to update Discs.
     * 
    **/
    data: XOR<DiscUpdateManyMutationInput, DiscUncheckedUpdateManyInput>
    /**
     * Filter which Discs to update
     * 
    **/
    where?: DiscWhereInput
  }


  /**
   * Disc upsert
   */
  export type DiscUpsertArgs = {
    /**
     * Select specific fields to fetch from the Disc
     * 
    **/
    select?: DiscSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DiscInclude | null
    /**
     * The filter to search for the Disc to update in case it exists.
     * 
    **/
    where: DiscWhereUniqueInput
    /**
     * In case the Disc found by the `where` argument doesn't exist, create a new Disc with this data.
     * 
    **/
    create: XOR<DiscCreateInput, DiscUncheckedCreateInput>
    /**
     * In case the Disc was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DiscUpdateInput, DiscUncheckedUpdateInput>
  }


  /**
   * Disc delete
   */
  export type DiscDeleteArgs = {
    /**
     * Select specific fields to fetch from the Disc
     * 
    **/
    select?: DiscSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DiscInclude | null
    /**
     * Filter which Disc to delete.
     * 
    **/
    where: DiscWhereUniqueInput
  }


  /**
   * Disc deleteMany
   */
  export type DiscDeleteManyArgs = {
    /**
     * Filter which Discs to delete
     * 
    **/
    where?: DiscWhereInput
  }


  /**
   * Disc: findUniqueOrThrow
   */
  export type DiscFindUniqueOrThrowArgs = DiscFindUniqueArgsBase
      

  /**
   * Disc: findFirstOrThrow
   */
  export type DiscFindFirstOrThrowArgs = DiscFindFirstArgsBase
      

  /**
   * Disc without action
   */
  export type DiscArgs = {
    /**
     * Select specific fields to fetch from the Disc
     * 
    **/
    select?: DiscSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DiscInclude | null
  }



  /**
   * Model UserDiscFavorites
   */


  export type AggregateUserDiscFavorites = {
    _count: UserDiscFavoritesCountAggregateOutputType | null
    _avg: UserDiscFavoritesAvgAggregateOutputType | null
    _sum: UserDiscFavoritesSumAggregateOutputType | null
    _min: UserDiscFavoritesMinAggregateOutputType | null
    _max: UserDiscFavoritesMaxAggregateOutputType | null
  }

  export type UserDiscFavoritesAvgAggregateOutputType = {
    discId: number | null
  }

  export type UserDiscFavoritesSumAggregateOutputType = {
    discId: number | null
  }

  export type UserDiscFavoritesMinAggregateOutputType = {
    discId: number | null
    userId: string | null
  }

  export type UserDiscFavoritesMaxAggregateOutputType = {
    discId: number | null
    userId: string | null
  }

  export type UserDiscFavoritesCountAggregateOutputType = {
    discId: number
    userId: number
    _all: number
  }


  export type UserDiscFavoritesAvgAggregateInputType = {
    discId?: true
  }

  export type UserDiscFavoritesSumAggregateInputType = {
    discId?: true
  }

  export type UserDiscFavoritesMinAggregateInputType = {
    discId?: true
    userId?: true
  }

  export type UserDiscFavoritesMaxAggregateInputType = {
    discId?: true
    userId?: true
  }

  export type UserDiscFavoritesCountAggregateInputType = {
    discId?: true
    userId?: true
    _all?: true
  }

  export type UserDiscFavoritesAggregateArgs = {
    /**
     * Filter which UserDiscFavorites to aggregate.
     * 
    **/
    where?: UserDiscFavoritesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDiscFavorites to fetch.
     * 
    **/
    orderBy?: Enumerable<UserDiscFavoritesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserDiscFavoritesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDiscFavorites from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDiscFavorites.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserDiscFavorites
    **/
    _count?: true | UserDiscFavoritesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserDiscFavoritesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserDiscFavoritesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserDiscFavoritesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserDiscFavoritesMaxAggregateInputType
  }

  export type GetUserDiscFavoritesAggregateType<T extends UserDiscFavoritesAggregateArgs> = {
        [P in keyof T & keyof AggregateUserDiscFavorites]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserDiscFavorites[P]>
      : GetScalarType<T[P], AggregateUserDiscFavorites[P]>
  }




  export type UserDiscFavoritesGroupByArgs = {
    where?: UserDiscFavoritesWhereInput
    orderBy?: Enumerable<UserDiscFavoritesOrderByWithAggregationInput>
    by: Array<UserDiscFavoritesScalarFieldEnum>
    having?: UserDiscFavoritesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserDiscFavoritesCountAggregateInputType | true
    _avg?: UserDiscFavoritesAvgAggregateInputType
    _sum?: UserDiscFavoritesSumAggregateInputType
    _min?: UserDiscFavoritesMinAggregateInputType
    _max?: UserDiscFavoritesMaxAggregateInputType
  }


  export type UserDiscFavoritesGroupByOutputType = {
    discId: number
    userId: string
    _count: UserDiscFavoritesCountAggregateOutputType | null
    _avg: UserDiscFavoritesAvgAggregateOutputType | null
    _sum: UserDiscFavoritesSumAggregateOutputType | null
    _min: UserDiscFavoritesMinAggregateOutputType | null
    _max: UserDiscFavoritesMaxAggregateOutputType | null
  }

  type GetUserDiscFavoritesGroupByPayload<T extends UserDiscFavoritesGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserDiscFavoritesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserDiscFavoritesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserDiscFavoritesGroupByOutputType[P]>
            : GetScalarType<T[P], UserDiscFavoritesGroupByOutputType[P]>
        }
      >
    >


  export type UserDiscFavoritesSelect = {
    disc?: boolean | DiscArgs
    discId?: boolean
    User?: boolean | UserArgs
    userId?: boolean
  }

  export type UserDiscFavoritesInclude = {
    disc?: boolean | DiscArgs
    User?: boolean | UserArgs
  }

  export type UserDiscFavoritesGetPayload<
    S extends boolean | null | undefined | UserDiscFavoritesArgs,
    U = keyof S
      > = S extends true
        ? UserDiscFavorites
    : S extends undefined
    ? never
    : S extends UserDiscFavoritesArgs | UserDiscFavoritesFindManyArgs
    ?'include' extends U
    ? UserDiscFavorites  & {
    [P in TrueKeys<S['include']>]:
        P extends 'disc' ? DiscGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'User' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'disc' ? DiscGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'User' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof UserDiscFavorites ? UserDiscFavorites[P] : never
  } 
    : UserDiscFavorites
  : UserDiscFavorites


  type UserDiscFavoritesCountArgs = Merge<
    Omit<UserDiscFavoritesFindManyArgs, 'select' | 'include'> & {
      select?: UserDiscFavoritesCountAggregateInputType | true
    }
  >

  export interface UserDiscFavoritesDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one UserDiscFavorites that matches the filter.
     * @param {UserDiscFavoritesFindUniqueArgs} args - Arguments to find a UserDiscFavorites
     * @example
     * // Get one UserDiscFavorites
     * const userDiscFavorites = await prisma.userDiscFavorites.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserDiscFavoritesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserDiscFavoritesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'UserDiscFavorites'> extends True ? CheckSelect<T, Prisma__UserDiscFavoritesClient<UserDiscFavorites>, Prisma__UserDiscFavoritesClient<UserDiscFavoritesGetPayload<T>>> : CheckSelect<T, Prisma__UserDiscFavoritesClient<UserDiscFavorites | null, null>, Prisma__UserDiscFavoritesClient<UserDiscFavoritesGetPayload<T> | null, null>>

    /**
     * Find the first UserDiscFavorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDiscFavoritesFindFirstArgs} args - Arguments to find a UserDiscFavorites
     * @example
     * // Get one UserDiscFavorites
     * const userDiscFavorites = await prisma.userDiscFavorites.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserDiscFavoritesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserDiscFavoritesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'UserDiscFavorites'> extends True ? CheckSelect<T, Prisma__UserDiscFavoritesClient<UserDiscFavorites>, Prisma__UserDiscFavoritesClient<UserDiscFavoritesGetPayload<T>>> : CheckSelect<T, Prisma__UserDiscFavoritesClient<UserDiscFavorites | null, null>, Prisma__UserDiscFavoritesClient<UserDiscFavoritesGetPayload<T> | null, null>>

    /**
     * Find zero or more UserDiscFavorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDiscFavoritesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserDiscFavorites
     * const userDiscFavorites = await prisma.userDiscFavorites.findMany()
     * 
     * // Get first 10 UserDiscFavorites
     * const userDiscFavorites = await prisma.userDiscFavorites.findMany({ take: 10 })
     * 
     * // Only select the `discId`
     * const userDiscFavoritesWithDiscIdOnly = await prisma.userDiscFavorites.findMany({ select: { discId: true } })
     * 
    **/
    findMany<T extends UserDiscFavoritesFindManyArgs>(
      args?: SelectSubset<T, UserDiscFavoritesFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<UserDiscFavorites>>, PrismaPromise<Array<UserDiscFavoritesGetPayload<T>>>>

    /**
     * Create a UserDiscFavorites.
     * @param {UserDiscFavoritesCreateArgs} args - Arguments to create a UserDiscFavorites.
     * @example
     * // Create one UserDiscFavorites
     * const UserDiscFavorites = await prisma.userDiscFavorites.create({
     *   data: {
     *     // ... data to create a UserDiscFavorites
     *   }
     * })
     * 
    **/
    create<T extends UserDiscFavoritesCreateArgs>(
      args: SelectSubset<T, UserDiscFavoritesCreateArgs>
    ): CheckSelect<T, Prisma__UserDiscFavoritesClient<UserDiscFavorites>, Prisma__UserDiscFavoritesClient<UserDiscFavoritesGetPayload<T>>>

    /**
     * Create many UserDiscFavorites.
     *     @param {UserDiscFavoritesCreateManyArgs} args - Arguments to create many UserDiscFavorites.
     *     @example
     *     // Create many UserDiscFavorites
     *     const userDiscFavorites = await prisma.userDiscFavorites.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserDiscFavoritesCreateManyArgs>(
      args?: SelectSubset<T, UserDiscFavoritesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a UserDiscFavorites.
     * @param {UserDiscFavoritesDeleteArgs} args - Arguments to delete one UserDiscFavorites.
     * @example
     * // Delete one UserDiscFavorites
     * const UserDiscFavorites = await prisma.userDiscFavorites.delete({
     *   where: {
     *     // ... filter to delete one UserDiscFavorites
     *   }
     * })
     * 
    **/
    delete<T extends UserDiscFavoritesDeleteArgs>(
      args: SelectSubset<T, UserDiscFavoritesDeleteArgs>
    ): CheckSelect<T, Prisma__UserDiscFavoritesClient<UserDiscFavorites>, Prisma__UserDiscFavoritesClient<UserDiscFavoritesGetPayload<T>>>

    /**
     * Update one UserDiscFavorites.
     * @param {UserDiscFavoritesUpdateArgs} args - Arguments to update one UserDiscFavorites.
     * @example
     * // Update one UserDiscFavorites
     * const userDiscFavorites = await prisma.userDiscFavorites.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserDiscFavoritesUpdateArgs>(
      args: SelectSubset<T, UserDiscFavoritesUpdateArgs>
    ): CheckSelect<T, Prisma__UserDiscFavoritesClient<UserDiscFavorites>, Prisma__UserDiscFavoritesClient<UserDiscFavoritesGetPayload<T>>>

    /**
     * Delete zero or more UserDiscFavorites.
     * @param {UserDiscFavoritesDeleteManyArgs} args - Arguments to filter UserDiscFavorites to delete.
     * @example
     * // Delete a few UserDiscFavorites
     * const { count } = await prisma.userDiscFavorites.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDiscFavoritesDeleteManyArgs>(
      args?: SelectSubset<T, UserDiscFavoritesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDiscFavorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDiscFavoritesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserDiscFavorites
     * const userDiscFavorites = await prisma.userDiscFavorites.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserDiscFavoritesUpdateManyArgs>(
      args: SelectSubset<T, UserDiscFavoritesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one UserDiscFavorites.
     * @param {UserDiscFavoritesUpsertArgs} args - Arguments to update or create a UserDiscFavorites.
     * @example
     * // Update or create a UserDiscFavorites
     * const userDiscFavorites = await prisma.userDiscFavorites.upsert({
     *   create: {
     *     // ... data to create a UserDiscFavorites
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserDiscFavorites we want to update
     *   }
     * })
    **/
    upsert<T extends UserDiscFavoritesUpsertArgs>(
      args: SelectSubset<T, UserDiscFavoritesUpsertArgs>
    ): CheckSelect<T, Prisma__UserDiscFavoritesClient<UserDiscFavorites>, Prisma__UserDiscFavoritesClient<UserDiscFavoritesGetPayload<T>>>

    /**
     * Find one UserDiscFavorites that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UserDiscFavoritesFindUniqueOrThrowArgs} args - Arguments to find a UserDiscFavorites
     * @example
     * // Get one UserDiscFavorites
     * const userDiscFavorites = await prisma.userDiscFavorites.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserDiscFavoritesFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserDiscFavoritesFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__UserDiscFavoritesClient<UserDiscFavorites>, Prisma__UserDiscFavoritesClient<UserDiscFavoritesGetPayload<T>>>

    /**
     * Find the first UserDiscFavorites that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDiscFavoritesFindFirstOrThrowArgs} args - Arguments to find a UserDiscFavorites
     * @example
     * // Get one UserDiscFavorites
     * const userDiscFavorites = await prisma.userDiscFavorites.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserDiscFavoritesFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserDiscFavoritesFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__UserDiscFavoritesClient<UserDiscFavorites>, Prisma__UserDiscFavoritesClient<UserDiscFavoritesGetPayload<T>>>

    /**
     * Count the number of UserDiscFavorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDiscFavoritesCountArgs} args - Arguments to filter UserDiscFavorites to count.
     * @example
     * // Count the number of UserDiscFavorites
     * const count = await prisma.userDiscFavorites.count({
     *   where: {
     *     // ... the filter for the UserDiscFavorites we want to count
     *   }
     * })
    **/
    count<T extends UserDiscFavoritesCountArgs>(
      args?: Subset<T, UserDiscFavoritesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserDiscFavoritesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserDiscFavorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDiscFavoritesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserDiscFavoritesAggregateArgs>(args: Subset<T, UserDiscFavoritesAggregateArgs>): PrismaPromise<GetUserDiscFavoritesAggregateType<T>>

    /**
     * Group by UserDiscFavorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDiscFavoritesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserDiscFavoritesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserDiscFavoritesGroupByArgs['orderBy'] }
        : { orderBy?: UserDiscFavoritesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserDiscFavoritesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserDiscFavoritesGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for UserDiscFavorites.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserDiscFavoritesClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    disc<T extends DiscArgs = {}>(args?: Subset<T, DiscArgs>): CheckSelect<T, Prisma__DiscClient<Disc | Null>, Prisma__DiscClient<DiscGetPayload<T> | Null>>;

    User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * UserDiscFavorites base type for findUnique actions
   */
  export type UserDiscFavoritesFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the UserDiscFavorites
     * 
    **/
    select?: UserDiscFavoritesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserDiscFavoritesInclude | null
    /**
     * Filter, which UserDiscFavorites to fetch.
     * 
    **/
    where: UserDiscFavoritesWhereUniqueInput
  }

  /**
   * UserDiscFavorites: findUnique
   */
  export interface UserDiscFavoritesFindUniqueArgs extends UserDiscFavoritesFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserDiscFavorites base type for findFirst actions
   */
  export type UserDiscFavoritesFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the UserDiscFavorites
     * 
    **/
    select?: UserDiscFavoritesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserDiscFavoritesInclude | null
    /**
     * Filter, which UserDiscFavorites to fetch.
     * 
    **/
    where?: UserDiscFavoritesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDiscFavorites to fetch.
     * 
    **/
    orderBy?: Enumerable<UserDiscFavoritesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDiscFavorites.
     * 
    **/
    cursor?: UserDiscFavoritesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDiscFavorites from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDiscFavorites.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDiscFavorites.
     * 
    **/
    distinct?: Enumerable<UserDiscFavoritesScalarFieldEnum>
  }

  /**
   * UserDiscFavorites: findFirst
   */
  export interface UserDiscFavoritesFindFirstArgs extends UserDiscFavoritesFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * UserDiscFavorites findMany
   */
  export type UserDiscFavoritesFindManyArgs = {
    /**
     * Select specific fields to fetch from the UserDiscFavorites
     * 
    **/
    select?: UserDiscFavoritesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserDiscFavoritesInclude | null
    /**
     * Filter, which UserDiscFavorites to fetch.
     * 
    **/
    where?: UserDiscFavoritesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDiscFavorites to fetch.
     * 
    **/
    orderBy?: Enumerable<UserDiscFavoritesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserDiscFavorites.
     * 
    **/
    cursor?: UserDiscFavoritesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDiscFavorites from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDiscFavorites.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserDiscFavoritesScalarFieldEnum>
  }


  /**
   * UserDiscFavorites create
   */
  export type UserDiscFavoritesCreateArgs = {
    /**
     * Select specific fields to fetch from the UserDiscFavorites
     * 
    **/
    select?: UserDiscFavoritesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserDiscFavoritesInclude | null
    /**
     * The data needed to create a UserDiscFavorites.
     * 
    **/
    data: XOR<UserDiscFavoritesCreateInput, UserDiscFavoritesUncheckedCreateInput>
  }


  /**
   * UserDiscFavorites createMany
   */
  export type UserDiscFavoritesCreateManyArgs = {
    /**
     * The data used to create many UserDiscFavorites.
     * 
    **/
    data: Enumerable<UserDiscFavoritesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * UserDiscFavorites update
   */
  export type UserDiscFavoritesUpdateArgs = {
    /**
     * Select specific fields to fetch from the UserDiscFavorites
     * 
    **/
    select?: UserDiscFavoritesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserDiscFavoritesInclude | null
    /**
     * The data needed to update a UserDiscFavorites.
     * 
    **/
    data: XOR<UserDiscFavoritesUpdateInput, UserDiscFavoritesUncheckedUpdateInput>
    /**
     * Choose, which UserDiscFavorites to update.
     * 
    **/
    where: UserDiscFavoritesWhereUniqueInput
  }


  /**
   * UserDiscFavorites updateMany
   */
  export type UserDiscFavoritesUpdateManyArgs = {
    /**
     * The data used to update UserDiscFavorites.
     * 
    **/
    data: XOR<UserDiscFavoritesUpdateManyMutationInput, UserDiscFavoritesUncheckedUpdateManyInput>
    /**
     * Filter which UserDiscFavorites to update
     * 
    **/
    where?: UserDiscFavoritesWhereInput
  }


  /**
   * UserDiscFavorites upsert
   */
  export type UserDiscFavoritesUpsertArgs = {
    /**
     * Select specific fields to fetch from the UserDiscFavorites
     * 
    **/
    select?: UserDiscFavoritesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserDiscFavoritesInclude | null
    /**
     * The filter to search for the UserDiscFavorites to update in case it exists.
     * 
    **/
    where: UserDiscFavoritesWhereUniqueInput
    /**
     * In case the UserDiscFavorites found by the `where` argument doesn't exist, create a new UserDiscFavorites with this data.
     * 
    **/
    create: XOR<UserDiscFavoritesCreateInput, UserDiscFavoritesUncheckedCreateInput>
    /**
     * In case the UserDiscFavorites was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserDiscFavoritesUpdateInput, UserDiscFavoritesUncheckedUpdateInput>
  }


  /**
   * UserDiscFavorites delete
   */
  export type UserDiscFavoritesDeleteArgs = {
    /**
     * Select specific fields to fetch from the UserDiscFavorites
     * 
    **/
    select?: UserDiscFavoritesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserDiscFavoritesInclude | null
    /**
     * Filter which UserDiscFavorites to delete.
     * 
    **/
    where: UserDiscFavoritesWhereUniqueInput
  }


  /**
   * UserDiscFavorites deleteMany
   */
  export type UserDiscFavoritesDeleteManyArgs = {
    /**
     * Filter which UserDiscFavorites to delete
     * 
    **/
    where?: UserDiscFavoritesWhereInput
  }


  /**
   * UserDiscFavorites: findUniqueOrThrow
   */
  export type UserDiscFavoritesFindUniqueOrThrowArgs = UserDiscFavoritesFindUniqueArgsBase
      

  /**
   * UserDiscFavorites: findFirstOrThrow
   */
  export type UserDiscFavoritesFindFirstOrThrowArgs = UserDiscFavoritesFindFirstArgsBase
      

  /**
   * UserDiscFavorites without action
   */
  export type UserDiscFavoritesArgs = {
    /**
     * Select specific fields to fetch from the UserDiscFavorites
     * 
    **/
    select?: UserDiscFavoritesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserDiscFavoritesInclude | null
  }



  /**
   * Model Account
   */


  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs = {
    /**
     * Filter which Account to aggregate.
     * 
    **/
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs = {
    where?: AccountWhereInput
    orderBy?: Enumerable<AccountOrderByWithAggregationInput>
    by: Array<AccountScalarFieldEnum>
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }


  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserArgs
  }

  export type AccountInclude = {
    user?: boolean | UserArgs
  }

  export type AccountGetPayload<
    S extends boolean | null | undefined | AccountArgs,
    U = keyof S
      > = S extends true
        ? Account
    : S extends undefined
    ? never
    : S extends AccountArgs | AccountFindManyArgs
    ?'include' extends U
    ? Account  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Account ? Account[P] : never
  } 
    : Account
  : Account


  type AccountCountArgs = Merge<
    Omit<AccountFindManyArgs, 'select' | 'include'> & {
      select?: AccountCountAggregateInputType | true
    }
  >

  export interface AccountDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AccountFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AccountFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Account'> extends True ? CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>> : CheckSelect<T, Prisma__AccountClient<Account | null, null>, Prisma__AccountClient<AccountGetPayload<T> | null, null>>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AccountFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AccountFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Account'> extends True ? CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>> : CheckSelect<T, Prisma__AccountClient<Account | null, null>, Prisma__AccountClient<AccountGetPayload<T> | null, null>>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AccountFindManyArgs>(
      args?: SelectSubset<T, AccountFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Account>>, PrismaPromise<Array<AccountGetPayload<T>>>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
    **/
    create<T extends AccountCreateArgs>(
      args: SelectSubset<T, AccountCreateArgs>
    ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>

    /**
     * Create many Accounts.
     *     @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     *     @example
     *     // Create many Accounts
     *     const account = await prisma.account.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AccountCreateManyArgs>(
      args?: SelectSubset<T, AccountCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
    **/
    delete<T extends AccountDeleteArgs>(
      args: SelectSubset<T, AccountDeleteArgs>
    ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AccountUpdateArgs>(
      args: SelectSubset<T, AccountUpdateArgs>
    ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AccountDeleteManyArgs>(
      args?: SelectSubset<T, AccountDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AccountUpdateManyArgs>(
      args: SelectSubset<T, AccountUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
    **/
    upsert<T extends AccountUpsertArgs>(
      args: SelectSubset<T, AccountUpsertArgs>
    ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>

    /**
     * Find one Account that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AccountFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>

    /**
     * Find the first Account that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AccountFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__AccountClient<Account>, Prisma__AccountClient<AccountGetPayload<T>>>

    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AccountClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Account base type for findUnique actions
   */
  export type AccountFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * Filter, which Account to fetch.
     * 
    **/
    where: AccountWhereUniqueInput
  }

  /**
   * Account: findUnique
   */
  export interface AccountFindUniqueArgs extends AccountFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Account base type for findFirst actions
   */
  export type AccountFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * Filter, which Account to fetch.
     * 
    **/
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     * 
    **/
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     * 
    **/
    distinct?: Enumerable<AccountScalarFieldEnum>
  }

  /**
   * Account: findFirst
   */
  export interface AccountFindFirstArgs extends AccountFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Account findMany
   */
  export type AccountFindManyArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * Filter, which Accounts to fetch.
     * 
    **/
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     * 
    **/
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AccountScalarFieldEnum>
  }


  /**
   * Account create
   */
  export type AccountCreateArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * The data needed to create a Account.
     * 
    **/
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }


  /**
   * Account createMany
   */
  export type AccountCreateManyArgs = {
    /**
     * The data used to create many Accounts.
     * 
    **/
    data: Enumerable<AccountCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Account update
   */
  export type AccountUpdateArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * The data needed to update a Account.
     * 
    **/
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     * 
    **/
    where: AccountWhereUniqueInput
  }


  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs = {
    /**
     * The data used to update Accounts.
     * 
    **/
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     * 
    **/
    where?: AccountWhereInput
  }


  /**
   * Account upsert
   */
  export type AccountUpsertArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * The filter to search for the Account to update in case it exists.
     * 
    **/
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     * 
    **/
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }


  /**
   * Account delete
   */
  export type AccountDeleteArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * Filter which Account to delete.
     * 
    **/
    where: AccountWhereUniqueInput
  }


  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs = {
    /**
     * Filter which Accounts to delete
     * 
    **/
    where?: AccountWhereInput
  }


  /**
   * Account: findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs = AccountFindUniqueArgsBase
      

  /**
   * Account: findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs = AccountFindFirstArgsBase
      

  /**
   * Account without action
   */
  export type AccountArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
  }



  /**
   * Model Session
   */


  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs = {
    /**
     * Filter which Session to aggregate.
     * 
    **/
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs = {
    where?: SessionWhereInput
    orderBy?: Enumerable<SessionOrderByWithAggregationInput>
    by: Array<SessionScalarFieldEnum>
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }


  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = PrismaPromise<
    Array<
      PickArray<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserArgs
  }

  export type SessionInclude = {
    user?: boolean | UserArgs
  }

  export type SessionGetPayload<
    S extends boolean | null | undefined | SessionArgs,
    U = keyof S
      > = S extends true
        ? Session
    : S extends undefined
    ? never
    : S extends SessionArgs | SessionFindManyArgs
    ?'include' extends U
    ? Session  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Session ? Session[P] : never
  } 
    : Session
  : Session


  type SessionCountArgs = Merge<
    Omit<SessionFindManyArgs, 'select' | 'include'> & {
      select?: SessionCountAggregateInputType | true
    }
  >

  export interface SessionDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SessionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SessionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Session'> extends True ? CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>> : CheckSelect<T, Prisma__SessionClient<Session | null, null>, Prisma__SessionClient<SessionGetPayload<T> | null, null>>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SessionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SessionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Session'> extends True ? CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>> : CheckSelect<T, Prisma__SessionClient<Session | null, null>, Prisma__SessionClient<SessionGetPayload<T> | null, null>>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SessionFindManyArgs>(
      args?: SelectSubset<T, SessionFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Session>>, PrismaPromise<Array<SessionGetPayload<T>>>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
    **/
    create<T extends SessionCreateArgs>(
      args: SelectSubset<T, SessionCreateArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Create many Sessions.
     *     @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     *     @example
     *     // Create many Sessions
     *     const session = await prisma.session.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SessionCreateManyArgs>(
      args?: SelectSubset<T, SessionCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
    **/
    delete<T extends SessionDeleteArgs>(
      args: SelectSubset<T, SessionDeleteArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SessionUpdateArgs>(
      args: SelectSubset<T, SessionUpdateArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SessionDeleteManyArgs>(
      args?: SelectSubset<T, SessionDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SessionUpdateManyArgs>(
      args: SelectSubset<T, SessionUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
    **/
    upsert<T extends SessionUpsertArgs>(
      args: SelectSubset<T, SessionUpsertArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Find one Session that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, SessionFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Find the first Session that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SessionFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__SessionClient<Session>, Prisma__SessionClient<SessionGetPayload<T>>>

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SessionClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Session base type for findUnique actions
   */
  export type SessionFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter, which Session to fetch.
     * 
    **/
    where: SessionWhereUniqueInput
  }

  /**
   * Session: findUnique
   */
  export interface SessionFindUniqueArgs extends SessionFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Session base type for findFirst actions
   */
  export type SessionFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter, which Session to fetch.
     * 
    **/
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     * 
    **/
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     * 
    **/
    distinct?: Enumerable<SessionScalarFieldEnum>
  }

  /**
   * Session: findFirst
   */
  export interface SessionFindFirstArgs extends SessionFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Session findMany
   */
  export type SessionFindManyArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter, which Sessions to fetch.
     * 
    **/
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     * 
    **/
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     * 
    **/
    skip?: number
    distinct?: Enumerable<SessionScalarFieldEnum>
  }


  /**
   * Session create
   */
  export type SessionCreateArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * The data needed to create a Session.
     * 
    **/
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }


  /**
   * Session createMany
   */
  export type SessionCreateManyArgs = {
    /**
     * The data used to create many Sessions.
     * 
    **/
    data: Enumerable<SessionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Session update
   */
  export type SessionUpdateArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * The data needed to update a Session.
     * 
    **/
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     * 
    **/
    where: SessionWhereUniqueInput
  }


  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs = {
    /**
     * The data used to update Sessions.
     * 
    **/
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     * 
    **/
    where?: SessionWhereInput
  }


  /**
   * Session upsert
   */
  export type SessionUpsertArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * The filter to search for the Session to update in case it exists.
     * 
    **/
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     * 
    **/
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }


  /**
   * Session delete
   */
  export type SessionDeleteArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter which Session to delete.
     * 
    **/
    where: SessionWhereUniqueInput
  }


  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs = {
    /**
     * Filter which Sessions to delete
     * 
    **/
    where?: SessionWhereInput
  }


  /**
   * Session: findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs = SessionFindUniqueArgsBase
      

  /**
   * Session: findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs = SessionFindFirstArgsBase
      

  /**
   * Session without action
   */
  export type SessionArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
  }



  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    role: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    role: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    role: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    role: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    accounts?: boolean | AccountFindManyArgs
    sessions?: boolean | SessionFindManyArgs
    role?: boolean
    favorites?: boolean | UserDiscFavoritesFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserInclude = {
    accounts?: boolean | AccountFindManyArgs
    sessions?: boolean | SessionFindManyArgs
    favorites?: boolean | UserDiscFavoritesFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]:
        P extends 'accounts' ? Array < AccountGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'sessions' ? Array < SessionGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'favorites' ? Array < UserDiscFavoritesGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'accounts' ? Array < AccountGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'sessions' ? Array < SessionGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'favorites' ? Array < UserDiscFavoritesGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof User ? User[P] : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null, null>, Prisma__UserClient<UserGetPayload<T> | null, null>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null, null>, Prisma__UserClient<UserGetPayload<T> | null, null>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find one User that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    accounts<T extends AccountFindManyArgs = {}>(args?: Subset<T, AccountFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Account>| Null>, PrismaPromise<Array<AccountGetPayload<T>>| Null>>;

    sessions<T extends SessionFindManyArgs = {}>(args?: Subset<T, SessionFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Session>| Null>, PrismaPromise<Array<SessionGetPayload<T>>| Null>>;

    favorites<T extends UserDiscFavoritesFindManyArgs = {}>(args?: Subset<T, UserDiscFavoritesFindManyArgs>): CheckSelect<T, PrismaPromise<Array<UserDiscFavorites>| Null>, PrismaPromise<Array<UserDiscFavoritesGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User: findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User: findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User: findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = UserFindUniqueArgsBase
      

  /**
   * User: findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = UserFindFirstArgsBase
      

  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model VerificationToken
   */


  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs = {
    /**
     * Filter which VerificationToken to aggregate.
     * 
    **/
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs = {
    where?: VerificationTokenWhereInput
    orderBy?: Enumerable<VerificationTokenOrderByWithAggregationInput>
    by: Array<VerificationTokenScalarFieldEnum>
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }


  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = PrismaPromise<
    Array<
      PickArray<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenGetPayload<
    S extends boolean | null | undefined | VerificationTokenArgs,
    U = keyof S
      > = S extends true
        ? VerificationToken
    : S extends undefined
    ? never
    : S extends VerificationTokenArgs | VerificationTokenFindManyArgs
    ?'include' extends U
    ? VerificationToken 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof VerificationToken ? VerificationToken[P] : never
  } 
    : VerificationToken
  : VerificationToken


  type VerificationTokenCountArgs = Merge<
    Omit<VerificationTokenFindManyArgs, 'select' | 'include'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }
  >

  export interface VerificationTokenDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends VerificationTokenFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, VerificationTokenFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'VerificationToken'> extends True ? CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>> : CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken | null, null>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T> | null, null>>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends VerificationTokenFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, VerificationTokenFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'VerificationToken'> extends True ? CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>> : CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken | null, null>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T> | null, null>>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
    **/
    findMany<T extends VerificationTokenFindManyArgs>(
      args?: SelectSubset<T, VerificationTokenFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<VerificationToken>>, PrismaPromise<Array<VerificationTokenGetPayload<T>>>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
    **/
    create<T extends VerificationTokenCreateArgs>(
      args: SelectSubset<T, VerificationTokenCreateArgs>
    ): CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>>

    /**
     * Create many VerificationTokens.
     *     @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     *     @example
     *     // Create many VerificationTokens
     *     const verificationToken = await prisma.verificationToken.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends VerificationTokenCreateManyArgs>(
      args?: SelectSubset<T, VerificationTokenCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
    **/
    delete<T extends VerificationTokenDeleteArgs>(
      args: SelectSubset<T, VerificationTokenDeleteArgs>
    ): CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends VerificationTokenUpdateArgs>(
      args: SelectSubset<T, VerificationTokenUpdateArgs>
    ): CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends VerificationTokenDeleteManyArgs>(
      args?: SelectSubset<T, VerificationTokenDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends VerificationTokenUpdateManyArgs>(
      args: SelectSubset<T, VerificationTokenUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
    **/
    upsert<T extends VerificationTokenUpsertArgs>(
      args: SelectSubset<T, VerificationTokenUpsertArgs>
    ): CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>>

    /**
     * Find one VerificationToken that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(
      args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__VerificationTokenClient<VerificationToken>, Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>>

    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__VerificationTokenClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * VerificationToken base type for findUnique actions
   */
  export type VerificationTokenFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * Filter, which VerificationToken to fetch.
     * 
    **/
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken: findUnique
   */
  export interface VerificationTokenFindUniqueArgs extends VerificationTokenFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VerificationToken base type for findFirst actions
   */
  export type VerificationTokenFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * Filter, which VerificationToken to fetch.
     * 
    **/
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     * 
    **/
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     * 
    **/
    distinct?: Enumerable<VerificationTokenScalarFieldEnum>
  }

  /**
   * VerificationToken: findFirst
   */
  export interface VerificationTokenFindFirstArgs extends VerificationTokenFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * Filter, which VerificationTokens to fetch.
     * 
    **/
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     * 
    **/
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     * 
    **/
    skip?: number
    distinct?: Enumerable<VerificationTokenScalarFieldEnum>
  }


  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * The data needed to create a VerificationToken.
     * 
    **/
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }


  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs = {
    /**
     * The data used to create many VerificationTokens.
     * 
    **/
    data: Enumerable<VerificationTokenCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * The data needed to update a VerificationToken.
     * 
    **/
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     * 
    **/
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs = {
    /**
     * The data used to update VerificationTokens.
     * 
    **/
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     * 
    **/
    where?: VerificationTokenWhereInput
  }


  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     * 
    **/
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     * 
    **/
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }


  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * Filter which VerificationToken to delete.
     * 
    **/
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs = {
    /**
     * Filter which VerificationTokens to delete
     * 
    **/
    where?: VerificationTokenWhereInput
  }


  /**
   * VerificationToken: findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs = VerificationTokenFindUniqueArgsBase
      

  /**
   * VerificationToken: findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs = VerificationTokenFindFirstArgsBase
      

  /**
   * VerificationToken without action
   */
  export type VerificationTokenArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const BrandScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    url: 'url',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    slug: 'slug'
  };

  export type BrandScalarFieldEnum = (typeof BrandScalarFieldEnum)[keyof typeof BrandScalarFieldEnum]


  export const DiscScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    imageUrl: 'imageUrl',
    speed: 'speed',
    glide: 'glide',
    turn: 'turn',
    fade: 'fade',
    brandId: 'brandId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    type: 'type',
    slug: 'slug',
    views: 'views'
  };

  export type DiscScalarFieldEnum = (typeof DiscScalarFieldEnum)[keyof typeof DiscScalarFieldEnum]


  export const ProductPriceScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    currency: 'currency',
    productId: 'productId',
    createdAt: 'createdAt'
  };

  export type ProductPriceScalarFieldEnum = (typeof ProductPriceScalarFieldEnum)[keyof typeof ProductPriceScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    loc: 'loc',
    lastmod: 'lastmod',
    title: 'title',
    description: 'description',
    imageUrl: 'imageUrl',
    isDisc: 'isDisc',
    storeId: 'storeId',
    discId: 'discId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    latestPrice: 'latestPrice'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const StoreScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    imageUrl: 'imageUrl',
    baseUrl: 'baseUrl',
    sitemapUrl: 'sitemapUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    slug: 'slug'
  };

  export type StoreScalarFieldEnum = (typeof StoreScalarFieldEnum)[keyof typeof StoreScalarFieldEnum]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserDiscFavoritesScalarFieldEnum: {
    discId: 'discId',
    userId: 'userId'
  };

  export type UserDiscFavoritesScalarFieldEnum = (typeof UserDiscFavoritesScalarFieldEnum)[keyof typeof UserDiscFavoritesScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type StoreWhereInput = {
    AND?: Enumerable<StoreWhereInput>
    OR?: Enumerable<StoreWhereInput>
    NOT?: Enumerable<StoreWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    description?: StringFilter | string
    imageUrl?: StringFilter | string
    baseUrl?: StringFilter | string
    sitemapUrl?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    slug?: StringFilter | string
    products?: ProductListRelationFilter
  }

  export type StoreOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    baseUrl?: SortOrder
    sitemapUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
    products?: ProductOrderByRelationAggregateInput
  }

  export type StoreWhereUniqueInput = {
    id?: number
    name?: string
    slug?: string
  }

  export type StoreOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    baseUrl?: SortOrder
    sitemapUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
    _count?: StoreCountOrderByAggregateInput
    _avg?: StoreAvgOrderByAggregateInput
    _max?: StoreMaxOrderByAggregateInput
    _min?: StoreMinOrderByAggregateInput
    _sum?: StoreSumOrderByAggregateInput
  }

  export type StoreScalarWhereWithAggregatesInput = {
    AND?: Enumerable<StoreScalarWhereWithAggregatesInput>
    OR?: Enumerable<StoreScalarWhereWithAggregatesInput>
    NOT?: Enumerable<StoreScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    imageUrl?: StringWithAggregatesFilter | string
    baseUrl?: StringWithAggregatesFilter | string
    sitemapUrl?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    slug?: StringWithAggregatesFilter | string
  }

  export type ProductWhereInput = {
    AND?: Enumerable<ProductWhereInput>
    OR?: Enumerable<ProductWhereInput>
    NOT?: Enumerable<ProductWhereInput>
    id?: IntFilter | number
    loc?: StringFilter | string
    lastmod?: StringFilter | string
    title?: StringFilter | string
    description?: StringFilter | string
    imageUrl?: StringFilter | string
    isDisc?: BoolNullableFilter | boolean | null
    storeId?: IntFilter | number
    discId?: IntNullableFilter | number | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    disc?: XOR<DiscRelationFilter, DiscWhereInput> | null
    store?: XOR<StoreRelationFilter, StoreWhereInput>
    prices?: ProductPriceListRelationFilter
    latestPrice?: FloatFilter | number
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    loc?: SortOrder
    lastmod?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    isDisc?: SortOrder
    storeId?: SortOrder
    discId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    disc?: DiscOrderByWithRelationInput
    store?: StoreOrderByWithRelationInput
    prices?: ProductPriceOrderByRelationAggregateInput
    latestPrice?: SortOrder
  }

  export type ProductWhereUniqueInput = {
    id?: number
    loc?: string
  }

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    loc?: SortOrder
    lastmod?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    isDisc?: SortOrder
    storeId?: SortOrder
    discId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    latestPrice?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProductScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProductScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProductScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    loc?: StringWithAggregatesFilter | string
    lastmod?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    imageUrl?: StringWithAggregatesFilter | string
    isDisc?: BoolNullableWithAggregatesFilter | boolean | null
    storeId?: IntWithAggregatesFilter | number
    discId?: IntNullableWithAggregatesFilter | number | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    latestPrice?: FloatWithAggregatesFilter | number
  }

  export type ProductPriceWhereInput = {
    AND?: Enumerable<ProductPriceWhereInput>
    OR?: Enumerable<ProductPriceWhereInput>
    NOT?: Enumerable<ProductPriceWhereInput>
    id?: IntFilter | number
    amount?: FloatFilter | number
    currency?: StringFilter | string
    productId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type ProductPriceOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type ProductPriceWhereUniqueInput = {
    id?: number
  }

  export type ProductPriceOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    _count?: ProductPriceCountOrderByAggregateInput
    _avg?: ProductPriceAvgOrderByAggregateInput
    _max?: ProductPriceMaxOrderByAggregateInput
    _min?: ProductPriceMinOrderByAggregateInput
    _sum?: ProductPriceSumOrderByAggregateInput
  }

  export type ProductPriceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProductPriceScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProductPriceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProductPriceScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    amount?: FloatWithAggregatesFilter | number
    currency?: StringWithAggregatesFilter | string
    productId?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type BrandWhereInput = {
    AND?: Enumerable<BrandWhereInput>
    OR?: Enumerable<BrandWhereInput>
    NOT?: Enumerable<BrandWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    description?: StringFilter | string
    url?: StringFilter | string
    imageUrl?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    slug?: StringFilter | string
    discs?: DiscListRelationFilter
  }

  export type BrandOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
    discs?: DiscOrderByRelationAggregateInput
  }

  export type BrandWhereUniqueInput = {
    id?: number
    slug?: string
  }

  export type BrandOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
    _count?: BrandCountOrderByAggregateInput
    _avg?: BrandAvgOrderByAggregateInput
    _max?: BrandMaxOrderByAggregateInput
    _min?: BrandMinOrderByAggregateInput
    _sum?: BrandSumOrderByAggregateInput
  }

  export type BrandScalarWhereWithAggregatesInput = {
    AND?: Enumerable<BrandScalarWhereWithAggregatesInput>
    OR?: Enumerable<BrandScalarWhereWithAggregatesInput>
    NOT?: Enumerable<BrandScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    url?: StringWithAggregatesFilter | string
    imageUrl?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    slug?: StringWithAggregatesFilter | string
  }

  export type DiscWhereInput = {
    AND?: Enumerable<DiscWhereInput>
    OR?: Enumerable<DiscWhereInput>
    NOT?: Enumerable<DiscWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    description?: StringFilter | string
    imageUrl?: StringFilter | string
    speed?: FloatFilter | number
    glide?: FloatFilter | number
    turn?: FloatFilter | number
    fade?: FloatFilter | number
    brandId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    type?: StringFilter | string
    slug?: StringFilter | string
    brand?: XOR<BrandRelationFilter, BrandWhereInput>
    products?: ProductListRelationFilter
    users?: UserDiscFavoritesListRelationFilter
    views?: IntFilter | number
  }

  export type DiscOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    speed?: SortOrder
    glide?: SortOrder
    turn?: SortOrder
    fade?: SortOrder
    brandId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    type?: SortOrder
    slug?: SortOrder
    brand?: BrandOrderByWithRelationInput
    products?: ProductOrderByRelationAggregateInput
    users?: UserDiscFavoritesOrderByRelationAggregateInput
    views?: SortOrder
  }

  export type DiscWhereUniqueInput = {
    id?: number
    slug?: string
  }

  export type DiscOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    speed?: SortOrder
    glide?: SortOrder
    turn?: SortOrder
    fade?: SortOrder
    brandId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    type?: SortOrder
    slug?: SortOrder
    views?: SortOrder
    _count?: DiscCountOrderByAggregateInput
    _avg?: DiscAvgOrderByAggregateInput
    _max?: DiscMaxOrderByAggregateInput
    _min?: DiscMinOrderByAggregateInput
    _sum?: DiscSumOrderByAggregateInput
  }

  export type DiscScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DiscScalarWhereWithAggregatesInput>
    OR?: Enumerable<DiscScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DiscScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    imageUrl?: StringWithAggregatesFilter | string
    speed?: FloatWithAggregatesFilter | number
    glide?: FloatWithAggregatesFilter | number
    turn?: FloatWithAggregatesFilter | number
    fade?: FloatWithAggregatesFilter | number
    brandId?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    type?: StringWithAggregatesFilter | string
    slug?: StringWithAggregatesFilter | string
    views?: IntWithAggregatesFilter | number
  }

  export type UserDiscFavoritesWhereInput = {
    AND?: Enumerable<UserDiscFavoritesWhereInput>
    OR?: Enumerable<UserDiscFavoritesWhereInput>
    NOT?: Enumerable<UserDiscFavoritesWhereInput>
    disc?: XOR<DiscRelationFilter, DiscWhereInput>
    discId?: IntFilter | number
    User?: XOR<UserRelationFilter, UserWhereInput>
    userId?: StringFilter | string
  }

  export type UserDiscFavoritesOrderByWithRelationInput = {
    disc?: DiscOrderByWithRelationInput
    discId?: SortOrder
    User?: UserOrderByWithRelationInput
    userId?: SortOrder
  }

  export type UserDiscFavoritesWhereUniqueInput = {
    discId_userId?: UserDiscFavoritesDiscIdUserIdCompoundUniqueInput
  }

  export type UserDiscFavoritesOrderByWithAggregationInput = {
    discId?: SortOrder
    userId?: SortOrder
    _count?: UserDiscFavoritesCountOrderByAggregateInput
    _avg?: UserDiscFavoritesAvgOrderByAggregateInput
    _max?: UserDiscFavoritesMaxOrderByAggregateInput
    _min?: UserDiscFavoritesMinOrderByAggregateInput
    _sum?: UserDiscFavoritesSumOrderByAggregateInput
  }

  export type UserDiscFavoritesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserDiscFavoritesScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserDiscFavoritesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserDiscFavoritesScalarWhereWithAggregatesInput>
    discId?: IntWithAggregatesFilter | number
    userId?: StringWithAggregatesFilter | string
  }

  export type AccountWhereInput = {
    AND?: Enumerable<AccountWhereInput>
    OR?: Enumerable<AccountWhereInput>
    NOT?: Enumerable<AccountWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    type?: StringFilter | string
    provider?: StringFilter | string
    providerAccountId?: StringFilter | string
    refresh_token?: StringNullableFilter | string | null
    access_token?: StringNullableFilter | string | null
    expires_at?: IntNullableFilter | number | null
    token_type?: StringNullableFilter | string | null
    scope?: StringNullableFilter | string | null
    id_token?: StringNullableFilter | string | null
    session_state?: StringNullableFilter | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = {
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
  }

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AccountScalarWhereWithAggregatesInput>
    OR?: Enumerable<AccountScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AccountScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    type?: StringWithAggregatesFilter | string
    provider?: StringWithAggregatesFilter | string
    providerAccountId?: StringWithAggregatesFilter | string
    refresh_token?: StringNullableWithAggregatesFilter | string | null
    access_token?: StringNullableWithAggregatesFilter | string | null
    expires_at?: IntNullableWithAggregatesFilter | number | null
    token_type?: StringNullableWithAggregatesFilter | string | null
    scope?: StringNullableWithAggregatesFilter | string | null
    id_token?: StringNullableWithAggregatesFilter | string | null
    session_state?: StringNullableWithAggregatesFilter | string | null
  }

  export type SessionWhereInput = {
    AND?: Enumerable<SessionWhereInput>
    OR?: Enumerable<SessionWhereInput>
    NOT?: Enumerable<SessionWhereInput>
    id?: StringFilter | string
    sessionToken?: StringFilter | string
    userId?: StringFilter | string
    expires?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = {
    id?: string
    sessionToken?: string
  }

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SessionScalarWhereWithAggregatesInput>
    OR?: Enumerable<SessionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SessionScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    sessionToken?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    expires?: DateTimeWithAggregatesFilter | Date | string
  }

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    name?: StringNullableFilter | string | null
    email?: StringNullableFilter | string | null
    emailVerified?: DateTimeNullableFilter | Date | string | null
    image?: StringNullableFilter | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    role?: StringFilter | string
    favorites?: UserDiscFavoritesListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    role?: SortOrder
    favorites?: UserDiscFavoritesOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: string
    email?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringNullableWithAggregatesFilter | string | null
    email?: StringNullableWithAggregatesFilter | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter | Date | string | null
    image?: StringNullableWithAggregatesFilter | string | null
    role?: StringWithAggregatesFilter | string
  }

  export type VerificationTokenWhereInput = {
    AND?: Enumerable<VerificationTokenWhereInput>
    OR?: Enumerable<VerificationTokenWhereInput>
    NOT?: Enumerable<VerificationTokenWhereInput>
    identifier?: StringFilter | string
    token?: StringFilter | string
    expires?: DateTimeFilter | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = {
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
  }

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    OR?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    NOT?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    identifier?: StringWithAggregatesFilter | string
    token?: StringWithAggregatesFilter | string
    expires?: DateTimeWithAggregatesFilter | Date | string
  }

  export type StoreCreateInput = {
    name: string
    description?: string
    imageUrl?: string
    baseUrl: string
    sitemapUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    products?: ProductCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateInput = {
    id?: number
    name: string
    description?: string
    imageUrl?: string
    baseUrl: string
    sitemapUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    products?: ProductUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    sitemapUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    products?: ProductUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    sitemapUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    products?: ProductUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type StoreCreateManyInput = {
    id?: number
    name: string
    description?: string
    imageUrl?: string
    baseUrl: string
    sitemapUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
  }

  export type StoreUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    sitemapUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type StoreUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    sitemapUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCreateInput = {
    loc: string
    lastmod: string
    title: string
    description: string
    imageUrl: string
    isDisc?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    disc?: DiscCreateNestedOneWithoutProductsInput
    store: StoreCreateNestedOneWithoutProductsInput
    prices?: ProductPriceCreateNestedManyWithoutProductInput
    latestPrice?: number
  }

  export type ProductUncheckedCreateInput = {
    id?: number
    loc: string
    lastmod: string
    title: string
    description: string
    imageUrl: string
    isDisc?: boolean | null
    storeId: number
    discId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prices?: ProductPriceUncheckedCreateNestedManyWithoutProductInput
    latestPrice?: number
  }

  export type ProductUpdateInput = {
    loc?: StringFieldUpdateOperationsInput | string
    lastmod?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isDisc?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    disc?: DiscUpdateOneWithoutProductsNestedInput
    store?: StoreUpdateOneRequiredWithoutProductsNestedInput
    prices?: ProductPriceUpdateManyWithoutProductNestedInput
    latestPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    loc?: StringFieldUpdateOperationsInput | string
    lastmod?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isDisc?: NullableBoolFieldUpdateOperationsInput | boolean | null
    storeId?: IntFieldUpdateOperationsInput | number
    discId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prices?: ProductPriceUncheckedUpdateManyWithoutProductNestedInput
    latestPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type ProductCreateManyInput = {
    id?: number
    loc: string
    lastmod: string
    title: string
    description: string
    imageUrl: string
    isDisc?: boolean | null
    storeId: number
    discId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    latestPrice?: number
  }

  export type ProductUpdateManyMutationInput = {
    loc?: StringFieldUpdateOperationsInput | string
    lastmod?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isDisc?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    latestPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    loc?: StringFieldUpdateOperationsInput | string
    lastmod?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isDisc?: NullableBoolFieldUpdateOperationsInput | boolean | null
    storeId?: IntFieldUpdateOperationsInput | number
    discId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    latestPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type ProductPriceCreateInput = {
    amount: number
    currency: string
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutPricesInput
  }

  export type ProductPriceUncheckedCreateInput = {
    id?: number
    amount: number
    currency: string
    productId: number
    createdAt?: Date | string
  }

  export type ProductPriceUpdateInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutPricesNestedInput
  }

  export type ProductPriceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    productId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductPriceCreateManyInput = {
    id?: number
    amount: number
    currency: string
    productId: number
    createdAt?: Date | string
  }

  export type ProductPriceUpdateManyMutationInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductPriceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    productId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BrandCreateInput = {
    name: string
    description: string
    url: string
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    discs?: DiscCreateNestedManyWithoutBrandInput
  }

  export type BrandUncheckedCreateInput = {
    id?: number
    name: string
    description: string
    url: string
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
    discs?: DiscUncheckedCreateNestedManyWithoutBrandInput
  }

  export type BrandUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    discs?: DiscUpdateManyWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
    discs?: DiscUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type BrandCreateManyInput = {
    id?: number
    name: string
    description: string
    url: string
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
  }

  export type BrandUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type BrandUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type DiscCreateInput = {
    name: string
    description: string
    imageUrl: string
    speed: number
    glide: number
    turn: number
    fade: number
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    slug: string
    brand: BrandCreateNestedOneWithoutDiscsInput
    products?: ProductCreateNestedManyWithoutDiscInput
    users?: UserDiscFavoritesCreateNestedManyWithoutDiscInput
    views?: number
  }

  export type DiscUncheckedCreateInput = {
    id?: number
    name: string
    description: string
    imageUrl: string
    speed: number
    glide: number
    turn: number
    fade: number
    brandId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    slug: string
    products?: ProductUncheckedCreateNestedManyWithoutDiscInput
    users?: UserDiscFavoritesUncheckedCreateNestedManyWithoutDiscInput
    views?: number
  }

  export type DiscUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    speed?: FloatFieldUpdateOperationsInput | number
    glide?: FloatFieldUpdateOperationsInput | number
    turn?: FloatFieldUpdateOperationsInput | number
    fade?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    brand?: BrandUpdateOneRequiredWithoutDiscsNestedInput
    products?: ProductUpdateManyWithoutDiscNestedInput
    users?: UserDiscFavoritesUpdateManyWithoutDiscNestedInput
    views?: IntFieldUpdateOperationsInput | number
  }

  export type DiscUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    speed?: FloatFieldUpdateOperationsInput | number
    glide?: FloatFieldUpdateOperationsInput | number
    turn?: FloatFieldUpdateOperationsInput | number
    fade?: FloatFieldUpdateOperationsInput | number
    brandId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    products?: ProductUncheckedUpdateManyWithoutDiscNestedInput
    users?: UserDiscFavoritesUncheckedUpdateManyWithoutDiscNestedInput
    views?: IntFieldUpdateOperationsInput | number
  }

  export type DiscCreateManyInput = {
    id?: number
    name: string
    description: string
    imageUrl: string
    speed: number
    glide: number
    turn: number
    fade: number
    brandId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    slug: string
    views?: number
  }

  export type DiscUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    speed?: FloatFieldUpdateOperationsInput | number
    glide?: FloatFieldUpdateOperationsInput | number
    turn?: FloatFieldUpdateOperationsInput | number
    fade?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
  }

  export type DiscUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    speed?: FloatFieldUpdateOperationsInput | number
    glide?: FloatFieldUpdateOperationsInput | number
    turn?: FloatFieldUpdateOperationsInput | number
    fade?: FloatFieldUpdateOperationsInput | number
    brandId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
  }

  export type UserDiscFavoritesCreateInput = {
    disc: DiscCreateNestedOneWithoutUsersInput
    User: UserCreateNestedOneWithoutFavoritesInput
  }

  export type UserDiscFavoritesUncheckedCreateInput = {
    discId: number
    userId: string
  }

  export type UserDiscFavoritesUpdateInput = {
    disc?: DiscUpdateOneRequiredWithoutUsersNestedInput
    User?: UserUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type UserDiscFavoritesUncheckedUpdateInput = {
    discId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserDiscFavoritesCreateManyInput = {
    discId: number
    userId: string
  }

  export type UserDiscFavoritesUpdateManyMutationInput = {

  }

  export type UserDiscFavoritesUncheckedUpdateManyInput = {
    discId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    role?: string
    favorites?: UserDiscFavoritesCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    role?: string
    favorites?: UserDiscFavoritesUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    role?: StringFieldUpdateOperationsInput | string
    favorites?: UserDiscFavoritesUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    role?: StringFieldUpdateOperationsInput | string
    favorites?: UserDiscFavoritesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    role?: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StoreCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    baseUrl?: SortOrder
    sitemapUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
  }

  export type StoreAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StoreMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    baseUrl?: SortOrder
    sitemapUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
  }

  export type StoreMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    baseUrl?: SortOrder
    sitemapUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
  }

  export type StoreSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type BoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type DiscRelationFilter = {
    is?: DiscWhereInput
    isNot?: DiscWhereInput
  }

  export type StoreRelationFilter = {
    is?: StoreWhereInput
    isNot?: StoreWhereInput
  }

  export type ProductPriceListRelationFilter = {
    every?: ProductPriceWhereInput
    some?: ProductPriceWhereInput
    none?: ProductPriceWhereInput
  }

  export type FloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type ProductPriceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    loc?: SortOrder
    lastmod?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    isDisc?: SortOrder
    storeId?: SortOrder
    discId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    latestPrice?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    discId?: SortOrder
    latestPrice?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    loc?: SortOrder
    lastmod?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    isDisc?: SortOrder
    storeId?: SortOrder
    discId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    latestPrice?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    loc?: SortOrder
    lastmod?: SortOrder
    title?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    isDisc?: SortOrder
    storeId?: SortOrder
    discId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    latestPrice?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    discId?: SortOrder
    latestPrice?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type FloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type ProductRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ProductPriceCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductPriceAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    productId?: SortOrder
  }

  export type ProductPriceMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductPriceMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductPriceSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    productId?: SortOrder
  }

  export type DiscListRelationFilter = {
    every?: DiscWhereInput
    some?: DiscWhereInput
    none?: DiscWhereInput
  }

  export type DiscOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BrandCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
  }

  export type BrandAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BrandMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
  }

  export type BrandMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    slug?: SortOrder
  }

  export type BrandSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BrandRelationFilter = {
    is?: BrandWhereInput
    isNot?: BrandWhereInput
  }

  export type UserDiscFavoritesListRelationFilter = {
    every?: UserDiscFavoritesWhereInput
    some?: UserDiscFavoritesWhereInput
    none?: UserDiscFavoritesWhereInput
  }

  export type UserDiscFavoritesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DiscCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    speed?: SortOrder
    glide?: SortOrder
    turn?: SortOrder
    fade?: SortOrder
    brandId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    type?: SortOrder
    slug?: SortOrder
    views?: SortOrder
  }

  export type DiscAvgOrderByAggregateInput = {
    id?: SortOrder
    speed?: SortOrder
    glide?: SortOrder
    turn?: SortOrder
    fade?: SortOrder
    brandId?: SortOrder
    views?: SortOrder
  }

  export type DiscMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    speed?: SortOrder
    glide?: SortOrder
    turn?: SortOrder
    fade?: SortOrder
    brandId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    type?: SortOrder
    slug?: SortOrder
    views?: SortOrder
  }

  export type DiscMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    speed?: SortOrder
    glide?: SortOrder
    turn?: SortOrder
    fade?: SortOrder
    brandId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    type?: SortOrder
    slug?: SortOrder
    views?: SortOrder
  }

  export type DiscSumOrderByAggregateInput = {
    id?: SortOrder
    speed?: SortOrder
    glide?: SortOrder
    turn?: SortOrder
    fade?: SortOrder
    brandId?: SortOrder
    views?: SortOrder
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserDiscFavoritesDiscIdUserIdCompoundUniqueInput = {
    discId: number
    userId: string
  }

  export type UserDiscFavoritesCountOrderByAggregateInput = {
    discId?: SortOrder
    userId?: SortOrder
  }

  export type UserDiscFavoritesAvgOrderByAggregateInput = {
    discId?: SortOrder
  }

  export type UserDiscFavoritesMaxOrderByAggregateInput = {
    discId?: SortOrder
    userId?: SortOrder
  }

  export type UserDiscFavoritesMinOrderByAggregateInput = {
    discId?: SortOrder
    userId?: SortOrder
  }

  export type UserDiscFavoritesSumOrderByAggregateInput = {
    discId?: SortOrder
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type ProductCreateNestedManyWithoutStoreInput = {
    create?: XOR<Enumerable<ProductCreateWithoutStoreInput>, Enumerable<ProductUncheckedCreateWithoutStoreInput>>
    connectOrCreate?: Enumerable<ProductCreateOrConnectWithoutStoreInput>
    createMany?: ProductCreateManyStoreInputEnvelope
    connect?: Enumerable<ProductWhereUniqueInput>
  }

  export type ProductUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<Enumerable<ProductCreateWithoutStoreInput>, Enumerable<ProductUncheckedCreateWithoutStoreInput>>
    connectOrCreate?: Enumerable<ProductCreateOrConnectWithoutStoreInput>
    createMany?: ProductCreateManyStoreInputEnvelope
    connect?: Enumerable<ProductWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProductUpdateManyWithoutStoreNestedInput = {
    create?: XOR<Enumerable<ProductCreateWithoutStoreInput>, Enumerable<ProductUncheckedCreateWithoutStoreInput>>
    connectOrCreate?: Enumerable<ProductCreateOrConnectWithoutStoreInput>
    upsert?: Enumerable<ProductUpsertWithWhereUniqueWithoutStoreInput>
    createMany?: ProductCreateManyStoreInputEnvelope
    set?: Enumerable<ProductWhereUniqueInput>
    disconnect?: Enumerable<ProductWhereUniqueInput>
    delete?: Enumerable<ProductWhereUniqueInput>
    connect?: Enumerable<ProductWhereUniqueInput>
    update?: Enumerable<ProductUpdateWithWhereUniqueWithoutStoreInput>
    updateMany?: Enumerable<ProductUpdateManyWithWhereWithoutStoreInput>
    deleteMany?: Enumerable<ProductScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<Enumerable<ProductCreateWithoutStoreInput>, Enumerable<ProductUncheckedCreateWithoutStoreInput>>
    connectOrCreate?: Enumerable<ProductCreateOrConnectWithoutStoreInput>
    upsert?: Enumerable<ProductUpsertWithWhereUniqueWithoutStoreInput>
    createMany?: ProductCreateManyStoreInputEnvelope
    set?: Enumerable<ProductWhereUniqueInput>
    disconnect?: Enumerable<ProductWhereUniqueInput>
    delete?: Enumerable<ProductWhereUniqueInput>
    connect?: Enumerable<ProductWhereUniqueInput>
    update?: Enumerable<ProductUpdateWithWhereUniqueWithoutStoreInput>
    updateMany?: Enumerable<ProductUpdateManyWithWhereWithoutStoreInput>
    deleteMany?: Enumerable<ProductScalarWhereInput>
  }

  export type DiscCreateNestedOneWithoutProductsInput = {
    create?: XOR<DiscCreateWithoutProductsInput, DiscUncheckedCreateWithoutProductsInput>
    connectOrCreate?: DiscCreateOrConnectWithoutProductsInput
    connect?: DiscWhereUniqueInput
  }

  export type StoreCreateNestedOneWithoutProductsInput = {
    create?: XOR<StoreCreateWithoutProductsInput, StoreUncheckedCreateWithoutProductsInput>
    connectOrCreate?: StoreCreateOrConnectWithoutProductsInput
    connect?: StoreWhereUniqueInput
  }

  export type ProductPriceCreateNestedManyWithoutProductInput = {
    create?: XOR<Enumerable<ProductPriceCreateWithoutProductInput>, Enumerable<ProductPriceUncheckedCreateWithoutProductInput>>
    connectOrCreate?: Enumerable<ProductPriceCreateOrConnectWithoutProductInput>
    createMany?: ProductPriceCreateManyProductInputEnvelope
    connect?: Enumerable<ProductPriceWhereUniqueInput>
  }

  export type ProductPriceUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<Enumerable<ProductPriceCreateWithoutProductInput>, Enumerable<ProductPriceUncheckedCreateWithoutProductInput>>
    connectOrCreate?: Enumerable<ProductPriceCreateOrConnectWithoutProductInput>
    createMany?: ProductPriceCreateManyProductInputEnvelope
    connect?: Enumerable<ProductPriceWhereUniqueInput>
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type DiscUpdateOneWithoutProductsNestedInput = {
    create?: XOR<DiscCreateWithoutProductsInput, DiscUncheckedCreateWithoutProductsInput>
    connectOrCreate?: DiscCreateOrConnectWithoutProductsInput
    upsert?: DiscUpsertWithoutProductsInput
    disconnect?: boolean
    delete?: boolean
    connect?: DiscWhereUniqueInput
    update?: XOR<DiscUpdateWithoutProductsInput, DiscUncheckedUpdateWithoutProductsInput>
  }

  export type StoreUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<StoreCreateWithoutProductsInput, StoreUncheckedCreateWithoutProductsInput>
    connectOrCreate?: StoreCreateOrConnectWithoutProductsInput
    upsert?: StoreUpsertWithoutProductsInput
    connect?: StoreWhereUniqueInput
    update?: XOR<StoreUpdateWithoutProductsInput, StoreUncheckedUpdateWithoutProductsInput>
  }

  export type ProductPriceUpdateManyWithoutProductNestedInput = {
    create?: XOR<Enumerable<ProductPriceCreateWithoutProductInput>, Enumerable<ProductPriceUncheckedCreateWithoutProductInput>>
    connectOrCreate?: Enumerable<ProductPriceCreateOrConnectWithoutProductInput>
    upsert?: Enumerable<ProductPriceUpsertWithWhereUniqueWithoutProductInput>
    createMany?: ProductPriceCreateManyProductInputEnvelope
    set?: Enumerable<ProductPriceWhereUniqueInput>
    disconnect?: Enumerable<ProductPriceWhereUniqueInput>
    delete?: Enumerable<ProductPriceWhereUniqueInput>
    connect?: Enumerable<ProductPriceWhereUniqueInput>
    update?: Enumerable<ProductPriceUpdateWithWhereUniqueWithoutProductInput>
    updateMany?: Enumerable<ProductPriceUpdateManyWithWhereWithoutProductInput>
    deleteMany?: Enumerable<ProductPriceScalarWhereInput>
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProductPriceUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<Enumerable<ProductPriceCreateWithoutProductInput>, Enumerable<ProductPriceUncheckedCreateWithoutProductInput>>
    connectOrCreate?: Enumerable<ProductPriceCreateOrConnectWithoutProductInput>
    upsert?: Enumerable<ProductPriceUpsertWithWhereUniqueWithoutProductInput>
    createMany?: ProductPriceCreateManyProductInputEnvelope
    set?: Enumerable<ProductPriceWhereUniqueInput>
    disconnect?: Enumerable<ProductPriceWhereUniqueInput>
    delete?: Enumerable<ProductPriceWhereUniqueInput>
    connect?: Enumerable<ProductPriceWhereUniqueInput>
    update?: Enumerable<ProductPriceUpdateWithWhereUniqueWithoutProductInput>
    updateMany?: Enumerable<ProductPriceUpdateManyWithWhereWithoutProductInput>
    deleteMany?: Enumerable<ProductPriceScalarWhereInput>
  }

  export type ProductCreateNestedOneWithoutPricesInput = {
    create?: XOR<ProductCreateWithoutPricesInput, ProductUncheckedCreateWithoutPricesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutPricesInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutPricesNestedInput = {
    create?: XOR<ProductCreateWithoutPricesInput, ProductUncheckedCreateWithoutPricesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutPricesInput
    upsert?: ProductUpsertWithoutPricesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<ProductUpdateWithoutPricesInput, ProductUncheckedUpdateWithoutPricesInput>
  }

  export type DiscCreateNestedManyWithoutBrandInput = {
    create?: XOR<Enumerable<DiscCreateWithoutBrandInput>, Enumerable<DiscUncheckedCreateWithoutBrandInput>>
    connectOrCreate?: Enumerable<DiscCreateOrConnectWithoutBrandInput>
    createMany?: DiscCreateManyBrandInputEnvelope
    connect?: Enumerable<DiscWhereUniqueInput>
  }

  export type DiscUncheckedCreateNestedManyWithoutBrandInput = {
    create?: XOR<Enumerable<DiscCreateWithoutBrandInput>, Enumerable<DiscUncheckedCreateWithoutBrandInput>>
    connectOrCreate?: Enumerable<DiscCreateOrConnectWithoutBrandInput>
    createMany?: DiscCreateManyBrandInputEnvelope
    connect?: Enumerable<DiscWhereUniqueInput>
  }

  export type DiscUpdateManyWithoutBrandNestedInput = {
    create?: XOR<Enumerable<DiscCreateWithoutBrandInput>, Enumerable<DiscUncheckedCreateWithoutBrandInput>>
    connectOrCreate?: Enumerable<DiscCreateOrConnectWithoutBrandInput>
    upsert?: Enumerable<DiscUpsertWithWhereUniqueWithoutBrandInput>
    createMany?: DiscCreateManyBrandInputEnvelope
    set?: Enumerable<DiscWhereUniqueInput>
    disconnect?: Enumerable<DiscWhereUniqueInput>
    delete?: Enumerable<DiscWhereUniqueInput>
    connect?: Enumerable<DiscWhereUniqueInput>
    update?: Enumerable<DiscUpdateWithWhereUniqueWithoutBrandInput>
    updateMany?: Enumerable<DiscUpdateManyWithWhereWithoutBrandInput>
    deleteMany?: Enumerable<DiscScalarWhereInput>
  }

  export type DiscUncheckedUpdateManyWithoutBrandNestedInput = {
    create?: XOR<Enumerable<DiscCreateWithoutBrandInput>, Enumerable<DiscUncheckedCreateWithoutBrandInput>>
    connectOrCreate?: Enumerable<DiscCreateOrConnectWithoutBrandInput>
    upsert?: Enumerable<DiscUpsertWithWhereUniqueWithoutBrandInput>
    createMany?: DiscCreateManyBrandInputEnvelope
    set?: Enumerable<DiscWhereUniqueInput>
    disconnect?: Enumerable<DiscWhereUniqueInput>
    delete?: Enumerable<DiscWhereUniqueInput>
    connect?: Enumerable<DiscWhereUniqueInput>
    update?: Enumerable<DiscUpdateWithWhereUniqueWithoutBrandInput>
    updateMany?: Enumerable<DiscUpdateManyWithWhereWithoutBrandInput>
    deleteMany?: Enumerable<DiscScalarWhereInput>
  }

  export type BrandCreateNestedOneWithoutDiscsInput = {
    create?: XOR<BrandCreateWithoutDiscsInput, BrandUncheckedCreateWithoutDiscsInput>
    connectOrCreate?: BrandCreateOrConnectWithoutDiscsInput
    connect?: BrandWhereUniqueInput
  }

  export type ProductCreateNestedManyWithoutDiscInput = {
    create?: XOR<Enumerable<ProductCreateWithoutDiscInput>, Enumerable<ProductUncheckedCreateWithoutDiscInput>>
    connectOrCreate?: Enumerable<ProductCreateOrConnectWithoutDiscInput>
    createMany?: ProductCreateManyDiscInputEnvelope
    connect?: Enumerable<ProductWhereUniqueInput>
  }

  export type UserDiscFavoritesCreateNestedManyWithoutDiscInput = {
    create?: XOR<Enumerable<UserDiscFavoritesCreateWithoutDiscInput>, Enumerable<UserDiscFavoritesUncheckedCreateWithoutDiscInput>>
    connectOrCreate?: Enumerable<UserDiscFavoritesCreateOrConnectWithoutDiscInput>
    createMany?: UserDiscFavoritesCreateManyDiscInputEnvelope
    connect?: Enumerable<UserDiscFavoritesWhereUniqueInput>
  }

  export type ProductUncheckedCreateNestedManyWithoutDiscInput = {
    create?: XOR<Enumerable<ProductCreateWithoutDiscInput>, Enumerable<ProductUncheckedCreateWithoutDiscInput>>
    connectOrCreate?: Enumerable<ProductCreateOrConnectWithoutDiscInput>
    createMany?: ProductCreateManyDiscInputEnvelope
    connect?: Enumerable<ProductWhereUniqueInput>
  }

  export type UserDiscFavoritesUncheckedCreateNestedManyWithoutDiscInput = {
    create?: XOR<Enumerable<UserDiscFavoritesCreateWithoutDiscInput>, Enumerable<UserDiscFavoritesUncheckedCreateWithoutDiscInput>>
    connectOrCreate?: Enumerable<UserDiscFavoritesCreateOrConnectWithoutDiscInput>
    createMany?: UserDiscFavoritesCreateManyDiscInputEnvelope
    connect?: Enumerable<UserDiscFavoritesWhereUniqueInput>
  }

  export type BrandUpdateOneRequiredWithoutDiscsNestedInput = {
    create?: XOR<BrandCreateWithoutDiscsInput, BrandUncheckedCreateWithoutDiscsInput>
    connectOrCreate?: BrandCreateOrConnectWithoutDiscsInput
    upsert?: BrandUpsertWithoutDiscsInput
    connect?: BrandWhereUniqueInput
    update?: XOR<BrandUpdateWithoutDiscsInput, BrandUncheckedUpdateWithoutDiscsInput>
  }

  export type ProductUpdateManyWithoutDiscNestedInput = {
    create?: XOR<Enumerable<ProductCreateWithoutDiscInput>, Enumerable<ProductUncheckedCreateWithoutDiscInput>>
    connectOrCreate?: Enumerable<ProductCreateOrConnectWithoutDiscInput>
    upsert?: Enumerable<ProductUpsertWithWhereUniqueWithoutDiscInput>
    createMany?: ProductCreateManyDiscInputEnvelope
    set?: Enumerable<ProductWhereUniqueInput>
    disconnect?: Enumerable<ProductWhereUniqueInput>
    delete?: Enumerable<ProductWhereUniqueInput>
    connect?: Enumerable<ProductWhereUniqueInput>
    update?: Enumerable<ProductUpdateWithWhereUniqueWithoutDiscInput>
    updateMany?: Enumerable<ProductUpdateManyWithWhereWithoutDiscInput>
    deleteMany?: Enumerable<ProductScalarWhereInput>
  }

  export type UserDiscFavoritesUpdateManyWithoutDiscNestedInput = {
    create?: XOR<Enumerable<UserDiscFavoritesCreateWithoutDiscInput>, Enumerable<UserDiscFavoritesUncheckedCreateWithoutDiscInput>>
    connectOrCreate?: Enumerable<UserDiscFavoritesCreateOrConnectWithoutDiscInput>
    upsert?: Enumerable<UserDiscFavoritesUpsertWithWhereUniqueWithoutDiscInput>
    createMany?: UserDiscFavoritesCreateManyDiscInputEnvelope
    set?: Enumerable<UserDiscFavoritesWhereUniqueInput>
    disconnect?: Enumerable<UserDiscFavoritesWhereUniqueInput>
    delete?: Enumerable<UserDiscFavoritesWhereUniqueInput>
    connect?: Enumerable<UserDiscFavoritesWhereUniqueInput>
    update?: Enumerable<UserDiscFavoritesUpdateWithWhereUniqueWithoutDiscInput>
    updateMany?: Enumerable<UserDiscFavoritesUpdateManyWithWhereWithoutDiscInput>
    deleteMany?: Enumerable<UserDiscFavoritesScalarWhereInput>
  }

  export type ProductUncheckedUpdateManyWithoutDiscNestedInput = {
    create?: XOR<Enumerable<ProductCreateWithoutDiscInput>, Enumerable<ProductUncheckedCreateWithoutDiscInput>>
    connectOrCreate?: Enumerable<ProductCreateOrConnectWithoutDiscInput>
    upsert?: Enumerable<ProductUpsertWithWhereUniqueWithoutDiscInput>
    createMany?: ProductCreateManyDiscInputEnvelope
    set?: Enumerable<ProductWhereUniqueInput>
    disconnect?: Enumerable<ProductWhereUniqueInput>
    delete?: Enumerable<ProductWhereUniqueInput>
    connect?: Enumerable<ProductWhereUniqueInput>
    update?: Enumerable<ProductUpdateWithWhereUniqueWithoutDiscInput>
    updateMany?: Enumerable<ProductUpdateManyWithWhereWithoutDiscInput>
    deleteMany?: Enumerable<ProductScalarWhereInput>
  }

  export type UserDiscFavoritesUncheckedUpdateManyWithoutDiscNestedInput = {
    create?: XOR<Enumerable<UserDiscFavoritesCreateWithoutDiscInput>, Enumerable<UserDiscFavoritesUncheckedCreateWithoutDiscInput>>
    connectOrCreate?: Enumerable<UserDiscFavoritesCreateOrConnectWithoutDiscInput>
    upsert?: Enumerable<UserDiscFavoritesUpsertWithWhereUniqueWithoutDiscInput>
    createMany?: UserDiscFavoritesCreateManyDiscInputEnvelope
    set?: Enumerable<UserDiscFavoritesWhereUniqueInput>
    disconnect?: Enumerable<UserDiscFavoritesWhereUniqueInput>
    delete?: Enumerable<UserDiscFavoritesWhereUniqueInput>
    connect?: Enumerable<UserDiscFavoritesWhereUniqueInput>
    update?: Enumerable<UserDiscFavoritesUpdateWithWhereUniqueWithoutDiscInput>
    updateMany?: Enumerable<UserDiscFavoritesUpdateManyWithWhereWithoutDiscInput>
    deleteMany?: Enumerable<UserDiscFavoritesScalarWhereInput>
  }

  export type DiscCreateNestedOneWithoutUsersInput = {
    create?: XOR<DiscCreateWithoutUsersInput, DiscUncheckedCreateWithoutUsersInput>
    connectOrCreate?: DiscCreateOrConnectWithoutUsersInput
    connect?: DiscWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    connect?: UserWhereUniqueInput
  }

  export type DiscUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<DiscCreateWithoutUsersInput, DiscUncheckedCreateWithoutUsersInput>
    connectOrCreate?: DiscCreateOrConnectWithoutUsersInput
    upsert?: DiscUpsertWithoutUsersInput
    connect?: DiscWhereUniqueInput
    update?: XOR<DiscUpdateWithoutUsersInput, DiscUncheckedUpdateWithoutUsersInput>
  }

  export type UserUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    upsert?: UserUpsertWithoutFavoritesInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: Enumerable<AccountWhereUniqueInput>
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: Enumerable<SessionWhereUniqueInput>
  }

  export type UserDiscFavoritesCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<UserDiscFavoritesCreateWithoutUserInput>, Enumerable<UserDiscFavoritesUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserDiscFavoritesCreateOrConnectWithoutUserInput>
    createMany?: UserDiscFavoritesCreateManyUserInputEnvelope
    connect?: Enumerable<UserDiscFavoritesWhereUniqueInput>
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: Enumerable<AccountWhereUniqueInput>
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: Enumerable<SessionWhereUniqueInput>
  }

  export type UserDiscFavoritesUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<UserDiscFavoritesCreateWithoutUserInput>, Enumerable<UserDiscFavoritesUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserDiscFavoritesCreateOrConnectWithoutUserInput>
    createMany?: UserDiscFavoritesCreateManyUserInputEnvelope
    connect?: Enumerable<UserDiscFavoritesWhereUniqueInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<AccountUpsertWithWhereUniqueWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    set?: Enumerable<AccountWhereUniqueInput>
    disconnect?: Enumerable<AccountWhereUniqueInput>
    delete?: Enumerable<AccountWhereUniqueInput>
    connect?: Enumerable<AccountWhereUniqueInput>
    update?: Enumerable<AccountUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<AccountUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<AccountScalarWhereInput>
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<SessionUpsertWithWhereUniqueWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    set?: Enumerable<SessionWhereUniqueInput>
    disconnect?: Enumerable<SessionWhereUniqueInput>
    delete?: Enumerable<SessionWhereUniqueInput>
    connect?: Enumerable<SessionWhereUniqueInput>
    update?: Enumerable<SessionUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<SessionUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<SessionScalarWhereInput>
  }

  export type UserDiscFavoritesUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<UserDiscFavoritesCreateWithoutUserInput>, Enumerable<UserDiscFavoritesUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserDiscFavoritesCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<UserDiscFavoritesUpsertWithWhereUniqueWithoutUserInput>
    createMany?: UserDiscFavoritesCreateManyUserInputEnvelope
    set?: Enumerable<UserDiscFavoritesWhereUniqueInput>
    disconnect?: Enumerable<UserDiscFavoritesWhereUniqueInput>
    delete?: Enumerable<UserDiscFavoritesWhereUniqueInput>
    connect?: Enumerable<UserDiscFavoritesWhereUniqueInput>
    update?: Enumerable<UserDiscFavoritesUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<UserDiscFavoritesUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<UserDiscFavoritesScalarWhereInput>
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<AccountUpsertWithWhereUniqueWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    set?: Enumerable<AccountWhereUniqueInput>
    disconnect?: Enumerable<AccountWhereUniqueInput>
    delete?: Enumerable<AccountWhereUniqueInput>
    connect?: Enumerable<AccountWhereUniqueInput>
    update?: Enumerable<AccountUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<AccountUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<AccountScalarWhereInput>
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<SessionUpsertWithWhereUniqueWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    set?: Enumerable<SessionWhereUniqueInput>
    disconnect?: Enumerable<SessionWhereUniqueInput>
    delete?: Enumerable<SessionWhereUniqueInput>
    connect?: Enumerable<SessionWhereUniqueInput>
    update?: Enumerable<SessionUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<SessionUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<SessionScalarWhereInput>
  }

  export type UserDiscFavoritesUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<UserDiscFavoritesCreateWithoutUserInput>, Enumerable<UserDiscFavoritesUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<UserDiscFavoritesCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<UserDiscFavoritesUpsertWithWhereUniqueWithoutUserInput>
    createMany?: UserDiscFavoritesCreateManyUserInputEnvelope
    set?: Enumerable<UserDiscFavoritesWhereUniqueInput>
    disconnect?: Enumerable<UserDiscFavoritesWhereUniqueInput>
    delete?: Enumerable<UserDiscFavoritesWhereUniqueInput>
    connect?: Enumerable<UserDiscFavoritesWhereUniqueInput>
    update?: Enumerable<UserDiscFavoritesUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<UserDiscFavoritesUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<UserDiscFavoritesScalarWhereInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedBoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedFloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type ProductCreateWithoutStoreInput = {
    loc: string
    lastmod: string
    title: string
    description: string
    imageUrl: string
    isDisc?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    disc?: DiscCreateNestedOneWithoutProductsInput
    prices?: ProductPriceCreateNestedManyWithoutProductInput
    latestPrice?: number
  }

  export type ProductUncheckedCreateWithoutStoreInput = {
    id?: number
    loc: string
    lastmod: string
    title: string
    description: string
    imageUrl: string
    isDisc?: boolean | null
    discId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prices?: ProductPriceUncheckedCreateNestedManyWithoutProductInput
    latestPrice?: number
  }

  export type ProductCreateOrConnectWithoutStoreInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutStoreInput, ProductUncheckedCreateWithoutStoreInput>
  }

  export type ProductCreateManyStoreInputEnvelope = {
    data: Enumerable<ProductCreateManyStoreInput>
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithWhereUniqueWithoutStoreInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutStoreInput, ProductUncheckedUpdateWithoutStoreInput>
    create: XOR<ProductCreateWithoutStoreInput, ProductUncheckedCreateWithoutStoreInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutStoreInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutStoreInput, ProductUncheckedUpdateWithoutStoreInput>
  }

  export type ProductUpdateManyWithWhereWithoutStoreInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutProductsInput>
  }

  export type ProductScalarWhereInput = {
    AND?: Enumerable<ProductScalarWhereInput>
    OR?: Enumerable<ProductScalarWhereInput>
    NOT?: Enumerable<ProductScalarWhereInput>
    id?: IntFilter | number
    loc?: StringFilter | string
    lastmod?: StringFilter | string
    title?: StringFilter | string
    description?: StringFilter | string
    imageUrl?: StringFilter | string
    isDisc?: BoolNullableFilter | boolean | null
    storeId?: IntFilter | number
    discId?: IntNullableFilter | number | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    latestPrice?: FloatFilter | number
  }

  export type DiscCreateWithoutProductsInput = {
    name: string
    description: string
    imageUrl: string
    speed: number
    glide: number
    turn: number
    fade: number
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    slug: string
    brand: BrandCreateNestedOneWithoutDiscsInput
    users?: UserDiscFavoritesCreateNestedManyWithoutDiscInput
    views?: number
  }

  export type DiscUncheckedCreateWithoutProductsInput = {
    id?: number
    name: string
    description: string
    imageUrl: string
    speed: number
    glide: number
    turn: number
    fade: number
    brandId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    slug: string
    users?: UserDiscFavoritesUncheckedCreateNestedManyWithoutDiscInput
    views?: number
  }

  export type DiscCreateOrConnectWithoutProductsInput = {
    where: DiscWhereUniqueInput
    create: XOR<DiscCreateWithoutProductsInput, DiscUncheckedCreateWithoutProductsInput>
  }

  export type StoreCreateWithoutProductsInput = {
    name: string
    description?: string
    imageUrl?: string
    baseUrl: string
    sitemapUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
  }

  export type StoreUncheckedCreateWithoutProductsInput = {
    id?: number
    name: string
    description?: string
    imageUrl?: string
    baseUrl: string
    sitemapUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
  }

  export type StoreCreateOrConnectWithoutProductsInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutProductsInput, StoreUncheckedCreateWithoutProductsInput>
  }

  export type ProductPriceCreateWithoutProductInput = {
    amount: number
    currency: string
    createdAt?: Date | string
  }

  export type ProductPriceUncheckedCreateWithoutProductInput = {
    id?: number
    amount: number
    currency: string
    createdAt?: Date | string
  }

  export type ProductPriceCreateOrConnectWithoutProductInput = {
    where: ProductPriceWhereUniqueInput
    create: XOR<ProductPriceCreateWithoutProductInput, ProductPriceUncheckedCreateWithoutProductInput>
  }

  export type ProductPriceCreateManyProductInputEnvelope = {
    data: Enumerable<ProductPriceCreateManyProductInput>
    skipDuplicates?: boolean
  }

  export type DiscUpsertWithoutProductsInput = {
    update: XOR<DiscUpdateWithoutProductsInput, DiscUncheckedUpdateWithoutProductsInput>
    create: XOR<DiscCreateWithoutProductsInput, DiscUncheckedCreateWithoutProductsInput>
  }

  export type DiscUpdateWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    speed?: FloatFieldUpdateOperationsInput | number
    glide?: FloatFieldUpdateOperationsInput | number
    turn?: FloatFieldUpdateOperationsInput | number
    fade?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    brand?: BrandUpdateOneRequiredWithoutDiscsNestedInput
    users?: UserDiscFavoritesUpdateManyWithoutDiscNestedInput
    views?: IntFieldUpdateOperationsInput | number
  }

  export type DiscUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    speed?: FloatFieldUpdateOperationsInput | number
    glide?: FloatFieldUpdateOperationsInput | number
    turn?: FloatFieldUpdateOperationsInput | number
    fade?: FloatFieldUpdateOperationsInput | number
    brandId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    users?: UserDiscFavoritesUncheckedUpdateManyWithoutDiscNestedInput
    views?: IntFieldUpdateOperationsInput | number
  }

  export type StoreUpsertWithoutProductsInput = {
    update: XOR<StoreUpdateWithoutProductsInput, StoreUncheckedUpdateWithoutProductsInput>
    create: XOR<StoreCreateWithoutProductsInput, StoreUncheckedCreateWithoutProductsInput>
  }

  export type StoreUpdateWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    sitemapUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type StoreUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    sitemapUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type ProductPriceUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductPriceWhereUniqueInput
    update: XOR<ProductPriceUpdateWithoutProductInput, ProductPriceUncheckedUpdateWithoutProductInput>
    create: XOR<ProductPriceCreateWithoutProductInput, ProductPriceUncheckedCreateWithoutProductInput>
  }

  export type ProductPriceUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductPriceWhereUniqueInput
    data: XOR<ProductPriceUpdateWithoutProductInput, ProductPriceUncheckedUpdateWithoutProductInput>
  }

  export type ProductPriceUpdateManyWithWhereWithoutProductInput = {
    where: ProductPriceScalarWhereInput
    data: XOR<ProductPriceUpdateManyMutationInput, ProductPriceUncheckedUpdateManyWithoutPricesInput>
  }

  export type ProductPriceScalarWhereInput = {
    AND?: Enumerable<ProductPriceScalarWhereInput>
    OR?: Enumerable<ProductPriceScalarWhereInput>
    NOT?: Enumerable<ProductPriceScalarWhereInput>
    id?: IntFilter | number
    amount?: FloatFilter | number
    currency?: StringFilter | string
    productId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
  }

  export type ProductCreateWithoutPricesInput = {
    loc: string
    lastmod: string
    title: string
    description: string
    imageUrl: string
    isDisc?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    disc?: DiscCreateNestedOneWithoutProductsInput
    store: StoreCreateNestedOneWithoutProductsInput
    latestPrice?: number
  }

  export type ProductUncheckedCreateWithoutPricesInput = {
    id?: number
    loc: string
    lastmod: string
    title: string
    description: string
    imageUrl: string
    isDisc?: boolean | null
    storeId: number
    discId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    latestPrice?: number
  }

  export type ProductCreateOrConnectWithoutPricesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutPricesInput, ProductUncheckedCreateWithoutPricesInput>
  }

  export type ProductUpsertWithoutPricesInput = {
    update: XOR<ProductUpdateWithoutPricesInput, ProductUncheckedUpdateWithoutPricesInput>
    create: XOR<ProductCreateWithoutPricesInput, ProductUncheckedCreateWithoutPricesInput>
  }

  export type ProductUpdateWithoutPricesInput = {
    loc?: StringFieldUpdateOperationsInput | string
    lastmod?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isDisc?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    disc?: DiscUpdateOneWithoutProductsNestedInput
    store?: StoreUpdateOneRequiredWithoutProductsNestedInput
    latestPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type ProductUncheckedUpdateWithoutPricesInput = {
    id?: IntFieldUpdateOperationsInput | number
    loc?: StringFieldUpdateOperationsInput | string
    lastmod?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isDisc?: NullableBoolFieldUpdateOperationsInput | boolean | null
    storeId?: IntFieldUpdateOperationsInput | number
    discId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    latestPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type DiscCreateWithoutBrandInput = {
    name: string
    description: string
    imageUrl: string
    speed: number
    glide: number
    turn: number
    fade: number
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    slug: string
    products?: ProductCreateNestedManyWithoutDiscInput
    users?: UserDiscFavoritesCreateNestedManyWithoutDiscInput
    views?: number
  }

  export type DiscUncheckedCreateWithoutBrandInput = {
    id?: number
    name: string
    description: string
    imageUrl: string
    speed: number
    glide: number
    turn: number
    fade: number
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    slug: string
    products?: ProductUncheckedCreateNestedManyWithoutDiscInput
    users?: UserDiscFavoritesUncheckedCreateNestedManyWithoutDiscInput
    views?: number
  }

  export type DiscCreateOrConnectWithoutBrandInput = {
    where: DiscWhereUniqueInput
    create: XOR<DiscCreateWithoutBrandInput, DiscUncheckedCreateWithoutBrandInput>
  }

  export type DiscCreateManyBrandInputEnvelope = {
    data: Enumerable<DiscCreateManyBrandInput>
    skipDuplicates?: boolean
  }

  export type DiscUpsertWithWhereUniqueWithoutBrandInput = {
    where: DiscWhereUniqueInput
    update: XOR<DiscUpdateWithoutBrandInput, DiscUncheckedUpdateWithoutBrandInput>
    create: XOR<DiscCreateWithoutBrandInput, DiscUncheckedCreateWithoutBrandInput>
  }

  export type DiscUpdateWithWhereUniqueWithoutBrandInput = {
    where: DiscWhereUniqueInput
    data: XOR<DiscUpdateWithoutBrandInput, DiscUncheckedUpdateWithoutBrandInput>
  }

  export type DiscUpdateManyWithWhereWithoutBrandInput = {
    where: DiscScalarWhereInput
    data: XOR<DiscUpdateManyMutationInput, DiscUncheckedUpdateManyWithoutDiscsInput>
  }

  export type DiscScalarWhereInput = {
    AND?: Enumerable<DiscScalarWhereInput>
    OR?: Enumerable<DiscScalarWhereInput>
    NOT?: Enumerable<DiscScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    description?: StringFilter | string
    imageUrl?: StringFilter | string
    speed?: FloatFilter | number
    glide?: FloatFilter | number
    turn?: FloatFilter | number
    fade?: FloatFilter | number
    brandId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    type?: StringFilter | string
    slug?: StringFilter | string
    views?: IntFilter | number
  }

  export type BrandCreateWithoutDiscsInput = {
    name: string
    description: string
    url: string
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
  }

  export type BrandUncheckedCreateWithoutDiscsInput = {
    id?: number
    name: string
    description: string
    url: string
    imageUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    slug: string
  }

  export type BrandCreateOrConnectWithoutDiscsInput = {
    where: BrandWhereUniqueInput
    create: XOR<BrandCreateWithoutDiscsInput, BrandUncheckedCreateWithoutDiscsInput>
  }

  export type ProductCreateWithoutDiscInput = {
    loc: string
    lastmod: string
    title: string
    description: string
    imageUrl: string
    isDisc?: boolean | null
    createdAt?: Date | string
    updatedAt?: Date | string
    store: StoreCreateNestedOneWithoutProductsInput
    prices?: ProductPriceCreateNestedManyWithoutProductInput
    latestPrice?: number
  }

  export type ProductUncheckedCreateWithoutDiscInput = {
    id?: number
    loc: string
    lastmod: string
    title: string
    description: string
    imageUrl: string
    isDisc?: boolean | null
    storeId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    prices?: ProductPriceUncheckedCreateNestedManyWithoutProductInput
    latestPrice?: number
  }

  export type ProductCreateOrConnectWithoutDiscInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutDiscInput, ProductUncheckedCreateWithoutDiscInput>
  }

  export type ProductCreateManyDiscInputEnvelope = {
    data: Enumerable<ProductCreateManyDiscInput>
    skipDuplicates?: boolean
  }

  export type UserDiscFavoritesCreateWithoutDiscInput = {
    User: UserCreateNestedOneWithoutFavoritesInput
  }

  export type UserDiscFavoritesUncheckedCreateWithoutDiscInput = {
    userId: string
  }

  export type UserDiscFavoritesCreateOrConnectWithoutDiscInput = {
    where: UserDiscFavoritesWhereUniqueInput
    create: XOR<UserDiscFavoritesCreateWithoutDiscInput, UserDiscFavoritesUncheckedCreateWithoutDiscInput>
  }

  export type UserDiscFavoritesCreateManyDiscInputEnvelope = {
    data: Enumerable<UserDiscFavoritesCreateManyDiscInput>
    skipDuplicates?: boolean
  }

  export type BrandUpsertWithoutDiscsInput = {
    update: XOR<BrandUpdateWithoutDiscsInput, BrandUncheckedUpdateWithoutDiscsInput>
    create: XOR<BrandCreateWithoutDiscsInput, BrandUncheckedCreateWithoutDiscsInput>
  }

  export type BrandUpdateWithoutDiscsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type BrandUncheckedUpdateWithoutDiscsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type ProductUpsertWithWhereUniqueWithoutDiscInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutDiscInput, ProductUncheckedUpdateWithoutDiscInput>
    create: XOR<ProductCreateWithoutDiscInput, ProductUncheckedCreateWithoutDiscInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutDiscInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutDiscInput, ProductUncheckedUpdateWithoutDiscInput>
  }

  export type ProductUpdateManyWithWhereWithoutDiscInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutProductsInput>
  }

  export type UserDiscFavoritesUpsertWithWhereUniqueWithoutDiscInput = {
    where: UserDiscFavoritesWhereUniqueInput
    update: XOR<UserDiscFavoritesUpdateWithoutDiscInput, UserDiscFavoritesUncheckedUpdateWithoutDiscInput>
    create: XOR<UserDiscFavoritesCreateWithoutDiscInput, UserDiscFavoritesUncheckedCreateWithoutDiscInput>
  }

  export type UserDiscFavoritesUpdateWithWhereUniqueWithoutDiscInput = {
    where: UserDiscFavoritesWhereUniqueInput
    data: XOR<UserDiscFavoritesUpdateWithoutDiscInput, UserDiscFavoritesUncheckedUpdateWithoutDiscInput>
  }

  export type UserDiscFavoritesUpdateManyWithWhereWithoutDiscInput = {
    where: UserDiscFavoritesScalarWhereInput
    data: XOR<UserDiscFavoritesUpdateManyMutationInput, UserDiscFavoritesUncheckedUpdateManyWithoutUsersInput>
  }

  export type UserDiscFavoritesScalarWhereInput = {
    AND?: Enumerable<UserDiscFavoritesScalarWhereInput>
    OR?: Enumerable<UserDiscFavoritesScalarWhereInput>
    NOT?: Enumerable<UserDiscFavoritesScalarWhereInput>
    discId?: IntFilter | number
    userId?: StringFilter | string
  }

  export type DiscCreateWithoutUsersInput = {
    name: string
    description: string
    imageUrl: string
    speed: number
    glide: number
    turn: number
    fade: number
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    slug: string
    brand: BrandCreateNestedOneWithoutDiscsInput
    products?: ProductCreateNestedManyWithoutDiscInput
    views?: number
  }

  export type DiscUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    description: string
    imageUrl: string
    speed: number
    glide: number
    turn: number
    fade: number
    brandId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    slug: string
    products?: ProductUncheckedCreateNestedManyWithoutDiscInput
    views?: number
  }

  export type DiscCreateOrConnectWithoutUsersInput = {
    where: DiscWhereUniqueInput
    create: XOR<DiscCreateWithoutUsersInput, DiscUncheckedCreateWithoutUsersInput>
  }

  export type UserCreateWithoutFavoritesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    role?: string
  }

  export type UserUncheckedCreateWithoutFavoritesInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    role?: string
  }

  export type UserCreateOrConnectWithoutFavoritesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
  }

  export type DiscUpsertWithoutUsersInput = {
    update: XOR<DiscUpdateWithoutUsersInput, DiscUncheckedUpdateWithoutUsersInput>
    create: XOR<DiscCreateWithoutUsersInput, DiscUncheckedCreateWithoutUsersInput>
  }

  export type DiscUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    speed?: FloatFieldUpdateOperationsInput | number
    glide?: FloatFieldUpdateOperationsInput | number
    turn?: FloatFieldUpdateOperationsInput | number
    fade?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    brand?: BrandUpdateOneRequiredWithoutDiscsNestedInput
    products?: ProductUpdateManyWithoutDiscNestedInput
    views?: IntFieldUpdateOperationsInput | number
  }

  export type DiscUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    speed?: FloatFieldUpdateOperationsInput | number
    glide?: FloatFieldUpdateOperationsInput | number
    turn?: FloatFieldUpdateOperationsInput | number
    fade?: FloatFieldUpdateOperationsInput | number
    brandId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    products?: ProductUncheckedUpdateManyWithoutDiscNestedInput
    views?: IntFieldUpdateOperationsInput | number
  }

  export type UserUpsertWithoutFavoritesInput = {
    update: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
  }

  export type UserUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    role?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    role?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    role?: string
    favorites?: UserDiscFavoritesCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    role?: string
    favorites?: UserDiscFavoritesUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    role?: StringFieldUpdateOperationsInput | string
    favorites?: UserDiscFavoritesUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    role?: StringFieldUpdateOperationsInput | string
    favorites?: UserDiscFavoritesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    role?: string
    favorites?: UserDiscFavoritesCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    role?: string
    favorites?: UserDiscFavoritesUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    role?: StringFieldUpdateOperationsInput | string
    favorites?: UserDiscFavoritesUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    role?: StringFieldUpdateOperationsInput | string
    favorites?: UserDiscFavoritesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: Enumerable<AccountCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: Enumerable<SessionCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type UserDiscFavoritesCreateWithoutUserInput = {
    disc: DiscCreateNestedOneWithoutUsersInput
  }

  export type UserDiscFavoritesUncheckedCreateWithoutUserInput = {
    discId: number
  }

  export type UserDiscFavoritesCreateOrConnectWithoutUserInput = {
    where: UserDiscFavoritesWhereUniqueInput
    create: XOR<UserDiscFavoritesCreateWithoutUserInput, UserDiscFavoritesUncheckedCreateWithoutUserInput>
  }

  export type UserDiscFavoritesCreateManyUserInputEnvelope = {
    data: Enumerable<UserDiscFavoritesCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutAccountsInput>
  }

  export type AccountScalarWhereInput = {
    AND?: Enumerable<AccountScalarWhereInput>
    OR?: Enumerable<AccountScalarWhereInput>
    NOT?: Enumerable<AccountScalarWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    type?: StringFilter | string
    provider?: StringFilter | string
    providerAccountId?: StringFilter | string
    refresh_token?: StringNullableFilter | string | null
    access_token?: StringNullableFilter | string | null
    expires_at?: IntNullableFilter | number | null
    token_type?: StringNullableFilter | string | null
    scope?: StringNullableFilter | string | null
    id_token?: StringNullableFilter | string | null
    session_state?: StringNullableFilter | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutSessionsInput>
  }

  export type SessionScalarWhereInput = {
    AND?: Enumerable<SessionScalarWhereInput>
    OR?: Enumerable<SessionScalarWhereInput>
    NOT?: Enumerable<SessionScalarWhereInput>
    id?: StringFilter | string
    sessionToken?: StringFilter | string
    userId?: StringFilter | string
    expires?: DateTimeFilter | Date | string
  }

  export type UserDiscFavoritesUpsertWithWhereUniqueWithoutUserInput = {
    where: UserDiscFavoritesWhereUniqueInput
    update: XOR<UserDiscFavoritesUpdateWithoutUserInput, UserDiscFavoritesUncheckedUpdateWithoutUserInput>
    create: XOR<UserDiscFavoritesCreateWithoutUserInput, UserDiscFavoritesUncheckedCreateWithoutUserInput>
  }

  export type UserDiscFavoritesUpdateWithWhereUniqueWithoutUserInput = {
    where: UserDiscFavoritesWhereUniqueInput
    data: XOR<UserDiscFavoritesUpdateWithoutUserInput, UserDiscFavoritesUncheckedUpdateWithoutUserInput>
  }

  export type UserDiscFavoritesUpdateManyWithWhereWithoutUserInput = {
    where: UserDiscFavoritesScalarWhereInput
    data: XOR<UserDiscFavoritesUpdateManyMutationInput, UserDiscFavoritesUncheckedUpdateManyWithoutFavoritesInput>
  }

  export type ProductCreateManyStoreInput = {
    id?: number
    loc: string
    lastmod: string
    title: string
    description: string
    imageUrl: string
    isDisc?: boolean | null
    discId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    latestPrice?: number
  }

  export type ProductUpdateWithoutStoreInput = {
    loc?: StringFieldUpdateOperationsInput | string
    lastmod?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isDisc?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    disc?: DiscUpdateOneWithoutProductsNestedInput
    prices?: ProductPriceUpdateManyWithoutProductNestedInput
    latestPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type ProductUncheckedUpdateWithoutStoreInput = {
    id?: IntFieldUpdateOperationsInput | number
    loc?: StringFieldUpdateOperationsInput | string
    lastmod?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isDisc?: NullableBoolFieldUpdateOperationsInput | boolean | null
    discId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prices?: ProductPriceUncheckedUpdateManyWithoutProductNestedInput
    latestPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type ProductUncheckedUpdateManyWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    loc?: StringFieldUpdateOperationsInput | string
    lastmod?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isDisc?: NullableBoolFieldUpdateOperationsInput | boolean | null
    discId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    latestPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type ProductPriceCreateManyProductInput = {
    id?: number
    amount: number
    currency: string
    createdAt?: Date | string
  }

  export type ProductPriceUpdateWithoutProductInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductPriceUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductPriceUncheckedUpdateManyWithoutPricesInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiscCreateManyBrandInput = {
    id?: number
    name: string
    description: string
    imageUrl: string
    speed: number
    glide: number
    turn: number
    fade: number
    createdAt?: Date | string
    updatedAt?: Date | string
    type: string
    slug: string
    views?: number
  }

  export type DiscUpdateWithoutBrandInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    speed?: FloatFieldUpdateOperationsInput | number
    glide?: FloatFieldUpdateOperationsInput | number
    turn?: FloatFieldUpdateOperationsInput | number
    fade?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    products?: ProductUpdateManyWithoutDiscNestedInput
    users?: UserDiscFavoritesUpdateManyWithoutDiscNestedInput
    views?: IntFieldUpdateOperationsInput | number
  }

  export type DiscUncheckedUpdateWithoutBrandInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    speed?: FloatFieldUpdateOperationsInput | number
    glide?: FloatFieldUpdateOperationsInput | number
    turn?: FloatFieldUpdateOperationsInput | number
    fade?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    products?: ProductUncheckedUpdateManyWithoutDiscNestedInput
    users?: UserDiscFavoritesUncheckedUpdateManyWithoutDiscNestedInput
    views?: IntFieldUpdateOperationsInput | number
  }

  export type DiscUncheckedUpdateManyWithoutDiscsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    speed?: FloatFieldUpdateOperationsInput | number
    glide?: FloatFieldUpdateOperationsInput | number
    turn?: FloatFieldUpdateOperationsInput | number
    fade?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    views?: IntFieldUpdateOperationsInput | number
  }

  export type ProductCreateManyDiscInput = {
    id?: number
    loc: string
    lastmod: string
    title: string
    description: string
    imageUrl: string
    isDisc?: boolean | null
    storeId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    latestPrice?: number
  }

  export type UserDiscFavoritesCreateManyDiscInput = {
    userId: string
  }

  export type ProductUpdateWithoutDiscInput = {
    loc?: StringFieldUpdateOperationsInput | string
    lastmod?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isDisc?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutProductsNestedInput
    prices?: ProductPriceUpdateManyWithoutProductNestedInput
    latestPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type ProductUncheckedUpdateWithoutDiscInput = {
    id?: IntFieldUpdateOperationsInput | number
    loc?: StringFieldUpdateOperationsInput | string
    lastmod?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isDisc?: NullableBoolFieldUpdateOperationsInput | boolean | null
    storeId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prices?: ProductPriceUncheckedUpdateManyWithoutProductNestedInput
    latestPrice?: FloatFieldUpdateOperationsInput | number
  }

  export type UserDiscFavoritesUpdateWithoutDiscInput = {
    User?: UserUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type UserDiscFavoritesUncheckedUpdateWithoutDiscInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserDiscFavoritesUncheckedUpdateManyWithoutUsersInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type UserDiscFavoritesCreateManyUserInput = {
    discId: number
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDiscFavoritesUpdateWithoutUserInput = {
    disc?: DiscUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserDiscFavoritesUncheckedUpdateWithoutUserInput = {
    discId?: IntFieldUpdateOperationsInput | number
  }

  export type UserDiscFavoritesUncheckedUpdateManyWithoutFavoritesInput = {
    discId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}