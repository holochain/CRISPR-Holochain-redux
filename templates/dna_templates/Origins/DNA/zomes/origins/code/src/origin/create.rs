pub fn create(base: String, origin_entry: OriginEntry) -> ZomeApiResult<Origin> {
    let entry = Entry::App(ORIGIN_ENTRY_NAME.into(), origin_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let origin = Origin::new(entry_address.clone(), origin_entry)?;
    hdk::link_entries(&origins_anchor(base)?, &entry_address, ORIGIN_ENTRY_LINK_TYPE, &origin.created_at.to_string())?;
    Ok(origin)
}