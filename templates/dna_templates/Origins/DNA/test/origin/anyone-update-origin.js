  scenario("anyone-update-origin", async (s, t) => {
    const {alice, bob} = await s.players({alice: conductorConfig, bob: conductorConfig}, true)
    const create_origin_result = await alice.call("origins", "origins", "create_origin", createParams)
    const update_origin_result = await alice.call("origins", "origins", "update_origin", {"id": create_origin_result.Ok.id, "created_at": create_origin_result.Ok.createdAt, "address": create_origin_result.Ok.address, "origin_input" : {"uuid": create_origin_result.Ok.uuid, _updateFields}})
    await s.consistency()
    const read_origin_result = await alice.call("origins", "origins", "read_origin", {"id": update_origin_result.Ok.id, "created_at": update_origin_result.Ok.createdAt})
    t.deepEqual(update_origin_result, read_origin_result)

    const update_origin_result_2 = await bob.call("origins", "origins", "update_origin", {"id": update_origin_result.Ok.id, "created_at": update_origin_result.Ok.createdAt, "address": update_origin_result.Ok.address, "origin_input" : {"uuid": update_origin_result.Ok.uuid, _updateFields}})
    await s.consistency()
    const read_origin_result_2 = await alice.call("origins", "origins", "read_origin", {"id": update_origin_result_2.Ok.id, "created_at": update_origin_result_2.Ok.createdAt})
    t.deepEqual(update_origin_result_2, read_origin_result_2)
  })