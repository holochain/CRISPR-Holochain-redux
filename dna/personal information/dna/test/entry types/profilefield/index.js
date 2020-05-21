const { v4: uuidv4 } = require('uuid')
const createParams = {"base": "testbase", "profilefield_input" : {"uuid":uuidv4(), "fieldsFieldId": "String for testing","personaFieldAddress": "String for testing","contract": "String for testing"}}
module.exports = (scenario, conductorConfig) => {
  scenario("create_profilefield", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_profilefield_result = await alice.call("personalinformation", "personalinformation", "create_profilefield", createParams)
    await s.consistency()
    console.log('create_profilefield_result', create_profilefield_result)
    const read_profilefield_result = await alice.call("personalinformation", "personalinformation", "read_profilefield", {"id": create_profilefield_result.Ok.id, "created_at": create_profilefield_result.Ok.createdAt})
    t.deepEqual(create_profilefield_result, read_profilefield_result)
  })

  scenario("rebase_profilefield", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_profilefield_result = await alice.call("personalinformation", "personalinformation", "create_profilefield", createParams)
    await s.consistency()
    console.log('create_profilefield_result', create_profilefield_result)
    const read_profilefield_result = await alice.call("personalinformation", "personalinformation", "rebase_profilefield", {"base_from": "testbase", "base_to": "testbase_rebase", "id": create_profilefield_result.Ok.id, "created_at": create_profilefield_result.Ok.createdAt})
    await s.consistency()
    const list_profilefields_result_1 = await alice.call("personalinformation", "personalinformation", "list_profilefields", {"base": "testbase"})
    t.deepEqual(list_profilefields_result_1.Ok.length, 0)
    const list_profilefields_result_2 = await alice.call("personalinformation", "personalinformation", "list_profilefields", {"base": "testbase_rebase"})
    t.deepEqual(list_profilefields_result_2.Ok.length, 1)  
  })

  scenario("list_profilefields", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("personalinformation", "personalinformation", "create_profilefield", createParams)
	  await alice.call("personalinformation", "personalinformation", "create_profilefield", createParams)
    await alice.call("personalinformation", "personalinformation", "create_profilefield", createParams)
    await alice.call("personalinformation", "personalinformation", "create_profilefield", createParams)
    await s.consistency()
    const list_profilefields_result = await alice.call("personalinformation", "personalinformation", "list_profilefields", {"base": "testbase"})
    t.deepEqual(list_profilefields_result.Ok.length, 4)
  })

  scenario("anyone-update-profilefield", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_profilefield_result = await alice.call("personalinformation", "personalinformation", "create_profilefield", createParams)
    const update_profilefield_result = await alice.call("personalinformation", "personalinformation", "update_profilefield", {"id": create_profilefield_result.Ok.id, "created_at": create_profilefield_result.Ok.createdAt, "address": create_profilefield_result.Ok.address, "profilefield_input" : {"uuid": create_profilefield_result.Ok.uuid, "fieldsFieldId": "Update string for testing","personaFieldAddress": "Update string for testing","contract": "Update string for testing"}})
    await s.consistency()
    const read_profilefield_result = await alice.call("personalinformation", "personalinformation", "read_profilefield", {"id": update_profilefield_result.Ok.id, "created_at": update_profilefield_result.Ok.createdAt})
    t.deepEqual(update_profilefield_result, read_profilefield_result)

    const update_profilefield_result_2 = await bob.call("personalinformation", "personalinformation", "update_profilefield", {"id": update_profilefield_result.Ok.id, "created_at": update_profilefield_result.Ok.createdAt, "address": update_profilefield_result.Ok.address, "profilefield_input" : {"uuid": update_profilefield_result.Ok.uuid, "fieldsFieldId": "Update string for testing","personaFieldAddress": "Update string for testing","contract": "Update string for testing"}})
    await s.consistency()
    const read_profilefield_result_2 = await alice.call("personalinformation", "personalinformation", "read_profilefield", {"id": update_profilefield_result_2.Ok.id, "created_at": update_profilefield_result_2.Ok.createdAt})
    t.deepEqual(update_profilefield_result_2, read_profilefield_result_2)
  })

  scenario("anyone-delete-profilefield", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_profilefield_result = await alice.call("personalinformation", "personalinformation", "create_profilefield", createParams)
    await s.consistency()
    const list_profilefields_result = await alice.call("personalinformation", "personalinformation", "list_profilefields", {"base": "testbase"})
    t.deepEqual(list_profilefields_result.Ok.length, 1)
    await bob.call("personalinformation", "personalinformation", "delete_profilefield", {"base": "testbase", "id": create_profilefield_result.Ok.id, "created_at": create_profilefield_result.Ok.createdAt, "address": create_profilefield_result.Ok.address })
    await s.consistency()
    const list_profilefields_result_2 = await alice.call("personalinformation", "personalinformation", "list_profilefields", {"base": "testbase"})
    t.deepEqual(list_profilefields_result_2.Ok.length, 0)
  })

}