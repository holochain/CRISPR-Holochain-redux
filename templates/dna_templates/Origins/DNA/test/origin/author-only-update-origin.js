  scenario("author-only-update-origin", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_origin_result = await alice.call("originszome", "originszome", "create_origin", createParams)
    console.log('create_origin_result', create_origin_result)
    const update_origin_result = await bob.call("originszome", "originszome", "update_origin", {"id": create_origin_result.Ok.id, "created_at": create_origin_result.Ok.createdAt, "address": create_origin_result.Ok.address, "origin_input" : {"uuid": create_origin_result.Ok.uuid, _updateFields}})
    t.deepEqual(JSON.parse(update_origin_result.Err.Internal).kind, { ValidationFailed: 'Agent who did not author is trying to update' })
  })