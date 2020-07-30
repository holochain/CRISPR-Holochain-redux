use hdk::holochain_core_types::chain_header::ChainHeader;
use crate::origin::{
    OriginEntry,
    validation
};


// Anyone allowed to create
pub fn validate_permissions_entry_create(entry: OriginEntry, validation_data: hdk::ValidationData) -> Result<(), String> {
    validation::validate_entry_create(entry, validation_data)
}

// Anyone allowed to update
pub fn validate_permissions_entry_modify(new_entry: OriginEntry, old_entry: OriginEntry, old_entry_header: ChainHeader, validation_data: hdk::ValidationData) -> Result<(), String> {
    validation::validate_entry_modify(new_entry, old_entry, old_entry_header, validation_data)
}

// Anyone allowed to delete
pub fn validate_permissions_entry_delete(old_entry: OriginEntry, old_entry_header: ChainHeader, validation_data: hdk::ValidationData) -> Result<(), String> {
  validation::validate_entry_delete(old_entry, old_entry_header, validation_data)
}

