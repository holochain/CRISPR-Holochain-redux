const { v4: uuidv4 } = require('uuid')

module.exports = (scenario, conductorConfig) => {
  scenario("create_column", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_column_result = await alice.call("columns", "columns", "create_column", {"base": "testbase", "column_input" : {"uuid":uuidv4(), "title":"Title first column", "order": 1}})
    await s.consistency()
    console.log('create_column_result', create_column_result)
    const read_column_result = await alice.call("columns", "columns", "read_column", {"id": create_column_result.Ok.id, "created_at": create_column_result.Ok.createdAt})
    t.deepEqual(create_column_result, read_column_result)
    t.deepEqual(read_column_result.Ok.title, 'Title first column')
    t.deepEqual(read_column_result.Ok.order, 1)
  })

  scenario("list_columns", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("columns", "columns", "create_column", {"base": "testbase", "column_input" : {"uuid":uuidv4(), "title":"Title first column", "order": 1}})
	  await alice.call("columns", "columns", "create_column", {"base": "testbase", "column_input" : {"uuid":uuidv4(), "title":"Title second column", "order": 1}})
   	await alice.call("columns", "columns", "create_column", {"base": "testbase", "column_input" : {"uuid":uuidv4(), "title":"Title third column", "order": 1}})
	  await alice.call("columns", "columns", "create_column", {"base": "testbase", "column_input" : {"uuid":uuidv4(), "title":"Title fourth column", "order": 1}})
    await s.consistency()
    const list_columns_result = await alice.call("columns", "columns", "list_columns", {"base": "testbase"})
    t.deepEqual(list_columns_result.Ok.length, 4)
  })

scenario("anyone-update-column", async (s, t) => {
  const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
  const create_column_result = await alice.call("columns", "columns", "create_column", {"base": "testbase", "column_input" : {"uuid":uuidv4(), "title":"Title first column", "order": 1}})
  const update_column_result = await alice.call("columns", "columns", "update_column", {"id": create_column_result.Ok.id, "created_at": create_column_result.Ok.createdAt, "address": create_column_result.Ok.address, "column_input" : {"uuid": create_column_result.Ok.uuid, "title":"Updated title first column", "order": 1}})
  await s.consistency()
  const read_column_result = await alice.call("columns", "columns", "read_column", {"id": update_column_result.Ok.id, "created_at": update_column_result.Ok.createdAt})
  t.deepEqual(update_column_result, read_column_result)
  t.deepEqual(read_column_result.Ok.id, create_column_result.Ok.id)
  t.deepEqual(read_column_result.Ok.title, 'Updated title first column')
  t.deepEqual(read_column_result.Ok.order, 1)

  const update_column_result_2 = await bob.call("columns", "columns", "update_column", {"id": update_column_result.Ok.id, "created_at": update_column_result.Ok.createdAt, "address": update_column_result.Ok.address, "column_input" : {"uuid": update_column_result.Ok.uuid, "title":"Updated again title first column", "order": 1}})
  await s.consistency()
  const read_column_result_2 = await alice.call("columns", "columns", "read_column", {"id": update_column_result_2.Ok.id, "created_at": update_column_result_2.Ok.createdAt})
  t.deepEqual(update_column_result_2, read_column_result_2)
  t.deepEqual(read_column_result_2.Ok.id, create_column_result.Ok.id)
  t.deepEqual(read_column_result_2.Ok.title, 'Updated again title first column')
  t.deepEqual(read_column_result.Ok.order, 1)
})

scenario("anyone-delete-column", async (s, t) => {
  const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
  const create_column_result = await alice.call("columns", "columns", "create_column", {"base": "testbase", "column_input" : {"uuid":uuidv4(), "title":"Title first column", "order": 1}})
  await s.consistency()
  const list_columns_result = await alice.call("columns", "columns", "list_columns", {"base": "testbase"})
  t.deepEqual(list_columns_result.Ok.length, 1)
  await bob.call("columns", "columns", "delete_column", {"base": "testbase", "id": create_column_result.Ok.id, "created_at": create_column_result.Ok.createdAt, "address": create_column_result.Ok.address })
  await s.consistency()
  const list_columns_result_2 = await alice.call("columns", "columns", "list_columns", {"base": "testbase"})
  t.deepEqual(list_columns_result_2.Ok.length, 0)
})

}