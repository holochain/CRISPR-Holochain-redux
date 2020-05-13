// No-one allowed to delete
pub fn validate_permissions_entry_delete(_old_entry: OriginEntry, _old_entry_header: ChainHeader, _validation_data: hdk::ValidationData) -> Result<(), String> {
  Err("No-one allowed to delete".to_string())
}