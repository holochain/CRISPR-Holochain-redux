  scenario("anyone-update-task", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_task_result = await alice.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Title first task", "content":"Content first task"}})
    const update_task_result = await alice.call("tasks", "tasks", "update_task", {"id": create_task_result.Ok.id, "created_at": create_task_result.Ok.createdAt, "address": create_task_result.Ok.address, "task_input" : {"title":"Updated title first task", "content":"Updated content first task"}})
    await s.consistency()
    const read_task_result = await alice.call("tasks", "tasks", "read_task", {"id": update_task_result.Ok.id, "created_at": update_task_result.Ok.createdAt})
    t.deepEqual(update_task_result, read_task_result)
    t.deepEqual(read_task_result.Ok.id, create_task_result.Ok.id)
    t.deepEqual(read_task_result.Ok.title, 'Updated title first task')
    t.deepEqual(read_task_result.Ok.content, 'Updated content first task')

    const update_task_result_2 = await bob.call("tasks", "tasks", "update_task", {"id": update_task_result.Ok.id, "created_at": update_task_result.Ok.createdAt, "address": update_task_result.Ok.address, "task_input" : {"title":"Updated again title first task", "content":"Updated again content first task"}})
    await s.consistency()
    const read_task_result_2 = await alice.call("tasks", "tasks", "read_task", {"id": update_task_result_2.Ok.id, "created_at": update_task_result_2.Ok.createdAt})
    t.deepEqual(update_task_result_2, read_task_result_2)
    t.deepEqual(read_task_result_2.Ok.id, create_task_result.Ok.id)
    t.deepEqual(read_task_result_2.Ok.title, 'Updated again title first task')
    t.deepEqual(read_task_result_2.Ok.content, 'Updated again content first task')
  })