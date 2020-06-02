#![feature(proc_macro_hygiene)]
use hdk_proc_macros::zome;
use serde_derive::{Deserialize, Serialize};
use hdk::{
    entry_definition::ValidatingEntryType,
    error::ZomeApiResult,
    holochain_core_types::time::Iso8601,
    holochain_persistence_api::cas::content::Address,
    api::AGENT_ADDRESS,
};
use holochain_anchors;

pub mod project;
use crate::project::ProjectEntry;
use crate::project::Project;

pub mod profile;
use crate::profile::ProfileEntry;
use crate::profile::Profile;

#[zome]
mod projects {

    #[init]
    fn init() {
        Ok(())
    }

    #[validate_agent]
    pub fn validate_agent(validation_data: EntryValidationData<AgentId>) {
        Ok(())
    }

    #[zome_fn("hc_public")]
    fn agent_address() -> ZomeApiResult<String> {
        Ok(AGENT_ADDRESS.to_string())
    }

    #[entry_def]
    fn anchor_def() -> ValidatingEntryType {
        holochain_anchors::anchor_definition()
    }

    #[zome_fn("hc_public")]
    fn list_anchor_type_addresses() -> ZomeApiResult<Vec<Address>> {
        holochain_anchors::list_anchor_type_addresses()
    }

    #[zome_fn("hc_public")]
    fn list_anchor_type_tags() -> ZomeApiResult<Vec<String>> {
        holochain_anchors::list_anchor_type_tags()
    }    
  
    #[zome_fn("hc_public")]
    fn list_anchor_addresses(anchor_type: String) -> ZomeApiResult<Vec<Address>> {
        holochain_anchors::list_anchor_addresses(anchor_type)
    }

    #[zome_fn("hc_public")]
    fn list_anchor_tags(anchor_type: String) -> ZomeApiResult<Vec<String>> {
        holochain_anchors::list_anchor_tags(anchor_type)
    }
    

    #[entry_def]
    fn profile_entry_def() -> ValidatingEntryType {
        profile::definition()
    }

    #[zome_fn("hc_public")]
    fn create_profile(base: String, profile_input: ProfileEntry) -> ZomeApiResult<Profile> {
        profile::handlers::create(base, profile_input)
    }

    #[zome_fn("hc_public")]
    fn read_profile(id: Address, created_at: Iso8601) -> ZomeApiResult<Profile> {
        profile::handlers::read(id, created_at)
    }

    #[zome_fn("hc_public")]
    fn update_profile(id: Address, created_at: Iso8601, address: Address, profile_input: ProfileEntry) -> ZomeApiResult<Profile> {
        profile::handlers::update(id, created_at, address, profile_input)
    }

    #[zome_fn("hc_public")]
    fn delete_profile(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
        profile::handlers::delete(base, id, created_at, address)
    }

    #[zome_fn("hc_public")]
    fn list_profiles(base: String) -> ZomeApiResult<Vec<Profile>> {
        profile::handlers::list(base)
    }
    #[entry_def]
     fn project_entry_def() -> ValidatingEntryType {
        project::definition()
    }

    #[zome_fn("hc_public")]
    fn create_project(base: String, project_input: ProjectEntry) -> ZomeApiResult<Project> {
        project::handlers::create(base, project_input)
    }

    #[zome_fn("hc_public")]
    fn read_project(id: Address, created_at: Iso8601) -> ZomeApiResult<Project> {
        project::handlers::read(id, created_at)
    }

    #[zome_fn("hc_public")]
    fn update_project(id: Address, created_at: Iso8601, address: Address, project_input: ProjectEntry) -> ZomeApiResult<Project> {
        project::handlers::update(id, created_at, address, project_input)
    }

    #[zome_fn("hc_public")]
    fn delete_project(base: String, id: Address, created_at: Iso8601, address: Address) -> ZomeApiResult<Address> {
        project::handlers::delete(base, id, created_at, address)
    }

    #[zome_fn("hc_public")]
    fn list_projects(base: String) -> ZomeApiResult<Vec<Project>> {
        project::handlers::list(base)
    }

    #[zome_fn("hc_public")]
    fn rebase_project(base_from: String, base_to: String, id: Address, created_at: Iso8601) -> ZomeApiResult<Address> {
        project::handlers::rebase(base_from, base_to, id, created_at)
    }

}