import {QueryConfig, QueryResult, QueryResultRow} from "pg";
import MysqlClient from "./mysql.client";
import {Query} from "mysql";
import {PoolAwait} from "./mysql-await-custom";

export default class BaseMysqlRepository {
  protected client: PoolAwait;

  /**
   *
   */
  constructor() {
    this.client = MysqlClient.getInstance();
  }

  /**
   *
   * @param {string | QueryConfig<I>} queryTextOrConfig
   * @param {I} values
   * @returns {Promise<QueryResult<R> | undefined>}
   */
  async query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryTextOrConfig: string | QueryConfig<I>,
    values?: I,
  ): Promise<Query | undefined> {
    try {

      const connection = await this.client.awaitGetConnection();
      const response = await connection.awaitQuery(queryTextOrConfig, values);
      // @ts-ignore
      connection.release();


      console.log(JSON.stringify({query: queryTextOrConfig, values}));
      return response;
    } catch (e) {
      console.log('Postgres Error');
      console.log(e);
    }
  };
}
