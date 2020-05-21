const { v4: uuidv4 } = require('uuid')
const createParams = {"base": "testbase", "freckle_input" : {"uuid":uuidv4(), "content": "String for testing"}}
module.exports = (scenario, conductorConfig) => {
  scenario("create_freckle", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_freckle_result = await alice.call("freckles", "freckles", "create_freckle", createParams)
    await s.consistency()
    console.log('create_freckle_result', create_freckle_result)
    const read_freckle_result = await alice.call("freckles", "freckles", "read_freckle", {"id": create_freckle_result.Ok.id, "created_at": create_freckle_result.Ok.createdAt})
    t.deepEqual(create_freckle_result, read_freckle_result)
  })

  scenario("rebase_freckle", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_freckle_result = await alice.call("freckles", "freckles", "create_freckle", createParams)
    await s.consistency()
    console.log('create_freckle_result', create_freckle_result)
    const read_freckle_result = await alice.call("freckles", "freckles", "rebase_freckle", {"base_from": "testbase", "base_to": "testbase_rebase", "id": create_freckle_result.Ok.id, "created_at": create_freckle_result.Ok.createdAt})
    await s.consistency()
    const list_freckles_result_1 = await alice.call("freckles", "freckles", "list_freckles", {"base": "testbase"})
    t.deepEqual(list_freckles_result_1.Ok.length, 0)
    const list_freckles_result_2 = await alice.call("freckles", "freckles", "list_freckles", {"base": "testbase_rebase"})
    t.deepEqual(list_freckles_result_2.Ok.length, 1)  
  })

  scenario("list_freckles", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("freckles", "freckles", "create_freckle", createParams)
	  await alice.call("freckles", "freckles", "create_freckle", createParams)
    await alice.call("freckles", "freckles", "create_freckle", createParams)
    await alice.call("freckles", "freckles", "create_freckle", createParams)
    await s.consistency()
    const list_freckles_result = await alice.call("freckles", "freckles", "list_freckles", {"base": "testbase"})
    t.deepEqual(list_freckles_result.Ok.length, 4)
  })

  scenario("anyone-update-freckle", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_freckle_result = await alice.call("freckles", "freckles", "create_freckle", createParams)
    const update_freckle_result = await alice.call("freckles", "freckles", "update_freckle", {"id": create_freckle_result.Ok.id, "created_at": create_freckle_result.Ok.createdAt, "address": create_freckle_result.Ok.address, "freckle_input" : {"uuid": create_freckle_result.Ok.uuid, "content": "Update string for testing"}})
    await s.consistency()
    const read_freckle_result = await alice.call("freckles", "freckles", "read_freckle", {"id": update_freckle_result.Ok.id, "created_at": update_freckle_result.Ok.createdAt})
    t.deepEqual(update_freckle_result, read_freckle_result)

    const update_freckle_result_2 = await bob.call("freckles", "freckles", "update_freckle", {"id": update_freckle_result.Ok.id, "created_at": update_freckle_result.Ok.createdAt, "address": update_freckle_result.Ok.address, "freckle_input" : {"uuid": update_freckle_result.Ok.uuid, "content": "Update string for testing"}})
    await s.consistency()
    const read_freckle_result_2 = await alice.call("freckles", "freckles", "read_freckle", {"id": update_freckle_result_2.Ok.id, "created_at": update_freckle_result_2.Ok.createdAt})
    t.deepEqual(update_freckle_result_2, read_freckle_result_2)
  })

  scenario("anyone-delete-freckle", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_freckle_result = await alice.call("freckles", "freckles", "create_freckle", createParams)
    await s.consistency()
    const list_freckles_result = await alice.call("freckles", "freckles", "list_freckles", {"base": "testbase"})
    t.deepEqual(list_freckles_result.Ok.length, 1)
    await bob.call("freckles", "freckles", "delete_freckle", {"base": "testbase", "id": create_freckle_result.Ok.id, "created_at": create_freckle_result.Ok.createdAt, "address": create_freckle_result.Ok.address })
    await s.consistency()
    const list_freckles_result_2 = await alice.call("freckles", "freckles", "list_freckles", {"base": "testbase"})
    t.deepEqual(list_freckles_result_2.Ok.length, 0)
  })

}