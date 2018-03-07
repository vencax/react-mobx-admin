import {BaseTableState, BaseManipState} from '../bases'

class PostManipState extends BaseManipState {
  //
  load(load) {
    this.store.loadOptions('tags', '/tags')
    return super.load(load)
  }

  edittitle = 'edit a nice post'
  createtitle = 'add very interresting post ..'
  validators = {
    'title': (val) => this.lengthValidator(val, 10),
    'content': (val) => this.lengthValidator(val),
    'category': (val) => this.lengthValidator(val),
    'published_at': (val) => this.lengthValidator(val),
    'unpublished_at': (val) => {
      const published_at = this.record.get('published_at')
      if (published_at && val && published_at > val) {
        return 'published must be less than unpublished'
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

class PostTableState extends BaseTableState {
  //
  defaultSortField = 'title'
  defaultSortDir = 'ASC'
  attrs = ['id', 'title', 'category', 'published_at', 'unpublished_at', 'tags']
  headertitles (attr) {
    return `title for ${attr}`
  }
  noSort = ['id', 'tags']
  
  init() {
    super.init()
    this.store.loadOptions('tags', '/tags')
  }
}
export {PostTableState}
