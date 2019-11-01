import ManipStore from '../../src/store/manip'

export default class TestManipStore extends ManipStore {
  constructor () {
    super()
    this.validators = {
      'title': (val) => {
        if (!val || val.length === 0) {
          return 'title must be provided'
        }
        if (val && val.length > 10) {
          return 'title too long'
        }
      },
      'published_at': (val) => {
        if (!val) {
          return 'published at must be provided'
        }
      }
    }
  }

  loadEntry (id) {
    return new Promise((resolve, reject) => resolve(this.testdata))
  }
  saveEntry (data) {
    return new Promise((resolve, reject) => resolve(this.testdata))
  }
  initNew () {
    return new Promise((resolve, reject) => resolve({
      'title': null,
      'published_at': null,
      'unpublished_at': null
    }))
  }
}
