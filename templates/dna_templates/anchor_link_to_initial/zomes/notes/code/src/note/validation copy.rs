use hdk::{
    holochain_core_types::{
        chain_header::ChainHeader,
        link::link_data::LinkData
    }
};
use crate::note::NoteEntry;

pub fn validate_entry_create(entry: NoteEntry, validation_data: hdk::ValidationData) -> Result<(), String> {
    hdk::debug(format!("validate_entry_create_entry: {:?}", entry)).ok();
    hdk::debug(format!("validate_entry_create_validation_data: {:?}", validation_data)).ok();
    Ok(())
}

pub fn validate_entry_modify(new_entry: NoteEntry, old_entry: NoteEntry, old_entry_header: ChainHeader, validation_data: hdk::ValidationData) -> Result<(), String> {
    hdk::debug(format!("validate_entry_modify_new_entry: {:?}", new_entry)).ok();
    hdk::debug(format!("validate_entry_modify_old_entry: {:?}", old_entry)).ok();
    hdk::debug(format!("validate_entry_modify_old_entry_header: {:?}", old_entry_header)).ok();
    hdk::debug(format!("validate_entry_modify_validation_data: {:?}", validation_data)).ok();
    Ok(())
}

pub fn validate_entry_delete(old_entry: NoteEntry, old_entry_header: ChainHeader, validation_data: hdk::ValidationData) -> Result<(), String> {
    hdk::debug(format!("validate_entry_delete_old_entry: {:?}", old_entry)).ok();
    hdk::debug(format!("validate_entry_delete_old_entry_header: {:?}", old_entry_header)).ok();
    hdk::debug(format!("validate_entry_delete_validation_data: {:?}", validation_data)).ok();
    Ok(())
}

pub fn validate_link_add(link: LinkData, validation_data: hdk::ValidationData) -> Result<(), String> {
    hdk::debug(format!("validate_link_add_link: {:?}", link)).ok();
    hdk::debug(format!("validate_link_add_validation_data: {:?}", validation_data)).ok();
    Ok(())
}

pub fn validate_link_remove(link: LinkData, validation_data: hdk::ValidationData) -> Result<(), String> {
    hdk::debug(format!("validate_link_remove_link: {:?}", link)).ok();
    hdk::debug(format!("validate_link_remove_validation_data: {:?}", validation_data)).ok();
    Ok(())
}
