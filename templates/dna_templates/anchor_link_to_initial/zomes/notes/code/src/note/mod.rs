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

const NOTES_ANCHOR_TYPE: &str = "list_notes";
const NOTES_ANCHOR_TEXT: &str = "";
const NOTE_ENTRY_LINK_TYPE: &str = "note_link";
const NOTE_ENTRY_NAME: &str = "note";

#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
#[serde(rename_all = "camelCase")]
pub struct NoteEntry {
    // properties
	title: String,
	content: String,
}

#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
#[serde(rename_all = "camelCase")]
pub struct Note {
    id: Address,
    created_at: Iso8601,
    address: Address,
    updated_at: Iso8601,
    // properties
	title: String,
	content: String,
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

impl Note {
    pub fn new(address: Address, entry: NoteEntry) -> ZomeApiResult<Note> {
        Ok(Note{
            id: address.clone(),
            created_at: timestamp(address.clone())?,
            address: address.clone(),
            updated_at: timestamp(address.clone())?,
            // entry properties
			title: entry.title,
			content: entry.content,
        })
    }
}

impl Note {
    pub fn existing(id: Address, created_at: Iso8601, address: Address, entry: NoteEntry) -> ZomeApiResult<Note> {
        Ok(Note{
            id: id.clone(),
            created_at: created_at.clone(),
            address: address.clone(),
            updated_at: timestamp(address.clone())?,
            // entry properties
			title: entry.title,
			content: entry.content,
        })
    }
}

pub fn definition() -> ValidatingEntryType {
    entry!(
        name: NOTE_ENTRY_NAME,
        description: "The entry with the content.",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | validation_data: hdk::EntryValidationData<NoteEntry>| {
            match validation_data
            {
                // entry_validation_functions
                hdk::EntryValidationData::Create{entry, validation_data} =>
                {
                    // entry_permissions::validate_permissions_entry_create
                    entry_permissions::validate_permissions_entry_create(entry, validation_data)
                },
                hdk::EntryValidationData::Modify{new_entry, old_entry, old_entry_header, validation_data} =>
                {
                    // entry_permissions::validate_permissions_entry_update
                    entry_permissions::validate_permissions_entry_modify(new_entry, old_entry, old_entry_header, validation_data)
                },
                hdk::EntryValidationData::Delete{old_entry, old_entry_header, validation_data} =>
                {
                    // entry_permissions::validate_permissions_entry_delete
                    entry_permissions::validate_permissions_entry_delete(old_entry, old_entry_header, validation_data)
                }
            }
        },
        links: [
            from!(      
                holochain_anchors::ANCHOR_TYPE,
                link_type: NOTE_ENTRY_LINK_TYPE,
                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },
                validation: |validation_data: hdk::LinkValidationData| {
                    match validation_data
                    {
                        // link_validation_fucnctions
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
