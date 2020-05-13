    #[zome_fn("hc_public")]
    fn list_origins(base: String) -> ZomeApiResult<Vec<Origin>> {
        origin::handlers::list(base)
    }