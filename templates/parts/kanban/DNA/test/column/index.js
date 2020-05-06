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

