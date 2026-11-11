const MINERIOS_FORNALHA = [
  { metal: 'iron', pepita: 'minecraft:iron_nugget', crushed: 'create:crushed_raw_iron', xp: 0.7 },
  { metal: 'gold', pepita: 'minecraft:gold_nugget', crushed: 'create:crushed_raw_gold', xp: 1.0 },
  { metal: 'copper', pepita: 'create:copper_nugget', crushed: 'create:crushed_raw_copper', xp: 0.7 },
  { metal: 'zinc', pepita: 'create:zinc_nugget', crushed: 'create:crushed_raw_zinc', xp: 0.7 },
  { metal: 'tungsten', pepita: 'createmetallurgy:tungsten_nugget', crushed: 'createmetallurgy:crushed_raw_tungsten', xp: 1.0 }
]

const MINERIOS_SEM_FORNALHA = [
  'minecraft:raw_iron', 'minecraft:raw_gold', 'minecraft:raw_copper', 'create:raw_zinc', 'createmetallurgy:raw_tungsten',
  'minecraft:iron_ore', 'minecraft:deepslate_iron_ore', 'minecraft:gold_ore', 'minecraft:deepslate_gold_ore',
  'minecraft:nether_gold_ore', 'minecraft:copper_ore', 'minecraft:deepslate_copper_ore',
  'create:zinc_ore', 'create:deepslate_zinc_ore', 'createmetallurgy:wolframite_ore'
]

ServerEvents.recipes(event => {
  ;['minecraft:smelting', 'minecraft:blasting'].forEach(tipo => {
    MINERIOS_SEM_FORNALHA.forEach(minerio => event.remove({ type: tipo, input: minerio }))
    MINERIOS_FORNALHA.forEach(m => {
      event.remove({ type: tipo, input: '#c:ores/' + m.metal })
      event.remove({ type: tipo, input: '#c:raw_materials/' + m.metal })
      event.remove({ type: tipo, input: m.crushed })
    })
  })

  MINERIOS_FORNALHA.forEach(m => {
    event.smelting('3x ' + m.pepita, m.crushed).xp(m.xp).id('kubejs:smelting/' + m.metal + '_nuggets_from_crushed')
    event.blasting('3x ' + m.pepita, m.crushed).xp(m.xp).id('kubejs:blasting/' + m.metal + '_nuggets_from_crushed')

    ;['ores', 'raw_materials'].forEach(kind => {
      event.custom({
        type: 'create:item_application',
        ingredients: [{ item: 'minecraft:grindstone' }, { tag: `c:${kind}/${m.metal}` }],
        results: [{ id: 'minecraft:grindstone' }, { id: m.crushed }]
      }).id(`kubejs:item_application/grindstone_${kind}_${m.metal}`)
    })
  })
})

BlockEvents.rightClicked('minecraft:grindstone', event => {
  const { player, item, block } = event
  if (String(event.hand) != 'MAIN_HAND' || item.isEmpty()) return

  const minerio = MINERIOS_FORNALHA.find(m =>
    Ingredient.of('#c:ores/' + m.metal).test(item) || Ingredient.of('#c:raw_materials/' + m.metal).test(item))
  if (!minerio) return

  if (!player.isCreative()) item.shrink(1)
  player.give(minerio.crushed)
  if (Math.random() < 0.25) player.addXP(1)
  event.server.runCommandSilent(`playsound minecraft:block.grindstone.use block @a ${block.x + 0.5} ${block.y + 0.5} ${block.z + 0.5} 0.8 1`)
  player.swing(event.hand)
  event.cancel()
})
