import DataManipState from 'react-mobx-admin/state/data_manip'
import DataTableState from 'react-mobx-admin/state/data_table'

class TagManipState extends DataManipState {
  //
  constructor(store, saveEntry) {
    super(saveEntry)
    this.store = store
  }

  prepareNew() {
    // simulation of loading or time expansive operation
    const p = this.record.has('id') ? this.record : new Promise((resolve, reject) => {
      setTimeout(() => {
        this.record.set('published', true)
        this.record.set('name', 'default name')
        resolve(this.record)
      }, 2000)
    })
    return p
  }

  validators = {
    'name': (val) => {
      if (!val || val.length === 0) {
        return 'value must be provided'
      }
      if (val.length > 10) {
        return 'value too long'
      }
    }
  }
}
export {TagManipState}

class TagTableState extends DataTableState {
  constructor(store, router, getEntries, updateQPars) {
    super(router, getEntries, updateQPars)
    this.store = store
  }
  perPage = 3
  attrs = ['id', 'name', 'published']
  headertitles = ['ID', 'Name', 'Published']
  defaultSortField = 'name'
  defaultSortDir = 'ASC'
}
export {TagTableState}
