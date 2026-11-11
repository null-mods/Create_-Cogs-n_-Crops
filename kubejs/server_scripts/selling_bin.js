const SELLING_BIN_POINTS_PER_SPUR = 10

const findSellingBinCenter = (level, pos) => {
  const candidates = [pos]
  const first = level.getBlockEntity(pos)
  if (first && first.getOffset) {
    const offset = first.getOffset()
    candidates.push(pos.offset(offset), pos.subtract(offset))
  }
  for (let i = 0; i < candidates.length; i++) {
    const be = level.getBlockEntity(candidates[i])
    if (!be || be.storedValue === undefined) continue
    const offset = be.getOffset ? be.getOffset() : null
    if (!offset || (offset.x == 0 && offset.y == 0 && offset.z == 0)) return be
  }
  return null
}

global.sellingBinUnpack = (level, pos, items, simulate) => {
  const price = global.tradeCratePrice
  if (!price) return false

  let spurs = 0
  for (let i = 0; i < items.size(); i++) {
    const stack = items.get(i)
    if (stack.isEmpty()) continue
    const each = price(stack)
    if (each <= 0) return false
    spurs += each * stack.count
  }
  if (simulate) return true

  const bin = findSellingBinCenter(level, pos)
  if (!bin) return false
  bin.storedValue = bin.storedValue + Math.floor(spurs * SELLING_BIN_POINTS_PER_SPUR)
  bin.forceUpdate()
  return true
}
