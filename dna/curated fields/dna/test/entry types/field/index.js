const { v4: uuidv4 } = require('uuid')
const createParams = {"base": "testbase", "field_input" : {"uuid":uuidv4(), "name": "String for testing","ui": "String for testing"}}
module.exports = (scenario, conductorConfig) => {
  scenario("create_field", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_field_result = await alice.call("fields", "fields", "create_field", createParams)
    await s.consistency()
    console.log('create_field_result', create_field_result)
    const read_field_result = await alice.call("fields", "fields", "read_field", {"id": create_field_result.Ok.id, "created_at": create_field_result.Ok.createdAt})
    t.deepEqual(create_field_result, read_field_result)
  })

  scenario("rebase_field", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_field_result = await alice.call("fields", "fields", "create_field", createParams)
    await s.consistency()
    console.log('create_field_result', create_field_result)
    const read_field_result = await alice.call("fields", "fields", "rebase_field", {"base_from": "testbase", "base_to": "testbase_rebase", "id": create_field_result.Ok.id, "created_at": create_field_result.Ok.createdAt})
    await s.consistency()
    const list_fields_result_1 = await alice.call("fields", "fields", "list_fields", {"base": "testbase"})
    t.deepEqual(list_fields_result_1.Ok.length, 0)
    const list_fields_result_2 = await alice.call("fields", "fields", "list_fields", {"base": "testbase_rebase"})
    t.deepEqual(list_fields_result_2.Ok.length, 1)  
  })

  scenario("list_fields", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("fields", "fields", "create_field", createParams)
	  await alice.call("fields", "fields", "create_field", createParams)
    await alice.call("fields", "fields", "create_field", createParams)
    await alice.call("fields", "fields", "create_field", createParams)
    await s.consistency()
    const list_fields_result = await alice.call("fields", "fields", "list_fields", {"base": "testbase"})
    t.deepEqual(list_fields_result.Ok.length, 4)
  })

  scenario("anyone-update-field", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_field_result = await alice.call("fields", "fields", "create_field", createParams)
    const update_field_result = await alice.call("fields", "fields", "update_field", {"id": create_field_result.Ok.id, "created_at": create_field_result.Ok.createdAt, "address": create_field_result.Ok.address, "field_input" : {"uuid": create_field_result.Ok.uuid, "name": "Update string for testing","ui": "Update string for testing"}})
    await s.consistency()
    const read_field_result = await alice.call("fields", "fields", "read_field", {"id": update_field_result.Ok.id, "created_at": update_field_result.Ok.createdAt})
    t.deepEqual(update_field_result, read_field_result)

    const update_field_result_2 = await bob.call("fields", "fields", "update_field", {"id": update_field_result.Ok.id, "created_at": update_field_result.Ok.createdAt, "address": update_field_result.Ok.address, "field_input" : {"uuid": update_field_result.Ok.uuid, "name": "Update string for testing","ui": "Update string for testing"}})
    await s.consistency()
    const read_field_result_2 = await alice.call("fields", "fields", "read_field", {"id": update_field_result_2.Ok.id, "created_at": update_field_result_2.Ok.createdAt})
    t.deepEqual(update_field_result_2, read_field_result_2)
  })

  scenario("anyone-delete-field", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_field_result = await alice.call("fields", "fields", "create_field", createParams)
    await s.consistency()
    const list_fields_result = await alice.call("fields", "fields", "list_fields", {"base": "testbase"})
    t.deepEqual(list_fields_result.Ok.length, 1)
    await bob.call("fields", "fields", "delete_field", {"base": "testbase", "id": create_field_result.Ok.id, "created_at": create_field_result.Ok.createdAt, "address": create_field_result.Ok.address })
    await s.consistency()
    const list_fields_result_2 = await alice.call("fields", "fields", "list_fields", {"base": "testbase"})
    t.deepEqual(list_fields_result_2.Ok.length, 0)
  })

}