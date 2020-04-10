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
        AddressableContent,
    }
};

pub mod handlers;
pub mod permissions;
pub mod validation;

const NOTES_ANCHOR_TYPE: &str = "Notes";
const NOTES_ANCHOR_TEXT: &str = "ListNotes";
const NOTE_ID_LINK_TYPE: &str = "notes";
const NOTE_ID_ENTRY_NAME: &str = "note_id";
const NOTE_ENTRY_LINK_TYPE: &str = "entry";
const NOTE_ENTRY_NAME: &str = "note_entry";


#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
#[serde(rename_all = "camelCase")]
pub struct NoteId {
	initial_entry_address: Address,
    initial_entry_created_at: Iso8601,
}

#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
#[serde(rename_all = "camelCase")]
pub struct NoteEntry {
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
	title: String,
	content: String,
}

fn timestamp(address: Address) -> ZomeApiResult<Iso8601> {
    let options = GetEntryOptions{status_request: StatusRequestKind::Initial, entry: false, headers: true, timeout: Timeout::new(10000)};
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
impl NoteId {
    pub fn new(id: Address) -> ZomeApiResult<NoteId> {
        Ok(NoteId{
            initial_entry_address: id.clone(),
            initial_entry_created_at: timestamp(id)?,
        })
    }
}

impl Note {
    pub fn new(note_id: NoteId, address: Address, note_entry: NoteEntry) -> ZomeApiResult<Note> {
        let note_id_entry = Entry::App(NOTE_ID_ENTRY_NAME.into(), note_id.clone().into());
        hdk::debug(format!("note_id_entry: {:?}",note_id_entry)).ok();
        Ok(Note{
            id: note_id_entry.address(),
            created_at: note_id.initial_entry_created_at,
            address: address.clone(),
            updated_at: note_id.initial_entry_created_at,
			title: note_entry.title,
			content: note_entry.content,
        })
    }
}

impl Note {
    pub fn existing(note_id: NoteId, address: Address, note_entry: NoteEntry) -> ZomeApiResult<Note> {
        let note_id_entry = Entry::App(NOTE_ID_ENTRY_NAME.into(), note_id.clone().into());
        hdk::debug(format!("note_id_entry: {:?}",note_id_entry)).ok();
        Ok(Note{
            id: note_id_entry.address(),
            created_at: note_id.initial_entry_created_at,
            address: address.clone(),
            updated_at: timestamp(address.clone())?,
			title: note_entry.title,
			content: note_entry.content,
        })
    }
}

pub fn id_definition() -> ValidatingEntryType {
    entry!(
        name: NOTE_ID_ENTRY_NAME,
        description: "Constant Id entry for revision entries to link from.",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | validation_data: hdk::EntryValidationData<NoteId>| {
            match validation_data
            {
                hdk::EntryValidationData::Create{entry: _, validation_data: _} =>
                {
                    Ok(())
                },
                hdk::EntryValidationData::Modify{new_entry: _, old_entry: _, old_entry_header: _, validation_data: _} =>
                {
                    Err("Cannot modify the Id entry".to_string())
                },
                hdk::EntryValidationData::Delete{old_entry: _, old_entry_header: _, validation_data: _} =>
                {
                   Ok(())
                }
            }
        },
        links: [
            from!(      
                holochain_anchors::ANCHOR_TYPE,
                link_type: NOTE_ID_LINK_TYPE,
                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },
                validation: |_validation_data: hdk::LinkValidationData| {
                    Ok(())
                }
            )
        ]
    )
}

pub fn entry_definition() -> ValidatingEntryType {
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
                hdk::EntryValidationData::Create{entry, validation_data} =>
                {
                    permissions::validate_permissions_entry_create(entry, validation_data)
                },
                hdk::EntryValidationData::Modify{new_entry, old_entry, old_entry_header, validation_data} =>
                {
                    permissions::validate_permissions_entry_modify(new_entry, old_entry, old_entry_header, validation_data)
                },
                hdk::EntryValidationData::Delete{old_entry, old_entry_header, validation_data} =>
                {
                   permissions::validate_permissions_entry_delete(old_entry, old_entry_header, validation_data)
                }
            }
        },
        links: [
            from!(      
                NOTE_ID_ENTRY_NAME,
                link_type: NOTE_ENTRY_LINK_TYPE,
                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },
                validation: |validation_data: hdk::LinkValidationData| {
                    match validation_data
                    {
                        hdk::LinkValidationData::LinkAdd{link, validation_data} =>
                        {
                            permissions::validate_permissions_link_add(link, validation_data)
                        },
                        hdk::LinkValidationData::LinkRemove{link, validation_data} =>
                        {
                            permissions::validate_permissions_link_remove(link, validation_data)
                        }
                    }
                }
            )
        ]
    )
}
