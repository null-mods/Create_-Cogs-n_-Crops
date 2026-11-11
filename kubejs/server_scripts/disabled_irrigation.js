ServerEvents.recipes(event => {
  [
    'agricraft:irrigation_tank',
    'agricraft:irrigation_channel',
    'agricraft:irrigation_channel_hollow',
    'agricraft:channel_valve',
    'agricraft:sprinkler',
    'hearthandharvest:sprinkler'
  ].forEach(item => event.remove({ output: item }))
})
