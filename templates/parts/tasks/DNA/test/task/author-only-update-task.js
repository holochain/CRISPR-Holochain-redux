scenario("author-only-update-task", async (s, t) => {
  const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
  const create_task_result = await alice.call("tasks", "tasks", "create_task", {"base": "testbase", "task_input" : {"uuid":uuidv4(), "title":"Title first task", "done": false}})
  console.log('create_task_result', create_task_result)
  const update_task_result = await bob.call("tasks", "tasks", "update_task", {"id": create_task_result.Ok.id, "created_at": create_task_result.Ok.createdAt, "address": create_task_result.Ok.address, "task_input" : {"uuid": create_task_result.Ok.uuid, "title":"Updated title first task", "done": false}})
  t.deepEqual(JSON.parse(update_task_result.Err.Internal).kind, { ValidationFailed: 'Agent who did not author is trying to update' })
})