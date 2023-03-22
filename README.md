# Prerequisites

1. Download this repo.
2. Install Node.js and NPM.
3. Run ```npm install```.
3. Populate address & mnemonic fields in wallets.js file (proxy & userAgent are optional).

# Before you start

* Sometimes active RPC might change, check for possible RPCs in the account.js file.
* Sui network is prone to frequent updates, hence expect functions to be irrelevant quite frequently.

# How to

To run a chosen function within any file, one needs to:
1. Uncomment it.
2. Provide arguments: either a mnemonic or a path to the location of the wallets.js, e.g.:

    ```mintToken("seed seed seed seed seed seed seed seed seed seed seed seed")```

    or

    ```mintRandomTokenMultipleAddresses("resources/wallets.js")```
3. Run in terminal (change path to a desired file):

    ```node src/activities/transaction/sendTokenToMultipleAddresses.js```

## Functions sorted by their stability
* ### Quite stable:
    > src/activities/belaunch/mintTicketMultipleAddresses.js
    src/activities/frenemies/registerWithMultipleAddresses.js
    src/activities/nft/mintNftMultipleAddresses.js
    src/activities/omnibtc/claimRandomTokenMultipleAddresses.js
    src/activities/suiswap/mintRandomTokenMultipleAddresses.js
    src/activities/transaction/sendTokenToMultipleAddresses.js

* ### Still stable:
    > src/activities/delegation/delegateMultipleAddresses.js
    src/activities/polymedia/sendMessageMultipleAddresses.js

* ### Only if you're lucky enough:
    > src/activities/capy/handleCapysMultipleAddresses.js
    
* ### Don't even try:
    > src/activities/suiswap/swapToken.js







