    #[zome_fn("hc_public")]
    fn update_task(id: Address, created_at: Iso8601, address: Address, task_input: TaskEntry) -> ZomeApiResult<Task> {
        task::handlers::update(id, created_at, address, task_input)
    }