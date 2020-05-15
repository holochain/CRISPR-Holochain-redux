pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Origin> {
    let origin_entry: OriginEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(ORIGIN_ENTRY_NAME.into(), origin_entry.clone().into()).address();
    Origin::existing(id.clone(), created_at, address, origin_entry)
}