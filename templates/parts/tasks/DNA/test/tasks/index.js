module.exports = (scenario, conductorConfig) => {
  scenario("create_task", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_task_result = await alice.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Title first task", "content":"Content first task"}})
    await s.consistency()
    console.log(create_task_result)
    const read_task_result = await alice.call("tasks", "tasks", "read_task", {"id": create_task_result.Ok.id, "created_at": create_task_result.Ok.createdAt})
    t.deepEqual(create_task_result, read_task_result)
    t.deepEqual(read_task_result.Ok.title, 'Title first task')
    t.deepEqual(read_task_result.Ok.content, 'Content first task')
  })

  scenario("list_tasks", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Title first task", "content":"Content first task"}})
    await alice.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Title second task", "content":"Content second task"}})
    await alice.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Title third task", "content":"Content third task"}})
    await alice.call("tasks", "tasks", "create_task", {"task_input" : {"title":"Title fourth task", "content":"Content fourth task"}})
    await s.consistency()
    const result = await alice.call("tasks", "tasks", "list_tasks", {})
    t.deepEqual(result.Ok.length, 4)
  })


