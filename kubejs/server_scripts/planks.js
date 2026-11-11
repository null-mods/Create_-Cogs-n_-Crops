ServerEvents.recipes(event => {
  const found = []
  event.forEachRecipe({ type: 'minecraft:crafting_shapeless', output: '#minecraft:planks' }, recipe => {
    const result = recipe.getOriginalRecipeResult()
    const ingredients = recipe.getOriginalRecipeIngredients()
    if (!result || result.count <= 2 || ingredients.size() !== 1) return
    found.push({ id: String(recipe.getId()), item: String(result.id), ingredient: ingredients.get(0) })
  })

  found.forEach(r => {
    event.remove({ id: r.id })
    event.shapeless(Item.of(r.item, 2), [r.ingredient]).id(`kubejs:planks/${r.id.replace(':', '/')}`)
  })
  console.info(`Plank crafting nerfed to 2 in ${found.length} recipes`)
})
