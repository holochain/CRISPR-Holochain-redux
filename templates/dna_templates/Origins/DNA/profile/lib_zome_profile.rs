
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
