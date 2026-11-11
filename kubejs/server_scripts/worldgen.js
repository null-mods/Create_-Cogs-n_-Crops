ServerEvents.tags('worldgen/biome', event => {
  ['plains', 'desert', 'savanna', 'snowy', 'taiga'].forEach(type => {
    event.removeAll(`minecraft:has_structure/village_${type}`)
  })
})
