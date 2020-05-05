pub fn create(base: String, column_entry: ColumnEntry) -> ZomeApiResult<Column> {
    let column_anchor = columns_anchor(base)?;
    let entry = Entry::App(COLUMN_ENTRY_NAME.into(), column_entry.clone().into());
    let entry_address = hdk::commit_entry(&entry)?;
    let column = Column::new(entry_address.clone(), column_entry)?;
    hdk::link_entries(&column_anchor, &entry_address, COLUMN_ENTRY_LINK_TYPE, &column.created_at.to_string())?;
    Ok(column)
}