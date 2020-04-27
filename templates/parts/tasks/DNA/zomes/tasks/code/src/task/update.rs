pub fn update(id: Address, created_at: Iso8601, address: Address, task_input: TaskEntry) -> ZomeApiResult<Task> {
    let updated_entry_address = hdk::update_entry(Entry::App(TASK_ENTRY_NAME.into(), task_input.clone().into()), &address.clone())?;
    Task::existing(id.clone(), created_at, updated_entry_address, task_input)
}