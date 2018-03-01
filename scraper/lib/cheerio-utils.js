function getAllTextNodes ($, start) {
  let textNodes = []
  let elemStack = [start]

  while (elemStack.length) {
    const el = elemStack.pop()
    const $el = $(el)
    const children = $el.contents()
    for (let i = 0; i < children.length; i++) {
      const child = children[i]

      if (child.type === 'text') {
        textNodes.push(child.data)
      } else if (child.type === 'tag') {
        elemStack.push(child)
      }
    }
  }

  return textNodes
}

module.exports = {
  getAllTextNodes
}
