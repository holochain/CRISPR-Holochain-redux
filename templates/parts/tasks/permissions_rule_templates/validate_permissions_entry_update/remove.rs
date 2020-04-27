// No-one allowed to update
pub fn validate_permissions_entry_modify(_new_entry: TaskEntry, _old_entry: TaskEntry, _old_entry_header: ChainHeader, _validation_data: hdk::ValidationData) -> Result<(), String> {
  Err("No-one allowed to update".to_string())
}