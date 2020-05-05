pub fn update(id: Address, created_at: Iso8601, address: Address, column_input: ColumnEntry) -> ZomeApiResult<Column> {
    let updated_entry_address = hdk::update_entry(Entry::App(COLUMN_ENTRY_NAME.into(), column_input.clone().into()), &address.clone())?;
    Column::existing(id.clone(), created_at, updated_entry_address, column_input)
}