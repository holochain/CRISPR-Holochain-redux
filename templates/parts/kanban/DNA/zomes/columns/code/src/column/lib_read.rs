    #[zome_fn("hc_public")]
    fn read_column(id: Address, created_at: Iso8601) -> ZomeApiResult<Column> {
        column::handlers::read(id, created_at)
    }