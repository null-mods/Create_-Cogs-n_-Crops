const SEASON_CROPS = {
  spring: {
    blocks: ['croptopia:tea_crop'],
    items: ['croptopia:tea_seed', 'hearthandharvest:blueberry_pips', 'hearthandharvest:raspberry_pips']
  },
  summer: {
    blocks: ['croptopia:pepper_crop', 'croptopia:vanilla_crop'],
    items: ['croptopia:pepper_seed', 'croptopia:vanilla_seeds', 'hearthandharvest:blueberry_pips', 'hearthandharvest:raspberry_pips']
  },
  autumn: {
    blocks: [
      'create_winery:red_grape_bush', 'create_winery:red_grape_bush_stage_0', 'create_winery:red_grape_bush_stage_1',
      'create_winery:red_grape_bush_stage_2', 'create_winery:red_grape_bush_stage_3',
      'create_winery:white_grape_bush', 'create_winery:white_grape_bush_stage_0', 'create_winery:white_grape_bush_stage_1',
      'create_winery:white_grape_bush_stage_2', 'create_winery:white_grape_bush_stage_3'
    ],
    items: ['create_winery:red_grape_bush', 'create_winery:white_grape_bush']
  }
}

ServerEvents.tags('block', event => {
  Object.keys(SEASON_CROPS).forEach(season => event.add(`sereneseasons:${season}_crops`, SEASON_CROPS[season].blocks))
})

ServerEvents.tags('item', event => {
  Object.keys(SEASON_CROPS).forEach(season => event.add(`sereneseasons:${season}_crops`, SEASON_CROPS[season].items))
})
