    #[zome_fn("hc_public")]
    fn delete_origin(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
        origin::handlers::delete(base, id, created_at, address)
    }