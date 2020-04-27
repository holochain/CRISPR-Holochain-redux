pub fn list(base: String) -> ZomeApiResult<Vec<Task>> {
    hdk::get_links(&tasks_anchor(base)?, LinkMatch::Exactly(TASK_ENTRY_LINK_TYPE), LinkMatch::Any)?.links()
    .iter()
    .map(|link| read(link.address.clone(), Iso8601::try_from(link.tag.clone()).unwrap()))
    .collect()
}