pub fn delete(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&tasks_anchor(base)?, &id, TASK_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
}