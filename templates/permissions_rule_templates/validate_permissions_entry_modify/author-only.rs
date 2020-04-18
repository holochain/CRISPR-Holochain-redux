pub fn validate_permissions_entry_modify(new_entry: NoteEntry, old_entry: NoteEntry, old_entry_header: ChainHeader, validation_data: hdk::ValidationData) -> Result<(), String> {
  if let (Some(o), Some(p)) = (old_entry_header.provenances().get(0), validation_data.package.chain_header.provenances().get(0)) {
    if o.source() != p.source() {
      Err("Agent who did not author is trying to update".to_string())
    }
  }
  else {
    Err("No provenance on this validation_data".to_string())
  }
  validation::validate_entry_modify(new_entry, old_entry, old_entry_header, validation_data)
}