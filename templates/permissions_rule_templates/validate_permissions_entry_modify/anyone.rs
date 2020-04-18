pub fn validate_permissions_entry_modify(new_entry: NoteEntry, old_entry: NoteEntry, old_entry_header: ChainHeader, validation_data: hdk::ValidationData) -> Result<(), String> {
    validation::validate_entry_modify(new_entry, old_entry, old_entry_header, validation_data)
}