const { v4: uuidv4 } = require('uuid')
const createParams = {"base": "testbase", "task_input" : {"uuid":uuidv4(), "title": "String for testing","done": false}}
module.exports = (scenario, conductorConfig) => {
  scenario("create_task", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_task_result = await alice.call("tasks", "tasks", "create_task", createParams)
    await s.consistency()
    console.log('create_task_result', create_task_result)
    const read_task_result = await alice.call("tasks", "tasks", "read_task", {"id": create_task_result.Ok.id, "created_at": create_task_result.Ok.createdAt})
    t.deepEqual(create_task_result, read_task_result)
  })

  scenario("rebase_task", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_task_result = await alice.call("tasks", "tasks", "create_task", createParams)
    await s.consistency()
    console.log('create_task_result', create_task_result)
    const read_task_result = await alice.call("tasks", "tasks", "rebase_task", {"base_from": "testbase", "base_to": "testbase_rebase", "id": create_task_result.Ok.id, "created_at": create_task_result.Ok.createdAt})
    await s.consistency()
    const list_tasks_result_1 = await alice.call("tasks", "tasks", "list_tasks", {"base": "testbase"})
    t.deepEqual(list_tasks_result_1.Ok.length, 0)
    const list_tasks_result_2 = await alice.call("tasks", "tasks", "list_tasks", {"base": "testbase_rebase"})
    t.deepEqual(list_tasks_result_2.Ok.length, 1)  
  })

  scenario("list_tasks", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("tasks", "tasks", "create_task", createParams)
	  await alice.call("tasks", "tasks", "create_task", createParams)
    await alice.call("tasks", "tasks", "create_task", createParams)
    await alice.call("tasks", "tasks", "create_task", createParams)
    await s.consistency()
    const list_tasks_result = await alice.call("tasks", "tasks", "list_tasks", {"base": "testbase"})
    t.deepEqual(list_tasks_result.Ok.length, 4)
  })

  scenario("anyone-update-task", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_task_result = await alice.call("tasks", "tasks", "create_task", createParams)
    const update_task_result = await alice.call("tasks", "tasks", "update_task", {"id": create_task_result.Ok.id, "created_at": create_task_result.Ok.createdAt, "address": create_task_result.Ok.address, "task_input" : {"uuid": create_task_result.Ok.uuid, "title": "Update string for testing","done": true}})
    await s.consistency()
    const read_task_result = await alice.call("tasks", "tasks", "read_task", {"id": update_task_result.Ok.id, "created_at": update_task_result.Ok.createdAt})
    t.deepEqual(update_task_result, read_task_result)

    const update_task_result_2 = await bob.call("tasks", "tasks", "update_task", {"id": update_task_result.Ok.id, "created_at": update_task_result.Ok.createdAt, "address": update_task_result.Ok.address, "task_input" : {"uuid": update_task_result.Ok.uuid, "title": "Update string for testing","done": true}})
    await s.consistency()
    const read_task_result_2 = await alice.call("tasks", "tasks", "read_task", {"id": update_task_result_2.Ok.id, "created_at": update_task_result_2.Ok.createdAt})
    t.deepEqual(update_task_result_2, read_task_result_2)
  })

  scenario("anyone-delete-task", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_task_result = await alice.call("tasks", "tasks", "create_task", createParams)
    await s.consistency()
    const list_tasks_result = await alice.call("tasks", "tasks", "list_tasks", {"base": "testbase"})
    t.deepEqual(list_tasks_result.Ok.length, 1)
    await bob.call("tasks", "tasks", "delete_task", {"base": "testbase", "id": create_task_result.Ok.id, "created_at": create_task_result.Ok.createdAt, "address": create_task_result.Ok.address })
    await s.consistency()
    const list_tasks_result_2 = await alice.call("tasks", "tasks", "list_tasks", {"base": "testbase"})
    t.deepEqual(list_tasks_result_2.Ok.length, 0)
  })

}