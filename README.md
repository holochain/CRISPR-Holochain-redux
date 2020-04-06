# How to start Holochain Developer

Make sure you have nix-shell installed

```
nix-shell https://holochain.love
hn-holocahin-developer
```



<div>Icon made from <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a> is licensed by CC BY 3.0</div>


Reserved field names


WebComponents can be used in any app

Permission role of "No-one" controls if Modify and Remove are generated.

type_1_entry: 
- Developer defined fields
    - title {String,textfield}
    - content {String,textarea}
- Generated Structs
    - type_1_entry
    - type_1
        - [address, address of type_1_entry]
- Links []
- Anchors []
- Assumes that parent app is keeping track of Address such as a Comment entry linked to a Post.
- zome_fns
    - [] create_entry(type_1_entry) --> type_1[type_1.address = Address(type_1_id)]
        - commit type_1_entry
    - [] modify_entry(type_1) --> type_1[type_1.address = Modified Address(type_1_id)]
        - modify type_1_entry
    - [] remove_entry(type_1.address) --> Removed Address(type_1_id)
        - remove type_1_entry
- UI
    - Item
        - [] address [text]
        - [] title [textfield]
        - [] content [textarea]


type_2_entry
- Developer defined fields
    - id (reserved field name)
    - title [textfield]
    - content [textarea]    
- Generated Structs
    - type_2_entry
    - type_2_id
        - initial_entry_address [address of intial type_2_entry]
        - initial_entry_created_at [created_at of intial type_2_entry]
    - type_2
        - [type_2_entry, address of type_2_id]
- Links
    - from type_2_id
- Anchors []
- zome_fns
    - [] create_entry(type_2_entry) --> type_2[type_2.id = Address of type_2_id]
        - commit type_2_entry
        - new type_2_id
            - initial_entry_address [address of intial type_2_entry]
            - initial_entry_created_at [created_at of intial type_2_entry]
        - link type_2_id --> new type_2_entry
    - [] modify_entry(type_2), type_2_id (doesnt change)
        - link type_2_id --> new type_2_entry
        - Remove old link type_2_id --> previous type_2_entry
    - [] remove_entry(type_2.Id) --> Address
        - Remove link type_2_id --> type_2_entry
        - Remove type_2_entry
- UI
    - Item
        - id [text]
        - title [textfield]
        - content [textarea]


Pattern 3
- Developer defined fields
    - id (reserved field name)
    - created_at (reserved field name)
    - updated_at (reserved field name)
    - title [textfield]
    - content [textarea]    
- Generated Structs
    - type_3_entry
    - type_3_id
        - initial_entry_address [address of intial type_2_entry]
        - initial_entry_created_at [created_at of intial type_2_entry]
    - type_3
        - [type_3.id = address of type_3_id, type_3.created_at = type_3_id.created_at, type_3.updated_at = type_3_entry.created_at, type_3_entry]
- Links
    - from type_3_id
    - type_3_id from type_3
- Anchors 
    - AnchorType "type_3_list"
    - AnchorText ""
- zome_fns
    - [] create_entry(type_3_entry) --> type_3[type_3.id = Address type_3_id, type_3.created_at = type_3_id.initial_entry_created_at, type_3.updated_at = type_3_id.initial_entry_created_at]
        - commit type_3_entry
        - new type_3_id
            - initial_entry_address [address of intial type_3_entry]
            - initial_entry_created_at [created_at of intial type_3_entry]
        - link type_3_id --> new type_3_entry
        - link type_3_list --> new type_3_id
    - [] modify_entry(type_3) --> type_3[type_3.updated_at = type_3_entry.timestamp]
        - link type_3_id --> new type_3_entry
        - Remove old link type_3_id --> previous type_3_entry
    - [] remove_entry(type_3.Id) --> Address
        - Remove link type_3_id --> type_3_entry
        - Remove link type_3_list --> type_3_id
        - Remove type_3_id
        - Remove type_3_entry
- UI
    - Item
        - id [text]
        - created_at [text]
        - updated_at [text]
        - title [textfield]
        - content [textarea]