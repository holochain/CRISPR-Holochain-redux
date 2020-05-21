const { v4: uuidv4 } = require('uuid')
const createParams = {"base": "testbase", "rating_input" : {"uuid":uuidv4(), "rating": 0}}
module.exports = (scenario, conductorConfig) => {
  scenario("create_rating", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_rating_result = await alice.call("ratings", "ratings", "create_rating", createParams)
    await s.consistency()
    console.log('create_rating_result', create_rating_result)
    const read_rating_result = await alice.call("ratings", "ratings", "read_rating", {"id": create_rating_result.Ok.id, "created_at": create_rating_result.Ok.createdAt})
    t.deepEqual(create_rating_result, read_rating_result)
  })

  scenario("rebase_rating", async (s, t) => {
    const {alice} = await s.players({alice: conductorConfig}, true)
    const create_rating_result = await alice.call("ratings", "ratings", "create_rating", createParams)
    await s.consistency()
    console.log('create_rating_result', create_rating_result)
    const read_rating_result = await alice.call("ratings", "ratings", "rebase_rating", {"base_from": "testbase", "base_to": "testbase_rebase", "id": create_rating_result.Ok.id, "created_at": create_rating_result.Ok.createdAt})
    await s.consistency()
    const list_ratings_result_1 = await alice.call("ratings", "ratings", "list_ratings", {"base": "testbase"})
    t.deepEqual(list_ratings_result_1.Ok.length, 0)
    const list_ratings_result_2 = await alice.call("ratings", "ratings", "list_ratings", {"base": "testbase_rebase"})
    t.deepEqual(list_ratings_result_2.Ok.length, 1)  
  })

  scenario("list_ratings", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    await alice.call("ratings", "ratings", "create_rating", createParams)
	  await alice.call("ratings", "ratings", "create_rating", createParams)
    await alice.call("ratings", "ratings", "create_rating", createParams)
    await alice.call("ratings", "ratings", "create_rating", createParams)
    await s.consistency()
    const list_ratings_result = await alice.call("ratings", "ratings", "list_ratings", {"base": "testbase"})
    t.deepEqual(list_ratings_result.Ok.length, 4)
  })

  scenario("anyone-update-rating", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_rating_result = await alice.call("ratings", "ratings", "create_rating", createParams)
    const update_rating_result = await alice.call("ratings", "ratings", "update_rating", {"id": create_rating_result.Ok.id, "created_at": create_rating_result.Ok.createdAt, "address": create_rating_result.Ok.address, "rating_input" : {"uuid": create_rating_result.Ok.uuid, "rating": 1}})
    await s.consistency()
    const read_rating_result = await alice.call("ratings", "ratings", "read_rating", {"id": update_rating_result.Ok.id, "created_at": update_rating_result.Ok.createdAt})
    t.deepEqual(update_rating_result, read_rating_result)

    const update_rating_result_2 = await bob.call("ratings", "ratings", "update_rating", {"id": update_rating_result.Ok.id, "created_at": update_rating_result.Ok.createdAt, "address": update_rating_result.Ok.address, "rating_input" : {"uuid": update_rating_result.Ok.uuid, "rating": 1}})
    await s.consistency()
    const read_rating_result_2 = await alice.call("ratings", "ratings", "read_rating", {"id": update_rating_result_2.Ok.id, "created_at": update_rating_result_2.Ok.createdAt})
    t.deepEqual(update_rating_result_2, read_rating_result_2)
  })

  scenario("anyone-delete-rating", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_rating_result = await alice.call("ratings", "ratings", "create_rating", createParams)
    await s.consistency()
    const list_ratings_result = await alice.call("ratings", "ratings", "list_ratings", {"base": "testbase"})
    t.deepEqual(list_ratings_result.Ok.length, 1)
    await bob.call("ratings", "ratings", "delete_rating", {"base": "testbase", "id": create_rating_result.Ok.id, "created_at": create_rating_result.Ok.createdAt, "address": create_rating_result.Ok.address })
    await s.consistency()
    const list_ratings_result_2 = await alice.call("ratings", "ratings", "list_ratings", {"base": "testbase"})
    t.deepEqual(list_ratings_result_2.Ok.length, 0)
  })

}