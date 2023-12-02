import { bot } from '../config.json'
import('./BlueberryClient.js').then(a => new a.default().login(bot.token))
