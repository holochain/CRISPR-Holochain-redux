const { v4: uuidv4 } = require('uuid')
const createParams = {"base": "testbase", "project_input" : {"uuid":uuidv4(), "name": "String for testing","description": "String for testing","preview": "String for testing","zome": "String for testing","order": 0,"uuid": "String for testing"}}
module.exports = (scenario, conductorConfig) => {
  scenario("create_project", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_project_result = await alice.call("projects", "projects", "create_project", createParams)
    await s.consistency()
    console.log('create_project_result', create_project_result)
    const read_project_result = await alice.call("projects", "projects", "read_project", {"id": create_project_result.Ok.id, "created_at": create_project_result.Ok.createdAt})
    t.deepEqual(create_project_result, read_project_result)
  })

  scenario("rebase_project", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_project_result = await alice.call("projects", "projects", "create_project", createParams)
    await s.consistency()
    console.log('create_project_result', create_project_result)
    const read_project_result = await alice.call("projects", "projects", "rebase_project", {"base_from": "testbase", "base_to": "testbase_rebase", "id": create_project_result.Ok.id, "created_at": create_project_result.Ok.createdAt})
    await s.consistency()
    const list_projects_result_1 = await alice.call("projects", "projects", "list_projects", {"base": "testbase"})
    t.deepEqual(list_projects_result_1.Ok.length, 0)
    const list_projects_result_2 = await alice.call("projects", "projects", "list_projects", {"base": "testbase_rebase"})
    t.deepEqual(list_projects_result_2.Ok.length, 1)  
  })

  scenario("list_projects", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("projects", "projects", "create_project", createParams)
	  await alice.call("projects", "projects", "create_project", createParams)
    await alice.call("projects", "projects", "create_project", createParams)
    await alice.call("projects", "projects", "create_project", createParams)
    await s.consistency()
    const list_projects_result = await alice.call("projects", "projects", "list_projects", {"base": "testbase"})
    t.deepEqual(list_projects_result.Ok.length, 4)
  })

  scenario("anyone-update-project", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_project_result = await alice.call("projects", "projects", "create_project", createParams)
    const update_project_result = await alice.call("projects", "projects", "update_project", {"id": create_project_result.Ok.id, "created_at": create_project_result.Ok.createdAt, "address": create_project_result.Ok.address, "project_input" : {"uuid": create_project_result.Ok.uuid, "name": "Update string for testing","description": "Update string for testing","preview": "Update string for testing","zome": "Update string for testing","order": 1,"uuid": "Update string for testing"}})
    await s.consistency()
    const read_project_result = await alice.call("projects", "projects", "read_project", {"id": update_project_result.Ok.id, "created_at": update_project_result.Ok.createdAt})
    t.deepEqual(update_project_result, read_project_result)

    const update_project_result_2 = await bob.call("projects", "projects", "update_project", {"id": update_project_result.Ok.id, "created_at": update_project_result.Ok.createdAt, "address": update_project_result.Ok.address, "project_input" : {"uuid": update_project_result.Ok.uuid, "name": "Update string for testing","description": "Update string for testing","preview": "Update string for testing","zome": "Update string for testing","order": 1,"uuid": "Update string for testing"}})
    await s.consistency()
    const read_project_result_2 = await alice.call("projects", "projects", "read_project", {"id": update_project_result_2.Ok.id, "created_at": update_project_result_2.Ok.createdAt})
    t.deepEqual(update_project_result_2, read_project_result_2)
  })

  scenario("anyone-delete-project", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_project_result = await alice.call("projects", "projects", "create_project", createParams)
    await s.consistency()
    const list_projects_result = await alice.call("projects", "projects", "list_projects", {"base": "testbase"})
    t.deepEqual(list_projects_result.Ok.length, 1)
    await bob.call("projects", "projects", "delete_project", {"base": "testbase", "id": create_project_result.Ok.id, "created_at": create_project_result.Ok.createdAt, "address": create_project_result.Ok.address })
    await s.consistency()
    const list_projects_result_2 = await alice.call("projects", "projects", "list_projects", {"base": "testbase"})
    t.deepEqual(list_projects_result_2.Ok.length, 0)
  })

}