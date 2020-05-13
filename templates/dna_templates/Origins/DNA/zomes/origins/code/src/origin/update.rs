pub fn update(id: Address, created_at: Iso8601, address: Address, origin_input: OriginEntry) -> ZomeApiResult<Origin> {
    let updated_entry_address = hdk::update_entry(Entry::App(ORIGIN_ENTRY_NAME.into(), origin_input.clone().into()), &address.clone())?;
    Origin::existing(id.clone(), created_at, updated_entry_address, origin_input)
}