import {BaseTableState, BaseManipState} from '../bases'

class TagManipState extends BaseManipState {
  //
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
    'name': (val) => this.lengthValidator(val, 10)
  }
}
export {TagManipState}

class TagTableState extends BaseTableState {
  attrs = ['id', 'name', 'published']
  headers = {
    id: 'ID', name: 'NaMe', published: 'PUBlished'
  }
  headerCreator (attr) {
    return this.headers[attr]
  }
  defaultSortField = 'name'
  defaultSortDir = 'ASC'
}
export {TagTableState}
