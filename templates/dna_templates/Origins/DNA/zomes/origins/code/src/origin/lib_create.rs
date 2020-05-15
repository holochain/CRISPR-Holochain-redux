    #[zome_fn("hc_public")]
    fn create_origin(base: String, origin_input: OriginEntry) -> ZomeApiResult<Origin> {
        origin::handlers::create(base, origin_input)
    }