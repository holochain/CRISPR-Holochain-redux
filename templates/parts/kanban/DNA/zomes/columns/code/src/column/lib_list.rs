    #[zome_fn("hc_public")]
    fn list_columns(base: String) -> ZomeApiResult<Vec<Column>> {
        column::handlers::list(base)
    }