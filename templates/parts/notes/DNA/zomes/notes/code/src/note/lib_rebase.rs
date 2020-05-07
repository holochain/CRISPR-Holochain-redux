    #[zome_fn("hc_public")]
    fn rebase_note(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
        note::handlers::rebase(base_from, base_to, id, created_at)
    }