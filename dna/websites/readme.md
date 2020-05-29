# Install `nix-shell` on your machine, using this one-line command:

```
curl https://nixos.org/nix/install | sh
```

(Note: we currently support macOS and Linux only; please see our [development environment setup guide](https://developer.holochain.org/docs/install/) to set up Linux and `nix-shell` on Windows.)

## 1 - Get Holonix and enter the development environment

Holonix is a full Holochain development environment built with the [Nix package manager](https://nixos.org/nix/). Download Holonix and enter the shell:

```
$ nix-shell https://holochain.love
```

## 2 - Start it up

```
yarn start
```
This will configure a new Holochain conductor with the demo data added and run the UI once the conductor has startd up.
