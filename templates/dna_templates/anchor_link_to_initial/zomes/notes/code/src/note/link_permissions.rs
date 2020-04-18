use hdk::holochain_core_types::link::link_data::LinkData;
use crate::note::validation;

pub fn validate_permissions_link_add(link: LinkData, validation_data: hdk::ValidationData) -> Result<(), String> {
    validation::validate_link_add(link, validation_data)
}

pub fn validate_permissions_link_remove(link: LinkData, validation_data: hdk::ValidationData) -> Result<(), String> {
    validation::validate_link_remove(link, validation_data)
}
