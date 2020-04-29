    #[zome_fn("hc_public")]
    fn delete_note(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
        note::handlers::delete(base, id, created_at, address)
    }