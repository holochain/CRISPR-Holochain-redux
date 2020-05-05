    #[zome_fn("hc_public")]
    fn update_column(id: Address, created_at: Iso8601, address: Address, column_input: ColumnEntry) -> ZomeApiResult<Column> {
        column::handlers::update(id, created_at, address, column_input)
    }