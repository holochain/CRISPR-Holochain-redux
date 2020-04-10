use hdk::{
    holochain_core_types::{
        chain_header::ChainHeader,
        link::link_data::LinkData
    }
};
use crate::note::{
    NoteEntry,
    validation,
};

pub fn validate_permissions_entry_create(entry: NoteEntry, validation_data: hdk::ValidationData) -> Result<(), String> {
    validation::validate_entry_create(entry, validation_data)
}

pub fn validate_permissions_entry_modify(new_entry: NoteEntry, old_entry: NoteEntry, old_entry_header: ChainHeader, validation_data: hdk::ValidationData) -> Result<(), String> {
    validation::validate_entry_modify(new_entry, old_entry, old_entry_header, validation_data)
}

pub fn validate_permissions_entry_delete(old_entry: NoteEntry, old_entry_header: ChainHeader, validation_data: hdk::ValidationData) -> Result<(), String> {
    validation::validate_entry_delete(old_entry, old_entry_header, validation_data)
}

pub fn validate_permissions_link_add(link: LinkData, validation_data: hdk::ValidationData) -> Result<(), String> {
    validation::validate_link_add(link, validation_data)
}

pub fn validate_permissions_link_remove(link: LinkData, validation_data: hdk::ValidationData) -> Result<(), String> {
    validation::validate_link_remove(link, validation_data)
}
