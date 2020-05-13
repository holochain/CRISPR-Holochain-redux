// Anyone allowed to delete
pub fn validate_permissions_entry_delete(old_entry: OriginEntry, old_entry_header: ChainHeader, validation_data: hdk::ValidationData) -> Result<(), String> {
  validation::validate_entry_delete(old_entry, old_entry_header, validation_data)
}