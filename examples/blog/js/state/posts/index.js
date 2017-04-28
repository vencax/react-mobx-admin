import { transaction, action } from 'mobx'

export default (BaseClass) => class PostsStore extends BaseClass {

  showPostList(query = {}) {
    this.loadOptions('tags', '/tags')
    this.initEntityListView(this.currentView, 'posts', query, {
      name: 'post_list',
      perPage: 6,
      pkName: 'id',
      sortField: 'title',
      sortDir: 'ASC',
      attrs: ['id', 'title', 'category', 'published_at', 'tags'],
      headertitles: ['ID', 'Title', 'Cat', 'Published', 'Tags'],
      title: 'posts'
    }, (row) => {
      this.showPostDetail(row.id)
    }, () => {
      this.showPostDetail(null)
    }).catch(this.onError.bind(this))
  }

  @action savePost(onReturn2list = null) {
    let p = this.saveData().then((saved) => {
      this.addMessage('post successfully saved', 'info', 2000)
    })
    p = onReturn2list ? p.then(onReturn2list) : p
    return p.catch(this.onError.bind(this))
  }

  showPostDetail(id) {
    this.loadOptions('tags', '/tags')
    this.initEntityView(this.currentView, 'posts', id, {
      name: 'post_detail',
      edittitle: 'edit a nice post',
      createtitle: 'add very interresting post ..',
      validators: {
        'title': (val) => {
          if (!val || val.length === 0) {
            return this.__('title must be provided')
          }
          if (val.length > 10) {
            return this.__('title too long')
          }
        },
        'content': (val) => {
          if (!val || val.length === 0) {
            return this.__('content must be provided')
          }
        },
        'category': (val) => {
          if (! val) {
            return this.__('category must be provided')
          }
        },
        '_global': (val) => { // global validator
          const published_at = this.currentView.entity.get('published_at')
          const unpublished_at = this.currentView.entity.get('unpublished_at')
          if (published_at && unpublished_at && published_at > unpublished_at) {
            return [this.__('published must be less than unpublished')]
          }
        }
      }
    }).catch(this.onError.bind(this))
  }

}
