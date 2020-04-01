# Holochain Developer IDE



Use https://www.nodegit.org/ to manage merges with modified code.
When code is gemerated and written a new git branch will be created and the new code goes in there so any mods by a dev are not over written and can be merged in again by the dev.







Ideas
Skins:
- Desktop - Holochain (Electron)
- Web - Holo
- Mobile??

Players & Roles with Permissions per Entry Type or Anchor Type
- Create
- Delete
- Link Add
- Link Delete

Use Entity Builder in built hApp so new apps can be built.
Add fields, select view, edit, list templates
I can use this to build artist sites like http://philt3r.rocks
Select a template, the fields for the template get added like Profile Spec builder and Entity Builder.
Can build new templates and load them at runtime https://alligator.io/vuejs/v-runtime-template/
works just like Personas & Profiles, create a profile spec, save profiles.

> When hApps are built with this type of DNA modifying entities doesnt require a new DNA. Only works for persona DHTs.

Template editor for DNA & UI Templates
- Add + per hApp
- Edit + per hApp
- Delete + per hApp

Add Capabilities Editor

Capability eg editor

Associate capability type eg editor to a function

Create a Capability Grant ('editor') that auto generates the list of functions granted at runtime.

Add assignees agent pub key to the Grant at runtime.

Give Agent a Capability Claim that has the Grant name ('editor'), Grantor Id, Secret and the function list.

When Agent wants to execute a function:
- Create a Direct Message with Capability Claim
    - function call
    - secret (API Key)
    - Signed as its sent.



Look into json Schema for entry data.
Default test data, zome name - entry type name - field name
Required
field validation


Permissions
Always Author, Anyone
Remove check for Author Create

Anyone create remove other checks as it overrides

Validfation rules now only for entry specific requirements, no need to manage who does what as Permissions do that.

For git merge
check if t

# eat-sleep-code-repeat

## What I do

Create and Manage websites for DJs and Producers using eat-sleep-code-repeat hApp.
eat-sleep-code-repeat hApp enables me to add WebSite Types such as 
- DJ
- Producer
- DJ & Producer
- CV
and select the theme and colours of the website.
- Dark
- Light
- primary
- secondary
- accent

### Create a new website

Steps for me to publish a new website on Crazy Domains hosting.

- Setup domain
- Click +
- Enter domain name
- Select web site type 
- Select theme & palette
- Fill out template
- Publish

### Holochain 

Use "Holochain Developer" hApp to add WebSite Type UI component, Escr zome with website-type typeSpec to this project. 