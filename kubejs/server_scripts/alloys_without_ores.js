const METAIS_SEM_FONTE = [
  'bronze', 'invar', 'constantan', 'electrum',
  'aluminum', 'lead', 'lithium', 'nickel', 'osmium', 'silver', 'tin',
  'netherite', 'necromium', 'void_steel'
]

ServerEvents.recipes(event => {
  METAIS_SEM_FONTE.forEach(metal => {
    event.remove({ id: new RegExp('^createmetallurgy:(alloying|bulk_melting|casting_in_basin|casting_in_table|melting)/' + metal + '(/.*)?$') })
  })

  event.remove({ id: 'electroenergetics:crafting/electrum_wire' })
  event.remove({ id: 'electroenergetics:crafting/electrum_wire_spool' })
})
