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
    },
};

pub mod handlers;

const PROFILES_ANCHOR_TYPE: &str = "list_profiles";
const PROFILE_ENTRY_LINK_TYPE: &str = "profile_link";
const PROFILE_ENTRY_NAME: &str = "profile";

#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
#[serde(rename_all = "camelCase")]
pub struct ProfileEntry {_commaReplaceFields
}

#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
#[serde(rename_all = "camelCase")]
pub struct Profile {
    id: Address,
    created_at: Iso8601,
    address: Address,
    updated_at: Iso8601,_commaReplaceFields
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

impl Profile {
    pub fn new(address: Address, entry: ProfileEntry) -> ZomeApiResult<Profile> {
        Ok(Profile{
            id: address.clone(),
            created_at: timestamp(address.clone())?,
            address: address.clone(),
            updated_at: timestamp(address.clone())?,_commaReplaceFields
        })
    }
}

impl Profile {
    pub fn existing(id: Address, created_at: Iso8601, address: Address, entry: ProfileEntry) -> ZomeApiResult<Profile> {
        Ok(Profile{
            id: id.clone(),
            created_at: created_at.clone(),
            address: address.clone(),
            updated_at: timestamp(address.clone())?,_commaReplaceFields
        })
    }
}

pub fn definition() -> ValidatingEntryType {
    entry!(
        name: PROFILE_ENTRY_NAME,
        description: "The entry with the content.",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | _validation_data: hdk::EntryValidationData<ProfileEntry>| {
            Ok(())
        },
        links: [
            from!(      
                holochain_anchors::ANCHOR_TYPE,
                link_type: PROFILE_ENTRY_LINK_TYPE,
                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },
                validation: | _validation_data: hdk::LinkValidationData| {
                    Ok(())
                }
            )
        ]
    )
}
