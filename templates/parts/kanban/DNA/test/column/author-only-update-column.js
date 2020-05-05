scenario("author-only-update-column", async (s, t) => {
  const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
  const create_column_result = await alice.call("columns", "columns", "create_column", {"base": "testbase", "column_input" : {"title":"Title first column", "order": 1}})
  console.log('create_column_result', create_column_result)
  const update_column_result = await bob.call("columns", "columns", "update_column", {"id": create_column_result.Ok.id, "created_at": create_column_result.Ok.createdAt, "address": create_column_result.Ok.address, "column_input" : {"title":"Updated title first column", "order": 1}})
  t.deepEqual(JSON.parse(update_column_result.Err.Internal).kind, { ValidationFailed: 'Agent who did not author is trying to update' })
})