pub fn rebase(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
    hdk::remove_link(&origins_anchor(base_from)?, &id, ORIGIN_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::link_entries(&origins_anchor(base_to)?, &id, ORIGIN_ENTRY_LINK_TYPE, &created_at.to_string())
}