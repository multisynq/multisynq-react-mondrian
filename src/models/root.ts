import { ReactModel } from '@multisynq/react'
import { PaintingModel } from './painting'

class RootModel extends ReactModel {
  painting: PaintingModel

  init(options) {
    super.init(options)
    this.painting = PaintingModel.create(options)
  }

  handleViewJoin(viewId) {
    console.log('view joined', viewId)
  }
  handleViewExit(viewId) {
    console.log('view exited', viewId)
  }
}

RootModel.register('RootModel')

export default RootModel
