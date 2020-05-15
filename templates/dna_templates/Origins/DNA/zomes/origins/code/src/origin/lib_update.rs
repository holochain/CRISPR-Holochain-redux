    #[zome_fn("hc_public")]
    fn update_origin(id: Address, created_at: Iso8601, address: Address, origin_input: OriginEntry) -> ZomeApiResult<Origin> {
        origin::handlers::update(id, created_at, address, origin_input)
    }