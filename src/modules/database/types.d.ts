import { RowDataPacket } from 'mysql2/promise'
import { Snowflake } from 'discord.js'

export interface UserData extends RowDataPacket {
  id: number
  user_id: Snowflake
  coin: number
  created_at: Date
}

export interface BaseTable<T, V> {
  name: string
  all(): Promise<T[]>
  findOne(key: V): Promise<T[]>
  findOneAnotherKey(key: string, data: any): Promise<T[]>
  insert(data: any): Promise<void>
  update(data: any): Promise<void>
  delete(key: V): Promise<void>
}
