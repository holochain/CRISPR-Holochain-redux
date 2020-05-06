const { v4: uuidv4 } = require('uuid')

module.exports = (scenario, conductorConfig) => {
  scenario("create_task", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_task_result = await alice.call("tasks", "tasks", "create_task", {"base": "testbase", "task_input" : {"uuid":uuidv4(), "title":"Title first task", "done": false}})
    await s.consistency()
    console.log('create_task_result', create_task_result)
    const read_task_result = await alice.call("tasks", "tasks", "read_task", {"id": create_task_result.Ok.id, "created_at": create_task_result.Ok.createdAt})
    t.deepEqual(create_task_result, read_task_result)
    t.deepEqual(read_task_result.Ok.title, 'Title first task')
    t.deepEqual(read_task_result.Ok.done, false)
  })

  scenario("list_tasks", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("tasks", "tasks", "create_task", {"base": "testbase", "task_input" : {"uuid":uuidv4(), "title":"Title first task", "done": false}})
	  await alice.call("tasks", "tasks", "create_task", {"base": "testbase", "task_input" : {"uuid":uuidv4(), "title":"Title second task", "done": false}})
   	await alice.call("tasks", "tasks", "create_task", {"base": "testbase", "task_input" : {"uuid":uuidv4(), "title":"Title third task", "done": false}})
	  await alice.call("tasks", "tasks", "create_task", {"base": "testbase", "task_input" : {"uuid":uuidv4(), "title":"Title fourth task", "done": false}})
    await s.consistency()
    const list_tasks_result = await alice.call("tasks", "tasks", "list_tasks", {"base": "testbase"})
    t.deepEqual(list_tasks_result.Ok.length, 4)
  })

