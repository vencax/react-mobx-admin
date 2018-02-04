
export function buildHeaders (attrs, titles, renderHeader, onSort, sortstate, noSort = []) {
  let headers = []
  let i

  const sortFields = sortstate._sortField ? sortstate._sortField.split(',') : []
  const sortDirs = sortstate._sortDir ? sortstate._sortDir.split(',') : []
  for (i = 0; i < attrs.length; i++) {
    const attr = attrs[i]
    const title = titles[i]
    const sortStateIdx = sortFields.indexOf(attr)
    const sortable = onSort && noSort.indexOf(attr) === -1
    const sort = sortStateIdx >= 0 ? sortDirs[sortStateIdx] : null
    const header = renderHeader(attr, title, sort, sortable ? onSort : null)
    headers.push(header)
  }

  return headers
}

export function buildCells (attrs, fields, row, rowId, renderCell) {
  let cells = []
  let i

  for (i = 0; i < attrs.length; i++) {
    const attr = attrs[i]
    const field = fields[i]
    const cell = renderCell(row, attr, field, rowId)
    cells.push(cell)
  }

  return cells
}
