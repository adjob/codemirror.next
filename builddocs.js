const fs = require("fs")
const path = require("path")
const src = process.argv[2]
const src_dir = path.resolve(path.dirname(src))
const {exports: items, usages: imports} = require('./data.json')
fs.writeFileSync("tpl", Object.keys(items).map(v => `@${v}`).join("\n"))
console.log("<meta charset='utf-8'><dl>"+
require('../builddocs').build(
  {
    name: "",
    main: "tpl",
    allowUnresolvedTypes: false,
    imports: [
      imports,
      { void: false, /* FIXME*/ null: false, 1: false, "-1": false, undefined: false},
      { ReadonlyArray: "https://www.typescriptlang.org/docs/handbook/interfaces.html", DocumentOrShadowRoot: false }
    ],
  },
  {items, all:gatherAll({properties:items}, Object.create(null))}
)
+"</dl>"
)

function gatherAll(obj, target) {
  if (obj.id) target[obj.id] = obj
  if (Object.prototype.hasOwnProperty.call(obj, "constructor")) gatherAll(obj.constructor, target)
  if (obj.properties) for (let prop in obj.properties) gatherAll(obj.properties[prop], target)
  if (obj.staticProperties) for (let prop in obj.staticProperties) gatherAll(obj.staticProperties[prop], target)
  return target
}

