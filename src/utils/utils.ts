// eslint-disable-next-line
export function treeFindPath(tree: any, func: any, path: any = []): any {
  if (!tree) return []
  for (const data of tree) {
    path.push(data)
    if (func(data)) return path
    if (data.children) {
      const findChildren = treeFindPath(data.children, func, path)
      if (findChildren.length) return findChildren
    }
    path.pop()
  }
  return []
}
