import { makeAutoObservable } from 'mobx'

class UserStore {
  constructor() {
    makeAutoObservable(this)
  }

  public user: Record<string, any> = {}

  setUser(user: Record<string, any>) {
    this.user = user
  }
}

export const userStore = new UserStore()
