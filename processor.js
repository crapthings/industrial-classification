const _ = require('lodash')
const traverse = require('traverse')
const jsonfile = require('jsonfile')

test()

async function test() {
  const data = []

  const json = await jsonfile.readFile('./行业分类.json')
  traverse(json).forEach(function (node) {
    if (node.title) {
      const _node = {}
      _node.name = node.title
      _node.category = this.path[0]
      _node.code = node.key
      _node.comment = node.comment
      _node.range = node.range
      if (_node.code) {
        _node.parentCode = _node.code.substring(0, _node.code.length - 1)
        if (_node.parentCode.length == 1) {
          _node.parentCode = _node.category
        }
        const c1 = _node.code.substring(0, 2)
        const c2 = _node.code.substring(0, 3)
        const c3 = _node.code.substring(0, 4)
        _node.path = _node.category + '.' + c1
        if (c2.length == 3)
          _node.path += '.' + c2
        if (c3.length == 4)
          _node.path += '.' + c3
      }
      data.push(_node)
    }
  })
  await jsonfile.writeFile('./行业分类flat.json', data, { spaces: 2 })
  console.log(JSON.stringify(data, null, 2))
}
