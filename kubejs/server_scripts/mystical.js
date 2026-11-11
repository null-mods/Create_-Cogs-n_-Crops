ServerEvents.recipes(event => {
  const RAW_FROM_ESSENCE = [
    ['essence/minecraft/iron_ingot', 'iron', 'minecraft:raw_iron'],
    ['essence/minecraft/gold_ingot', 'gold', 'minecraft:raw_gold'],
    ['essence/minecraft/copper_ingot', 'copper', 'minecraft:raw_copper'],
    ['essence/common/zinc_ingot', 'zinc', 'create:raw_zinc'],
    ['essence/tungsten', 'tungsten', 'createmetallurgy:raw_tungsten']
  ]

  RAW_FROM_ESSENCE.forEach(r => {
    const essence = `mysticalagriculture:${r[1]}_essence`
    if (!Item.exists(essence)) {
      console.warn(`${essence} is not registered yet, restart the game`)
      return
    }
    event.remove({ id: `mysticalagriculture:${r[0]}` })
    event.shaped(Item.of(r[2], 4), ['EEE', 'E E', 'EEE'], {
      E: essence
    }).id(`kubejs:${r[0]}`)
  })
})
