import DataManipState from 'react-mobx-admin/store/manip'
import DataTableState from 'react-mobx-admin/store/list'

class TagManipState extends DataManipState {
  //
  constructor(store, saveEntry) {
    super(saveEntry)
    this.store = store
  }

  initNew() {
    // simulation of loading or time expansive operation
    setTimeout(() => {
      this.onLoaded({
        published: true,
        name: 'default name'
      })
    }, 2000)
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
