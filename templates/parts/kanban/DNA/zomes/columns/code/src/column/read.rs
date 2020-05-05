pub fn read(id: Address, created_at: Iso8601) -> ZomeApiResult<Column> {
    let column_entry: ColumnEntry = hdk::utils::get_as_type(id.clone())?;
    let address = Entry::App(COLUMN_ENTRY_NAME.into(), column_entry.clone().into()).address();
    Column::existing(id.clone(), created_at, address, column_entry)
}