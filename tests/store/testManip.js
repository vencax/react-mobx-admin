import ManipStore from '../../src/store/manip'

export default class TestManipStore extends ManipStore {
  validators = {
    'title': (val) => {
      if (!val || val.length === 0) {
        return 'title must be provided'
      }
      if (val && val.length > 10) {
        return 'title too long'
      }
    },
    'published_at': (val) => {
      if (! val) {
        return 'published at must be provided'
      }
    },
    'unpublished_at': (val) => {
      const published_at = this.record.get('published_at')
      if (published_at && val && published_at > val) {
        return 'published must be less than unpublished'
      }
    }
  }
}
