import test from 'tape'
import MockRequester from './mockRequester'
import TestManipState from './store/testManip'

const requester = new MockRequester()

function _createState () {
  const save = (data) => requester.save('test', data)
  const state = new TestManipState(save)
  return state
}

test('it should be possible to showEntityDetail', t => {
  const state = _createState()
  requester.data = {
    'id': 1,
    'title': 'Sauron attacks',
    'published_at': '11/2/2017',
    'unpublished_at': '11/3/2017'
  }

  state.load()
  t.equal(state.cv.state, 'loading')

  setTimeout(() => {
    t.equal(state.cv.state, 'ready')
    t.equal(state.cv.record.has('title'), true)
    t.equal(state.cv.record.get('title'), state.requester.data.title)
    t.equal(state.cv.record.has('body'), true)
    t.equal(state.cv.record.get('body'), state.requester.data.body)
    t.end()
  }, 500)
})

// test('it should not be possible to read documents without login', t => {
//     const viewStore = new ViewStore(stubFetch)
//     viewStore.showDocument(1)
//
//     t.equal(viewStore.currentView.name, 'document')
//     t.equal(viewStore.isAuthenticated, false)
//     when(
//         () => viewStore.currentView.document.state !== 'pending',
//         () => {
//             t.equal(viewStore.currentView.document.state, 'rejected')
//             t.notOk(viewStore.currentView.document.value)
//             t.end()
//         }
//     )
// })
//
// test('it should be possible to read documents with login', t => {
//     const viewStore = new ViewStore(stubFetch)
//
//     viewStore.performLogin('user', '1234', result => {
//         t.equal(result, true)
//         t.equal(viewStore.isAuthenticated, true)
//         t.equal(viewStore.currentUser.name, 'Test user')
//
//         viewStore.showDocument(1)
//
//         t.equal(viewStore.currentView.name, 'document')
//         when(
//             () => viewStore.currentView.document.state !== 'pending',
//             () => {
//                 t.equal(viewStore.currentView.document.state, 'fulfilled')
//                 t.equal(viewStore.currentView.document.value.text, 'fun')
//                 t.end()
//             }
//         )
//     })
// })
