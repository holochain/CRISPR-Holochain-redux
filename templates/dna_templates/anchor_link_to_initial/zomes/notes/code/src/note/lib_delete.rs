    #[zome_fn("hc_public")]
    fn delete_note(id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
        note::handlers::delete(id, created_at, address)
    }