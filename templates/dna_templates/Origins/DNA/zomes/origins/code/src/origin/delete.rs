pub fn delete(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
    hdk::remove_link(&origins_anchor(base)?, &id, ORIGIN_ENTRY_LINK_TYPE, &created_at.to_string())?;
    hdk::remove_entry(&address)
}