const { v4: uuidv4 } = require('uuid')
const createParams = {"base": "testbase", "column_input" : {"uuid":uuidv4(), "title": "String for testing","order": 0}}
module.exports = (scenario, conductorConfig) => {
  scenario("create_column", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_column_result = await alice.call("kanban", "kanban", "create_column", createParams)
    await s.consistency()
    console.log('create_column_result', create_column_result)
    const read_column_result = await alice.call("kanban", "kanban", "read_column", {"id": create_column_result.Ok.id, "created_at": create_column_result.Ok.createdAt})
    t.deepEqual(create_column_result, read_column_result)
  })

  scenario("rebase_column", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_column_result = await alice.call("kanban", "kanban", "create_column", createParams)
    await s.consistency()
    console.log('create_column_result', create_column_result)
    const read_column_result = await alice.call("kanban", "kanban", "rebase_column", {"base_from": "testbase", "base_to": "testbase_rebase", "id": create_column_result.Ok.id, "created_at": create_column_result.Ok.createdAt})
    await s.consistency()
    const list_columns_result_1 = await alice.call("kanban", "kanban", "list_columns", {"base": "testbase"})
    t.deepEqual(list_columns_result_1.Ok.length, 0)
    const list_columns_result_2 = await alice.call("kanban", "kanban", "list_columns", {"base": "testbase_rebase"})
    t.deepEqual(list_columns_result_2.Ok.length, 1)  
  })

  scenario("list_columns", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("kanban", "kanban", "create_column", createParams)
	  await alice.call("kanban", "kanban", "create_column", createParams)
    await alice.call("kanban", "kanban", "create_column", createParams)
    await alice.call("kanban", "kanban", "create_column", createParams)
    await s.consistency()
    const list_columns_result = await alice.call("kanban", "kanban", "list_columns", {"base": "testbase"})
    t.deepEqual(list_columns_result.Ok.length, 4)
  })

  scenario("anyone-update-column", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_column_result = await alice.call("kanban", "kanban", "create_column", createParams)
    const update_column_result = await alice.call("kanban", "kanban", "update_column", {"id": create_column_result.Ok.id, "created_at": create_column_result.Ok.createdAt, "address": create_column_result.Ok.address, "column_input" : {"uuid": create_column_result.Ok.uuid, "title": "Update string for testing","order": 1}})
    await s.consistency()
    const read_column_result = await alice.call("kanban", "kanban", "read_column", {"id": update_column_result.Ok.id, "created_at": update_column_result.Ok.createdAt})
    t.deepEqual(update_column_result, read_column_result)

    const update_column_result_2 = await bob.call("kanban", "kanban", "update_column", {"id": update_column_result.Ok.id, "created_at": update_column_result.Ok.createdAt, "address": update_column_result.Ok.address, "column_input" : {"uuid": update_column_result.Ok.uuid, "title": "Update string for testing","order": 1}})
    await s.consistency()
    const read_column_result_2 = await alice.call("kanban", "kanban", "read_column", {"id": update_column_result_2.Ok.id, "created_at": update_column_result_2.Ok.createdAt})
    t.deepEqual(update_column_result_2, read_column_result_2)
  })

  scenario("anyone-delete-column", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_column_result = await alice.call("kanban", "kanban", "create_column", createParams)
    await s.consistency()
    const list_columns_result = await alice.call("kanban", "kanban", "list_columns", {"base": "testbase"})
    t.deepEqual(list_columns_result.Ok.length, 1)
    await bob.call("kanban", "kanban", "delete_column", {"base": "testbase", "id": create_column_result.Ok.id, "created_at": create_column_result.Ok.createdAt, "address": create_column_result.Ok.address })
    await s.consistency()
    const list_columns_result_2 = await alice.call("kanban", "kanban", "list_columns", {"base": "testbase"})
    t.deepEqual(list_columns_result_2.Ok.length, 0)
  })

}