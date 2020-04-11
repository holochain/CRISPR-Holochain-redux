#![feature(proc_macro_hygiene)]
use hdk_proc_macros::zome;
use serde_derive::{Deserialize, Serialize};
use hdk::{
    entry_definition::ValidatingEntryType,
    error::ZomeApiResult,
    holochain_core_types::time::Iso8601,
    holochain_persistence_api::cas::content::Address,
};

use crate::note::NoteEntry;
use crate::note::Note;
pub mod note;

#[zome]
mod notes {

    #[init]
    fn init() {
        Ok(())
    }

    #[validate_agent]
    pub fn validate_agent(validation_data: EntryValidationData<AgentId>) {
        Ok(())
    }

    #[entry_def]
    fn anchor_def() -> ValidatingEntryType {
        holochain_anchors::anchor_definition()
    }

    #[entry_def]
     fn note_entry_def() -> ValidatingEntryType {
        note::entry_definition()
    }

    #[zome_fn("hc_public")]
    fn create_note(note_input: NoteEntry) -> ZomeApiResult<Note> {
        note::handlers::create_note(note_input)
    }

    #[zome_fn("hc_public")]
    fn get_note(id: Address, created_at: Iso8601) -> ZomeApiResult<Note> {
        note::handlers::get_note(id, created_at)
    }

    #[zome_fn("hc_public")]
    fn update_note(id: Address, created_at: Iso8601, address: Address, note_input: NoteEntry) -> ZomeApiResult<Note> {
        note::handlers::update_note(id, created_at, address, note_input)
    }

    #[zome_fn("hc_public")]
    fn remove_note(id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
        note::handlers::remove_note(id, created_at, address)
    }

    #[zome_fn("hc_public")]
    fn list_notes() -> ZomeApiResult<Vec<Note>> {
        note::handlers::list_notes()
    }
    
}
