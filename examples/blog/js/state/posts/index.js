import DataManipState from 'react-mobx-admin/state/data_manip'
import DataTableState from 'react-mobx-admin/state/data_table'

class PostManipState extends DataManipState {
  //
  constructor(store, saveEntry) {
    super(saveEntry)
    this.store = store
  }

  load() {
    this.store.loadOptions('tags', '/tags')
    return super.load()
  }

  edittitle = 'edit a nice post'
  createtitle = 'add very interresting post ..'
  validators = {
    'title': (val) => {
      if (!val || val.length === 0) {
        return 'title must be provided'
      }
      if (val && val.length > 10) {
        return 'title too long'
      }
    },
    'content': (val) => {
      if (!val || val.length === 0) {
        return 'content must be provided'
      }
    },
    'category': (val) => {
      if (! val) {
        return 'category must be provided'
      }
    },
    'published_at': (val) => {
      if (! val) {
        return 'published at must be provided'
      }
    },
    '_global': () => { // global validator
      const published_at = this.record.get('published_at')
      const unpublished_at = this.record.get('unpublished_at')
      if (published_at && unpublished_at && published_at > unpublished_at) {
        return ['published must be less than unpublished']
      }
    }
  }

  onSaved (saved) {
    this.store.addMessage('post successfully saved', 'info', 2000)
    super.onSaved(saved)
  }

  onLoaded (entity) {
    super.onLoaded(entity)
    alert('post onLoaded')
  }
}
export {PostManipState}

class PostTableState extends DataTableState {
  //
  constructor(store, router, getEntries, updateQPars) {
    super(router, getEntries, updateQPars)
    this.store = store
  }

  perPage = 6
  defaultSortField = 'title'
  defaultSortDir = 'ASC'
  attrs = ['id', 'title', 'category', 'published_at', 'unpublished_at', 'tags']
  headertitles = ['id', 'title', 'cat', 'published', 'unpublished', 'tags']
  noSort = ['id', 'tags']
  title = 'posts'

  init() {
    super.init()
    this.store.loadOptions('tags', '/tags')
  }
}
export {PostTableState}
