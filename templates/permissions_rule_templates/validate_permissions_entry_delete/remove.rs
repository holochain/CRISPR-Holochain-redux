// No-one allowed to delete
pub fn validate_permissions_entry_delete(old_entry: NoteEntry, old_entry_header: ChainHeader, validation_data: hdk::ValidationData) -> Result<(), String> {
  Err("No-one allowed to delete".to_string()
}