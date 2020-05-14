const { v4: uuidv4 } = require('uuid')
const createParams = {"base": "testbase", "origin_input" : {"uuid":uuidv4(), _ReplaceFields}}
module.exports = (scenario, conductorConfig) => {
  scenario("create_origin", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_origin_result = await alice.call("origins", "origins", "create_origin", createParams)
    await s.consistency()
    console.log('create_origin_result', create_origin_result)
    const read_origin_result = await alice.call("origins", "origins", "read_origin", {"id": create_origin_result.Ok.id, "created_at": create_origin_result.Ok.createdAt})
    t.deepEqual(create_origin_result, read_origin_result)
  })

  scenario("rebase_origin", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_origin_result = await alice.call("origins", "origins", "create_origin", createParams)
    await s.consistency()
    console.log('create_origin_result', create_origin_result)
    const read_origin_result = await alice.call("origins", "origins", "rebase_origin", {"base_from": "testbase", "base_to": "testbase_rebase", "id": create_origin_result.Ok.id, "created_at": create_origin_result.Ok.createdAt})
    await s.consistency()
    const list_origins_result_1 = await alice.call("origins", "origins", "list_origins", {"base": "testbase"})
    t.deepEqual(list_origins_result_1.Ok.length, 0)
    const list_origins_result_2 = await alice.call("origins", "origins", "list_origins", {"base": "testbase_rebase"})
    t.deepEqual(list_origins_result_2.Ok.length, 1)  
  })

  scenario("list_origins", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("origins", "origins", "create_origin", createParams)
	  await alice.call("origins", "origins", "create_origin", createParams)
    await alice.call("origins", "origins", "create_origin", createParams)
    await alice.call("origins", "origins", "create_origin", createParams)
    await s.consistency()
    const list_origins_result = await alice.call("origins", "origins", "list_origins", {"base": "testbase"})
    t.deepEqual(list_origins_result.Ok.length, 4)
  })

