import {Pool, PoolConfig} from "mysql";
import connection, {PoolAwait} from './mysql-await-custom';


export default class MysqlClient {

    private static instance: PoolAwait;

    static getInstance(params?: PoolConfig): PoolAwait {
        if(!MysqlClient.instance) {
            if(!params) {
                params = {
                    connectionLimit : 25,
                    host     : 'localhost',
                    user     : 'root',
                    password : '',
                    database : 'visualization',
                    port: 3306
                };
            }
            // @ts-ignore
            MysqlClient.instance = connection.createPool(params);
        }

        return MysqlClient.instance;
    }
}