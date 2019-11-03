import { observable, extendObservable, computed, action } from 'mobx'
import deepEqual from 'deep-equal'

export default class DataManipStore {

  @observable record = {}
  @observable errors = new Map()
  @observable state = 'loading'

  pkName = 'id'

  // all these 3 mothods must be overriden and return Promise
  loadEntry () { throw new Error('implement loadEntry!!') }
  saveEntry () { throw new Error('implement saveEntry!!') }
  initNew () { throw new Error('implement initNew!!') }
  // this oune shall be overriden, no one wants to alert some unreadables
  processError (err) { alert(err) }

  @action load (id) {
    this.state = 'loading'
    const promise = id ? this.loadEntry(id) : this.initNew()
    return promise.then(this.onLoaded.bind(this))
  }

  reload () {
    const id = this.record[this.pkName]
    return this.loadEntry(id).then(this.onLoaded.bind(this))
  }

  @action onLoaded (record) {
    this.origRecord = Object.assign({}, record)  // deep clone :)
    this.record = record
    this.runValidators()
    this.state = 'ready'
  }

  // called on each update of edit form.
  // validation performed if got some validators
  @action updateData (fieldName, value) {
    value = value === '' ? null : value
    this.record[fieldName] = value
    this.runValidators()
    this.onFieldChange && this.onFieldChange(fieldName, value)
  }

  @action runValidators () {
    const validators = this.validators || []
    for (let fieldName in validators) {
      this.validateField(fieldName, this.record[fieldName])
    }
  }

  validateField (fieldName, value) {
    if (this.validators && this.validators[fieldName]) {
      const validatorFn = this.validators[fieldName].bind(this)
      const error = validatorFn(value, this.errors)
      if(!error && this.errors.has(fieldName)) {
        this.errors.delete(fieldName)
      } else if (error) {
        this.errors.set(fieldName, error)
      }
    }
  }

  @computed get hasEntityChanged() {
    return ! deepEqual(this.origRecord, this.record, {strict: true})
  }

  @computed get isSaveEnabled () {
    return this.errors.size === 0 && this.hasEntityChanged
  }
  @computed get isBeingCreated () {
    return this.record[this.pkName] === null
  }

  @action save () {
    this.state = 'saving'
    return this.saveEntry(this.record)
    .then(this.onSaved.bind(this))
    .catch(this.onError.bind(this))
  }

  @action onSaved (saved) {
    this.origRecord = Object.assign({}, saved) // update origRecord coz saved
    extendObservable(this.record, saved)
    this.state = 'ready'
    return this.record
  }

  @action onError (err) {
    this.state = 'ready'
    this.processError(err)
  }
}
