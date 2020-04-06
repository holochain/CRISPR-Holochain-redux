    if let (Some(o), Some(p)) = (old_entry_header.provenances().get(0), validation_data.package.chain_header.provenances().get(0)) {
      if o.source() != p.source() {
        Err("Agent who did not author is trying to update".to_string())
      }
    }
    else {
      Err("No provenance on this validation_data".to_string())
    }