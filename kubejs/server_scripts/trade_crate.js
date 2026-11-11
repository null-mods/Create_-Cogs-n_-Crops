const TRADE_CRATE_PRICES = [
  ['minecraft:cake', 16],
  ['#c:flours', 1 / 4],
  ['#c:doughs', 1 / 4],
  ['#c:crops', 1 / 16],
  ['#c:eggs', 1 / 16],
  ['#c:foods/raw_fish', 1 / 16],
  ['#c:foods/raw_meat', 1 / 16],
  ['#c:foods/fruit', 1 / 16],
  ['#c:foods/vegetable', 1 / 16],
  ['#c:foods', 1]
]

const COINS = [
  ['numismatics:sun', 4096],
  ['numismatics:crown', 512],
  ['numismatics:cog', 64],
  ['numismatics:sprocket', 16],
  ['numismatics:bevel', 8],
  ['numismatics:spur', 1]
]

ServerEvents.tags('item', event => {
  event.add('kubejs:sellable', TRADE_CRATE_PRICES.map(entry => entry[0]))
})

const tradeCratePrice = stack => {
  for (const [match, price] of TRADE_CRATE_PRICES) {
    if (Ingredient.of(match).test(stack)) return price
  }
  return 0
}

const placeCoins = (block, inv, spurs) => {
  COINS.forEach(([coin, value]) => {
    let amount = Math.floor(spurs / value)
    spurs -= amount * value
    for (let slot = 0; slot < inv.getSlots() && amount > 0; slot++) {
      const current = inv.getStackInSlot(slot)
      if (current.isEmpty()) {
        const put = Math.min(64, amount)
        inv.setStackInSlot(slot, Item.of(coin, put))
        amount -= put
      } else if (current.id == coin && current.count < 64) {
        const put = Math.min(64 - current.count, amount)
        inv.setStackInSlot(slot, Item.of(coin, current.count + put))
        amount -= put
      }
    }
    while (amount > 0) {
      const put = Math.min(64, amount)
      block.popItem(Item.of(coin, put))
      amount -= put
    }
  })
}

BlockEvents.blockEntityTick('kubejs:trade_crate', event => {
  const block = event.block
  const inv = block.inventory
  if (!inv) return

  let spurs = 0
  for (let slot = 0; slot < inv.getSlots(); slot++) {
    const stack = inv.getStackInSlot(slot)
    if (stack.isEmpty()) continue
    const price = tradeCratePrice(stack)
    if (price <= 0) continue
    const batch = price >= 1 ? 1 : Math.round(1 / price)
    const sold = stack.count - (stack.count % batch)
    if (sold <= 0) continue
    spurs += Math.round(sold * price)
    const left = stack.count - sold
    inv.setStackInSlot(slot, left > 0 ? stack.copyWithCount(left) : Item.of('minecraft:air'))
  }

  if (spurs > 0) placeCoins(block, inv, spurs)
})
