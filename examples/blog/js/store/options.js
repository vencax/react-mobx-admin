import { observable, computed, toJS, action, transaction } from 'mobx'
import TranslatStore from './transl'

export default class OptionsStore extends TranslatStore {

  options = {
    categories: () => [
      {value: 'tech', label: 'Technology'},
      {value: 'art', label: 'Art'},
    ]
  }

  // one of possible options loading ...
  @action loadOptions(name, query) {
    return this.requester.call(query)
    .then((result) => {
      this.options[name] = result.data
    })
    .catch(this.onError.bind(this))
  }

}
