import type { BaseTable, UserData } from '../types.js'
import { type Pool } from 'mysql2/promise'
import { Snowflake } from 'discord.js'
import run from '../functions.js'

export class UserTable implements BaseTable<UserData, number> {
  public constructor(private _database: Pool) {}
  public name = 'user'

  public async all(): Promise<UserData[]> {
    const [rows] = await this._database.execute<UserData[]>(
      'select * from user;',
    )
    return rows
  }

  public async findOne(key: number): Promise<UserData[]> {
    const [rows] = await this._database.execute<UserData[]>(
      'select * from user where id = ?;',
      [key],
    )
    return rows
  }

  public async findOneAnotherKey(
    key: 'user' | 'coin' | 'created_at',
    data: any,
  ): Promise<UserData[]> {
    const [rows] = await this._database.execute<UserData[]>(
      `select * from user where ${key} = ?;`,
      [data],
    )
    return rows
  }

  public async insert(data: { id: number; user_id: Snowflake }): Promise<void> {
    const db = await this._database.getConnection()
    await run(db, async () => {
      await db.execute('insert into user (id, user_id) values (?, ?);', [
        data.id,
        data.user_id,
      ])
    })
  }

  public async update(data: {
    coin: number
    user_id: Snowflake
  }): Promise<void> {
    const db = await this._database.getConnection()
    await run(db, async () => {
      await db.execute('update user set coin = ? where user_id = ?;', [
        data.coin,
        data.user_id,
      ])
    })
  }

  public async delete(key: number): Promise<void> {
    const db = await this._database.getConnection()
    await run(db, async () => {
      await db.execute('delete from user where user_id = ?;', [key])
    })
  }
}
