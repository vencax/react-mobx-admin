import test from 'tape'
import TestListStore from './store/testList'

test('it should load data', t => {
  const routerStore = {
    queryParams: {}
  }
  const state = new TestListStore(routerStore)
  state.testdata = [{
    'id': 1,
    'title': 'Sauron',
    'published_at': '11/2/2017',
    'unpublished_at': '11/3/2017'
  }, {
    'id': 2,
    'title': 'Saruman',
    'published_at': '11/12/2017',
    'unpublished_at': '13/12/2017'
  }]

  state.load()
  t.equal(state.state, 'loading')

  setTimeout(() => {
    t.equal(state.state, 'ready')
    t.equal(state.items.length, 2)
    t.equal(state.totalItems, 2)
    t.equal(routerStore.queryParams._page, 1)
    state.updatePage(2)
    t.equal(routerStore.queryParams._page, 2)
    state.setPerPage(7)
    t.equal(routerStore.queryParams._page, 1)
    t.equal(routerStore.queryParams._perPage, 7)
    t.end()
  }, 500)
})
