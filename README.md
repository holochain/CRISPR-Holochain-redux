# Holochain-IDE

Make sure you have nix-shell installed and clone this repository:

```
nix-shell
yarn ui:start
```

This will start up the IDE with the 3 projects we are building. 
- Holochain IDE
- Personas & Profiles
- Notes

The Holochain-IDE will build opinionated Holochain Apps with lit-element web component UIs and try-o-rama tested DNAs. The entry types

## Notes App
* Built completely with Holochain-IDE
    * When this is done both Holochain-IDE and Personas MVPs will be complete.
    * UI will be a lit-element web component using GraphQl & Apollo Client
* 2 fields
    * Title
    * Content
* Phases
    * Phase 1
        * List all notes
        * Permissions
            * Anyone update or delete
    * Phase 2
        * List Agent Notes only
        * Permissions
            * Anyone update or delete (you can only see your own anyway)
    * Phase 3
        * List all notes
        * Permissions
            * Agent Only update or delete
    * Phase 4
        * List all notes
        * List Agent Notes
        * Permissions
            * Anyone update or delete
    * Phase 5
        * Agent Profile
            * Handle
            * Avatar
        * Notes List shows avatar and handle on each entry


## Personas 
> Details here https://holo.hackmd.io/UApQP-cyS6COLDhSE9piGA
* Field Names App
    * Build model in Holochain-IDE
    * Internationalised
        * en, es, de etc
    * Curated fields list
        * Global DHT
    * Custom fields list
        * Stored in the App DHT
    * Roles based permission for who can manage field name in Global app
    * Web Component UI
        * Field
            * Create
            * Modify
            * Remove
            * List
        * Language
            * Create
            * Modify
            * Remove
            * List
        * Vocabulary (later)
            * Create
            * Modify
            * Remove
            * List
* Profile Spec Builder - used in Holochain IDE
    * POC UI needs team review, UX etc
    * Connect to Field Names App
        * Load from Global DHT
        * Save Custom Fields to the Profile Spec.
            * Save Custom fields to the Holochain-IDE DHT for the App
* Personas Manager
    * Build model in Holochain-IDE
    * POC UI needs team review, UX etc
    * Persona
            * Create
            * Modify
                * + Move field between Personas
            * Remove
            * List
* Profile Manager
    * Build model in Holochain-IDE
    * Profile
        * Only created when Agent fills out a App Profile
        * Modify
        * Remove
        * List


Holochain IDE - MVP
(Scope is to build Notes App and Personas with GraphQl, Apollo & lit-element UI)
* POC is good enough to move on, Arthur prioritising this work
* DNA Model Builder - Builds DNA, also teaches as each part of generated code is viewable on the Entry Type Builder
    * Entry Type Builder
        * Details stored a JSONSchema which will also enable importing schemas later.
        * Specify name of Entry - auto formatted
        * Select a “skin” for entry and list of entries - lit-element web components
        * Set Permissions (Adding a Profile Type Entry enables roles based permissions)
            * Updates functions list
            * Updates permissions code
        * Manage fields list
            * name - auto-formatted
            * type: selector [String only for MVP]
            * selected type has selection of UI components
            * id, created_at, address, updated_at are in every return
                * id = address of EntryId entry for Entry, unchanging
                * created_at = timestamp of initial entry for Entry, field of EntryId
                * address = address of Entry, changes each update
                * updated_at = timestamp Entry
        * Display to developer
            * entry!
                * name:
                * link!: from & type
            * functions - these change depending on Permissions
                * create_entry(entry: Entry) —> id, created_at, address, updated_at, entry
                * Etc
        * Code Viewer
            * mod.rs
            * handlers.rs
            * permissions.rs
            * test/entry_type/index.js
        * Code Editor
            * validation.rs
        * Anchor
            * Type: list_entrys
            * Text:
        * Optional Agent specific list
            * link entries to AgentId, linking to ${agent_id} makes that node an authority and thus entries and links are local and fast to retrieve.
        * Test and Demo data table
            * Rows of suitable data that Agent would enter into App
    * Anchor Type Entry
        * Not configurable by developer for MVP
        * Added by options in linked Entry
        * Auto adds Root Anchor to model
    * Profile Type Entry
        * Profile Spec Builder
            * Part of Personas App see above
        * linked to ${agent_id}
        * Doesn’t need an EntryId as the ${agent_id} is the unchanging Id for the profile entry
        * No permissions management as only the Agent can make changes
        * No need for skin as it uses Personas & Profiles
        * Option
            * Agent can fill out profile
            * Agent must have profile
    * Layout of model on svg canvas.
        * Algorithm for laying out multiple linked entry types and anchors
* Holochain Apps List - Use Modeller to build DNA
    * Create
        * Separate DHT for each Holochain App (Useful for other apps like a chat so each “room” can be completely private)
    * Modify
    * Remove
    * List
    * Zomes
        * Create
        * Modify
        * Remove
        * List
        * Entry Types
            * Create
            * Modify
            * Remove
            * List
        * Anchors
            * Create
            * Modify
            * Remove
            * List
        * Profile Entry Types
            * Create
            * Modify
            * Remove
            * List
