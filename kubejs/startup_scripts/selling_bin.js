StartupEvents.postInit(event => {
  try {
    const UnpackingHandler = Java.loadClass('com.simibubi.create.api.packager.unpacking.UnpackingHandler')
    const BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
    const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')

    const bin = BuiltInRegistries.BLOCK.get(ResourceLocation.parse('selling_bin:selling_bin'))
    UnpackingHandler.REGISTRY.register(bin, (level, pos, state, side, items, order, simulate) => {
      const unpack = global.sellingBinUnpack
      return unpack ? unpack(level, pos, items, simulate) : false
    })
    console.info('Selling Bin: package unpacking handler registered')
  } catch (e) {
    console.error('Selling Bin: could not register the package unpacking handler: ' + e)
  }
})
