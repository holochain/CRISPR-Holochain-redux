#![feature(proc_macro_hygiene)]
use hdk_proc_macros::zome;
use serde_derive::{Deserialize, Serialize};
use hdk::{
    entry_definition::ValidatingEntryType,
    error::ZomeApiResult,
    holochain_persistence_api::cas::content::Address
};

// happ declarations
use crate::happ::HappEntry;
use crate::happ::Happ;
pub mod happ;
// end happ declarations

#[zome]
mod holochain_developer {

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


    // happ functions
    #[entry_def]
     fn happ_def() -> ValidatingEntryType {
        happ::definition()
    }

    #[zome_fn("editor")]
    fn create_happ(happ_input: HappEntry) -> ZomeApiResult<Happ> {
        happ::handlers::create_happ(happ_input)
    }

    #[zome_fn("hc_public")]
    fn get_happ(id: Address) -> ZomeApiResult<Happ> {
        happ::handlers::get_happ(id)
    }

    #[zome_fn("hc_public")]
    fn update_happ(id: Address, happ_input: HappEntry) -> ZomeApiResult<Happ> {
        happ::handlers::update_happ(id, happ_input)
    }

    #[zome_fn("hc_public")]
    fn remove_happ(id: Address) -> ZomeApiResult<Address> {
        happ::handlers::remove_happ(id)
    }

    #[zome_fn("hc_public")]
    fn list_happs() -> ZomeApiResult<Vec<Happ>> {
        happ::handlers::list_happs()
    }
    // end happ functions
}
