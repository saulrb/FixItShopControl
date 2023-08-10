import type { Knex } from 'knex'
import Config from '../config'
import { Connection } from 'pg';

// Update with your config settings.
const config: Knex.Config = {
  client: Config.database?.engine,
  connection: {
    database: Config.database?.database,
    user: Config.database?.username,
    password: Config.database?.password
  },
  pool: {
    min: 2,
    max: 10,
    afterCreate: function (conn:any, done:any) {
      conn.query("SET SESSION SCHEMA 'fixshopcontrol';", function(err:any) {
        if(err) {
          done(err,conn);
        } else {
          done(err,conn);
        }  
      });
    }
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}

export const db = require('knex')(config)

export default config