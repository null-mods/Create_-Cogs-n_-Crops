const METAIS_OCULTOS = [
  'bronze', 'invar', 'constantan', 'electrum',
  'aluminum', 'lead', 'lithium', 'nickel', 'osmium', 'silver', 'tin',
  'netherite', 'necromium', 'void_steel'
]

RecipeViewerEvents.removeEntries('item', event => {
  METAIS_OCULTOS.forEach(metal => event.remove('createmetallurgy:molten_' + metal + '_bucket'))
})

RecipeViewerEvents.removeEntries('fluid', event => {
  METAIS_OCULTOS.forEach(metal => event.remove('createmetallurgy:molten_' + metal))
})
