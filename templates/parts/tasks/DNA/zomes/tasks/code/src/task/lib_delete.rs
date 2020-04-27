    #[zome_fn("hc_public")]
    fn delete_task(id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
        task::handlers::delete(id, created_at, address)
    }