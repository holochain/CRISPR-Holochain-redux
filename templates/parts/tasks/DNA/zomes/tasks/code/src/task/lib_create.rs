    #[zome_fn("hc_public")]
    fn create_task(base: String, task_input: TaskEntry) -> ZomeApiResult<Task> {
        task::handlers::create(base, task_input)
    }