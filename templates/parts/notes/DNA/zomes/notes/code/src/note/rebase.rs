pub fn rebase(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
    hdk::remove_link(&notes_anchor(base_from)?, &id, NOTE_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::link_entries(&notes_anchor(base_to)?, &id, NOTE_ENTRY_LINK_TYPE, &created_at.to_string())
}