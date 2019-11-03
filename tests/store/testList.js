import ListStore from '../../src/store/list'

export default class TestListStore extends ListStore {
  getEntries (id) {
    return new Promise((resolve, reject) => resolve({
      data: this.testdata,
      totalItems: this.testdata.length
    }))
  }

  updateQPars (qpars) {
    Object.assign(this.routerStore.queryParams, qpars)
  }
}
