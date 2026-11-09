StartupEvents.registry('item', event => {
  event.create('plant_glue')
  event.create('makeshift_andesite_alloy')
  event.create('raw_rubber')
  event.create('rubber')
  event.create('sulfur_dust').texture('kubejs:item/sulfur')
  event.create('torn_journal_page').texture('kubejs:item/teared_journal_paper')
})
