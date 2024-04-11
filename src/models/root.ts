import { ReactModel } from '../bindings'
import { PaintingModel } from './painting'

class RootModel extends ReactModel {
  painting: PaintingModel
  users: Set<string>

  init(options) {
    super.init(options)
    this.painting = PaintingModel.create(options)

    this.users = new Set()
    this.subscribe(this.sessionId, 'view-join', this.userJoined)
    this.subscribe(this.sessionId, 'view-exit', this.userLeft)
  }

  userJoined(viewId) {
    this.users.add(viewId)
    this.publish(this.id, 'userJoined', viewId)
  }
  userLeft(viewId) {
    this.users.delete(viewId)
    this.publish(this.id, 'userLeft', viewId)
  }
}

RootModel.register('RootModel')

export default RootModel
