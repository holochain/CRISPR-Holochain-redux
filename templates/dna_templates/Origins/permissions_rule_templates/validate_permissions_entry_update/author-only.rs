// Author only allowed to update
pub fn validate_permissions_entry_modify(new_entry: NoteEntry, old_entry: NoteEntry, old_entry_header: ChainHeader, validation_data: hdk::ValidationData) -> Result<(), String> {
  match (old_entry_header.provenances().get(0), validation_data.package.chain_header.provenances().get(0)) {
    (Some(o), Some(p))  if o.source() == p.source() => {
        validation::validate_entry_modify(new_entry, old_entry, old_entry_header, validation_data)  
    }
    (Some(_o), Some(_p))  => Err("Agent who did not author is trying to update".to_string()),
    _ => Err("No provenance on this validation_data".to_string()),
  }
}