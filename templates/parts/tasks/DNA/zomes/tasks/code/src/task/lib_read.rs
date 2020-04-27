    #[zome_fn("hc_public")]
    fn read_task(id: Address, created_at: Iso8601) -> ZomeApiResult<Task> {
        task::handlers::read(id, created_at)
    }