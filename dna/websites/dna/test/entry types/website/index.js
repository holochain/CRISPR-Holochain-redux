const { v4: uuidv4 } = require('uuid')
const createParams = {"base": "testbase", "website_input" : {"uuid":uuidv4(), "content": "String for testing","url": "String for testing"}}
module.exports = (scenario, conductorConfig) => {
  scenario("create_website", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_website_result = await alice.call("websites", "websites", "create_website", createParams)
    await s.consistency()
    console.log('create_website_result', create_website_result)
    const read_website_result = await alice.call("websites", "websites", "read_website", {"id": create_website_result.Ok.id, "created_at": create_website_result.Ok.createdAt})
    t.deepEqual(create_website_result, read_website_result)
  })

  scenario("rebase_website", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_website_result = await alice.call("websites", "websites", "create_website", createParams)
    await s.consistency()
    console.log('create_website_result', create_website_result)
    const read_website_result = await alice.call("websites", "websites", "rebase_website", {"base_from": "testbase", "base_to": "testbase_rebase", "id": create_website_result.Ok.id, "created_at": create_website_result.Ok.createdAt})
    await s.consistency()
    const list_websites_result_1 = await alice.call("websites", "websites", "list_websites", {"base": "testbase"})
    t.deepEqual(list_websites_result_1.Ok.length, 0)
    const list_websites_result_2 = await alice.call("websites", "websites", "list_websites", {"base": "testbase_rebase"})
    t.deepEqual(list_websites_result_2.Ok.length, 1)  
  })

  scenario("list_websites", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("websites", "websites", "create_website", createParams)
	  await alice.call("websites", "websites", "create_website", createParams)
    await alice.call("websites", "websites", "create_website", createParams)
    await alice.call("websites", "websites", "create_website", createParams)
    await s.consistency()
    const list_websites_result = await alice.call("websites", "websites", "list_websites", {"base": "testbase"})
    t.deepEqual(list_websites_result.Ok.length, 4)
  })

  scenario("anyone-update-website", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_website_result = await alice.call("websites", "websites", "create_website", createParams)
    const update_website_result = await alice.call("websites", "websites", "update_website", {"id": create_website_result.Ok.id, "created_at": create_website_result.Ok.createdAt, "address": create_website_result.Ok.address, "website_input" : {"uuid": create_website_result.Ok.uuid, "content": "Update string for testing","url": "Update string for testing"}})
    await s.consistency()
    const read_website_result = await alice.call("websites", "websites", "read_website", {"id": update_website_result.Ok.id, "created_at": update_website_result.Ok.createdAt})
    t.deepEqual(update_website_result, read_website_result)

    const update_website_result_2 = await bob.call("websites", "websites", "update_website", {"id": update_website_result.Ok.id, "created_at": update_website_result.Ok.createdAt, "address": update_website_result.Ok.address, "website_input" : {"uuid": update_website_result.Ok.uuid, "content": "Update string for testing","url": "Update string for testing"}})
    await s.consistency()
    const read_website_result_2 = await alice.call("websites", "websites", "read_website", {"id": update_website_result_2.Ok.id, "created_at": update_website_result_2.Ok.createdAt})
    t.deepEqual(update_website_result_2, read_website_result_2)
  })

  scenario("anyone-delete-website", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_website_result = await alice.call("websites", "websites", "create_website", createParams)
    await s.consistency()
    const list_websites_result = await alice.call("websites", "websites", "list_websites", {"base": "testbase"})
    t.deepEqual(list_websites_result.Ok.length, 1)
    await bob.call("websites", "websites", "delete_website", {"base": "testbase", "id": create_website_result.Ok.id, "created_at": create_website_result.Ok.createdAt, "address": create_website_result.Ok.address })
    await s.consistency()
    const list_websites_result_2 = await alice.call("websites", "websites", "list_websites", {"base": "testbase"})
    t.deepEqual(list_websites_result_2.Ok.length, 0)
  })

}