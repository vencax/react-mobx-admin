import DataManipState from 'react-mobx-admin/store/manip'
import DataTableState from 'react-mobx-admin/store/list'

class BaseManipState extends DataManipState {
  //
  constructor(store) {
    super()
    this.store = store
  }

  loadEntry (id) {
    const entityname = this.store.requester.router.params.entityname
    return this.store.requester.getEntry(entityname, id)
  }
  saveEntry (data) {
    const entityname = this.store.requester.router.params.entityname
    return this.store.requester.saveEntry(entityname, data, data.id)
  }

  lengthValidator (val, max) {
    if (!val || val.length === 0) {
      return 'value must be provided'
    }
    if (max && val.length > max) {
      return 'value too long'
    }
  }
}
export {BaseManipState}


class BaseTableState extends DataTableState {
  constructor(store, router, getEntries, updateQPars) {
    super(router, getEntries, updateQPars)
    this.store = store
  }
  perPage = 3

  deleteData (rows) {
    rows.map(i => this.items.remove(i))
  }
}
export {BaseTableState}
