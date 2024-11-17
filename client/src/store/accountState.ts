import { makeAutoObservable } from 'mobx'
import { AccountDataType } from '../models/Account'

class AccountState {
  accountData: AccountDataType | null = null
  websocket: WebSocket | null = null
  constructor() {
    makeAutoObservable(this)
  }

  setAccountData(tool: AccountDataType) {
    this.accountData = tool
  }

  setWebsocket(websocket: WebSocket) {
    this.websocket = websocket
  }
}

export default new AccountState()
