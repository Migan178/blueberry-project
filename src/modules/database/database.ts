import { mysql } from '../../../config.json'
import { createPool } from 'mysql2/promise'
import { UserTable } from './models/index.js'

export class BlueberryDatabase {
  private _database = createPool({
    ...mysql,
    keepAliveInitialDelay: 10000,
    enableKeepAlive: true,
  })

  public get user() {
    return new UserTable(this._database)
  }

  public async ping() {
    const db = await this._database.getConnection()
    await db.ping()
    db.release()
  }
}
