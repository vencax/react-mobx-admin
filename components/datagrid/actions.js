import React from 'react'
import { observer } from 'mobx-react'

@observer
class DatagridActions extends React.Component {

  static propTypes = {
    actions: React.PropTypes.func.isRequired,
    state: React.PropTypes.object.isRequired
  }

  render() {
    const { state, actions } = this.props

    if(state.currentView.selection.length > 0) {
      return actions(state)
    } else {
      return null
    }
  }

}

export default DatagridActions
