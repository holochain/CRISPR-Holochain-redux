    #[zome_fn("hc_public")]
    fn create_column(base: String, column_input: ColumnEntry) -> ZomeApiResult<Column> {
        column::handlers::create(base, column_input)
    }