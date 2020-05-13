    #[zome_fn("hc_public")]
    fn read_origin(id: Address, created_at: Iso8601) -> ZomeApiResult<Origin> {
        origin::handlers::read(id, created_at)
    }