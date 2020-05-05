    #[zome_fn("hc_public")]
    fn delete_column(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
        column::handlers::delete(base, id, created_at, address)
    }