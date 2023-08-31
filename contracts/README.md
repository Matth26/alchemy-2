# Contracts

This folder come from the official [Dojo Starter guide](https://book.dojoengine.org/cairo/hello-dojo.html)

# Running it locally

Build the project: `sozo build`

Run the testnet local Katana server: `katana --disable-fee`

Then you can deploy the project on Katana: `sozo migrate --name test`

Last step is to start the torii indexer: `torii`
Executing the above activates a local torii server using SQLite as its database, which is exposed at http://0.0.0.0:8080.