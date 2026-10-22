const MINERIOS_FORNALHA = [
  { metal: 'iron', pepita: 'minecraft:iron_nugget', crushed: 'create:crushed_raw_iron', xp: 0.7 },
  { metal: 'gold', pepita: 'minecraft:gold_nugget', crushed: 'create:crushed_raw_gold', xp: 1.0 },
  { metal: 'copper', pepita: 'create:copper_nugget', crushed: 'create:crushed_raw_copper', xp: 0.7 },
  { metal: 'zinc', pepita: 'create:zinc_nugget', crushed: 'create:crushed_raw_zinc', xp: 0.7 },
  { metal: 'tungsten', pepita: 'createmetallurgy:tungsten_nugget', crushed: 'createmetallurgy:crushed_raw_tungsten', xp: 1.0 }
]

const RECEITAS_DIRETAS_VANILLA = {
  iron: ['iron_ore', 'deepslate_iron_ore', 'raw_iron'],
  gold: ['gold_ore', 'deepslate_gold_ore', 'nether_gold_ore', 'raw_gold'],
  copper: ['copper_ore', 'deepslate_copper_ore', 'raw_copper']
}

ServerEvents.recipes(event => {
  Object.keys(RECEITAS_DIRETAS_VANILLA).forEach(metal => {
    RECEITAS_DIRETAS_VANILLA[metal].forEach(entrada => {
      event.remove({ id: 'minecraft:' + metal + '_ingot_from_smelting_' + entrada })
      event.remove({ id: 'minecraft:' + metal + '_ingot_from_blasting_' + entrada })
    })
  })

  ;['smelting', 'blasting'].forEach(tipo => {
    ;['iron', 'gold', 'copper', 'zinc'].forEach(metal => {
      event.remove({ id: 'create:' + tipo + '/' + metal + '_ingot_from_crushed' })
    })
    event.remove({ id: 'create:' + tipo + '/zinc_ingot_from_ore' })
    event.remove({ id: 'create:' + tipo + '/zinc_ingot_from_raw_ore' })
  })

  MINERIOS_FORNALHA.forEach(m => {
    const entradas = {
      ore: '#c:ores/' + m.metal,
      raw: '#c:raw_materials/' + m.metal,
      crushed: m.crushed
    }
    Object.keys(entradas).forEach(nome => {
      event.smelting('3x ' + m.pepita, entradas[nome]).xp(m.xp).id('kubejs:smelting/' + m.metal + '_nuggets_from_' + nome)
      event.blasting('3x ' + m.pepita, entradas[nome]).xp(m.xp).id('kubejs:blasting/' + m.metal + '_nuggets_from_' + nome)
    })
  })
})
