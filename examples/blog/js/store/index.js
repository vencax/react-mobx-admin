import { observable, computed, toJS, action, transaction } from 'mobx'
import { RouterStore } from 'mobx-router'
import OptionsStore from './options'

import {PostTableState, PostManipState} from './posts'
import {TagTableState, TagManipState} from './tags'

export default class StateStore extends OptionsStore {

  constructor(views) {
    super()
    this.router = new RouterStore()
    this.views = views

    this.manipStores = {
      'tags': TagManipState,
      'posts': PostManipState
    }
    this.listStores = {
      'tags': TagTableState,
      'posts': PostTableState
    }
  }

  showEntityUpdateView(entityname, id) {
    const StoreClass = this.manipStores[entityname]
    if (StoreClass === undefined) {
      return this.on404('unknown entity ' + entityname)
    }
    id = (id && id !== '_new') ? id : null
    this.cv = new StoreClass(this,
      (id) => this.requester.getEntry(entityname, id).catch(this.onError),
      (data) => this.requester.saveEntry(entityname, data, data.id)
    )
    this.cv.load(id)
  }

  showEntityListView() {
    const entityname = this.router.params.entityname
    const StoreClass = this.listStores[entityname]
    if (StoreClass === undefined) {
      return this.on404('unknown entity ' + entityname)
    }
    const getEntries = (opts) => this.requester.getEntries(entityname, opts)
    this.cv = new StoreClass(this, this.router, getEntries, (newQPars) => {
      this.router.goTo(this.router.currentView, this.router.params, this, newQPars)
    })
    this.cv.init()
  }

  beforeListViewExit() {
    const queryParamsBackup = Object.assign({}, this.router.queryParams)
    this.listQParamsBackup = queryParamsBackup
  }

  onListParamsChange(origParams, origQueryParams) {
    if (origParams.entityname !== this.router.params.entityname) {
      return this.showEntityListView()
    }
    return this.cv.refresh().catch(this.onError.bind(this))
  }

  detailClicked(row) {
    this.router.goTo(this.views.entity_detail, {
      entityname: this.router.params.entityname,
      id: row[this.cv.pkName || 'id']
    }, this)
  }

  goTo(view, params, queryParams={}) {
    this.router.goTo(this.views[view], params, this, queryParams)
  }

  addClicked() {
    this.router.goTo(this.views.entity_detail, {
      entityname: this.router.params.entityname,
      id: '_new'
    }, this)
  }

  // overrided method adding catch handler
  saveEntity(onReturn2list) {
    super.saveEntity(onReturn2list).catch(this.onError.bind(this))
  }

  beforeListViewEnter() {
    // TODO: dodelat
  }

  onReturn2list() {
    this.router.goTo(this.views.entity_list, {
      entityname: this.router.params.entityname
    }, this, this.cv.listQParamsBackup || {_page: 1})
  }

  @observable messages = observable.shallowMap({})

  @action addMessage(text, type, timeout = 0) {
    const message = {text, type, timeout}
    this.messages.set(text, message)
    if(timeout > 0) {
      function _remove() {
        this.messages.delete(text)
      }
      setTimeout(_remove.bind(this), timeout)
    }
    return message
  }

  @action removeMessage(message) {
    this.messages.delete(message.text)
  }

}
