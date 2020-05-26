use serde_derive::{Deserialize, Serialize};
use holochain_json_derive::DefaultJson;
use hdk::{
    self,
    entry,
    from,
    link,
    entry_definition::ValidatingEntryType,
    holochain_core_types::{
        dna::entry_types::Sharing,
        time::Timeout,
        time::Iso8601,
    },
    holochain_json_api::{
        json::JsonString,
        error::JsonError,
    },
    prelude::*,
    holochain_persistence_api::cas::content::{
        Address,
    }
};

pub mod handlers;
pub mod entry_permissions;
pub mod link_permissions;
pub mod validation;

const PERSONAFIELDS_ANCHOR_TYPE: &str = "list_personafields";
const PERSONAFIELD_ENTRY_LINK_TYPE: &str = "personafield_link";
const PERSONAFIELD_ENTRY_NAME: &str = "personafield";

#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
#[serde(rename_all = "camelCase")]
pub struct PersonafieldEntry {
    uuid: String,
	fields_field_id: String,
	value: String,
}

#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
#[serde(rename_all = "camelCase")]
pub struct Personafield {
    id: Address,
    created_at: Iso8601,
    address: Address,
    updated_at: Iso8601,
    uuid: String,
	fields_field_id: String,
	value: String,
}

fn timestamp(address: Address) -> ZomeApiResult<Iso8601> {
    let options = GetEntryOptions{status_request: StatusRequestKind::Latest, entry: false, headers: true, timeout: Timeout::new(10000)};
    let entry_result = hdk::get_entry_result(&address, options)?;
    match entry_result.result {
        GetEntryResultType::Single(entry) => {
            Ok(entry.headers[0].timestamp().clone())
        },
        _ => {
            unreachable!()
        }
    }
}

impl Personafield {
    pub fn new(address: Address, entry: PersonafieldEntry) -> ZomeApiResult<Personafield> {
        Ok(Personafield{
            id: address.clone(),
            created_at: timestamp(address.clone())?,
            address: address.clone(),
            updated_at: timestamp(address.clone())?,
            uuid: entry.uuid,
			fields_field_id: entry.fields_field_id,
			value: entry.value,
        })
    }
}

impl Personafield {
    pub fn existing(id: Address, created_at: Iso8601, address: Address, entry: PersonafieldEntry) -> ZomeApiResult<Personafield> {
        Ok(Personafield{
            id: id.clone(),
            created_at: created_at.clone(),
            address: address.clone(),
            updated_at: timestamp(address.clone())?,
            uuid: entry.uuid,
			fields_field_id: entry.fields_field_id,
			value: entry.value,
        })
    }
}

pub fn definition() -> ValidatingEntryType {
    entry!(
        name: PERSONAFIELD_ENTRY_NAME,
        description: "The entry with the content.",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | validation_data: hdk::EntryValidationData<PersonafieldEntry>| {
            match validation_data
            {
                hdk::EntryValidationData::Create{entry, validation_data} =>
                {
                    entry_permissions::validate_permissions_entry_create(entry, validation_data)
                },
                hdk::EntryValidationData::Modify{new_entry, old_entry, old_entry_header, validation_data} =>
                {
                    entry_permissions::validate_permissions_entry_modify(new_entry, old_entry, old_entry_header, validation_data)
                },
                hdk::EntryValidationData::Delete{old_entry, old_entry_header, validation_data} =>
                {
                    entry_permissions::validate_permissions_entry_delete(old_entry, old_entry_header, validation_data)
                }
            }
        },
        links: [
            from!(      
                holochain_anchors::ANCHOR_TYPE,
                link_type: PERSONAFIELD_ENTRY_LINK_TYPE,
                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },
                validation: |validation_data: hdk::LinkValidationData| {
                    match validation_data
                    {
                        hdk::LinkValidationData::LinkAdd{link, validation_data} =>
                        {
                            link_permissions::validate_permissions_link_add(link, validation_data)
                        },
                        hdk::LinkValidationData::LinkRemove{link, validation_data} =>
                        {
                            link_permissions::validate_permissions_link_remove(link, validation_data)
                        }
                    }
                }
            )
        ]
    )
}
