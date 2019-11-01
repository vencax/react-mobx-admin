import test from 'tape'
import TestManipState from './store/testManip'

test('it should preapare new data', t => {
  const state = new TestManipState()

  state.load()
  t.equal(state.state, 'loading')

  setTimeout(() => {
    t.equal(state.state, 'ready')
    t.ok(state.record.title !== undefined, 'title in record')
    t.equal(state.record.title, null)
    t.equal(state.record.published_at, null)
    t.ok(state.errors.has('title'), 'validators for title has been run')
    t.end()
  }, 500)
})

test('it should load data', t => {
  const state = new TestManipState()
  state.testdata = {
    'id': 1,
    'title': 'Sauron',
    'published_at': '11/2/2017',
    'unpublished_at': '11/3/2017'
  }

  state.load(1)
  t.equal(state.state, 'loading')

  setTimeout(() => {
    t.equal(state.state, 'ready')
    t.equal(state.record.title, state.testdata.title)
    t.equal(state.record.published_at, state.testdata.published_at)
    t.equal(state.hasEntityChanged, false, 'entity has not chaged since load')
    t.equal(state.errors.size, 0, 'no errors')
    t.ok(state.isSaveEnabled === false, 'save disabled due to unchanged data')
    state.updateData('title', '')
    t.ok(state.errors.has('title'), 'validators for title has been run')
    t.equal(state.hasEntityChanged, true, 'entity title has chaged')
    t.equal(state.isSaveEnabled, false, 'save disabled due to error')
    state.updateData('title', 'Saruman')
    t.equal(state.errors.size, 0, 'no errors')
    t.ok(state.isSaveEnabled === true, 'save enabled: no error, data changed')
    t.end()
  }, 500)
})
