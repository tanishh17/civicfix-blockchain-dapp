# CivicFix Community Repair Request Registry

CivicFix is an original Ethereum DApp for neighbourhoods, campuses, and housing communities that need a transparent way to report small repair needs and coordinate volunteers. A resident publishes a request, a different wallet claims it, and only the original requester can verify completion. The contract keeps a tamper-evident status history without storing personal information or private credentials.

## Assignment requirement map

| Requirement | Implementation |
|---|---|
| Solidity variables, functions, constructor, and validation | `contracts/CivicFix.sol` contains typed state, four state-changing functions, two retrieval functions, a validating constructor, modifiers, require checks, events, a struct, enum, and mapping. |
| HTML, CSS, and JavaScript frontend | `frontend/index.html`, `frontend/styles.css`, and `frontend/app.js`. |
| MetaMask through Ethers.js | `frontend/app.js` uses `ethers.BrowserProvider(window.ethereum)` and `eth_requestAccounts`; Ethers.js is loaded in `index.html`. |
| Blockchain transactions | Create, claim, complete, and cancel actions send signed transactions and wait for receipts. |
| Retrieve and display blockchain data | The UI calls `communityName`, `completedCount`, and `getAllRequests`, then renders the results. |
| Valid, invalid, and unauthorised testing | Exact test cases and observed-result fields are in `testing/TEST_RESULTS.md`. |

## Repository structure

```text
CivicFix_Assignment2/
├── contracts/CivicFix.sol
├── frontend/index.html
├── frontend/styles.css
├── frontend/app.js
├── frontend/config.js
├── deployment/DEPLOYMENT.md
├── testing/TEST_RESULTS.md
└── evidence/
```

## Compile and deploy exactly through Remix IDE

1. Open Remix IDE at `https://remix.ethereum.org` and create `CivicFix.sol`.
2. Copy the full contents of `contracts/CivicFix.sol` into that file.
3. Open **Solidity Compiler**, choose compiler `0.8.24`, and compile `CivicFix.sol`. Save a screenshot as `evidence/01-remix-compilation.png`.
4. Start Ganache and create a workspace, or select the permitted Ethereum test network in MetaMask. If using Ganache, add its RPC network to MetaMask and import only a Ganache development account into MetaMask. Never commit the private key.
5. In Remix **Deploy and Run Transactions**, select **Injected Provider - MetaMask** (or Remix's Ganache provider), verify the expected network and account, choose `CivicFix`, enter a constructor string such as `VIT Community`, and select **Deploy**.
6. Confirm the transaction in MetaMask. Record the public contract address, network, chain ID, deployment transaction hash, and public deployer address in `deployment/DEPLOYMENT.md`. Save the deployment screenshot as `evidence/02-remix-deployment.png`.
7. Paste the deployed address into `frontend/config.js` without changing the ABI.

## Run the frontend

Browsers block some wallet features when an HTML file is opened directly, so serve the folder over localhost:

```bash
cd frontend
python3 -m http.server 8080
```

Open `http://localhost:8080`. Select **Connect MetaMask**, approve the connection, and verify that MetaMask is on the same network used for deployment. Save the wallet screenshot as `evidence/03-metamask-connected.png`.

## Interact with the contract

1. From Account A, create a valid repair request. Confirm the MetaMask transaction and wait for the success message.
2. Switch MetaMask to Account B and refresh. Claim the request.
3. Switch back to Account A and confirm completion.
4. Use **Refresh** to retrieve the latest `RepairRequest` records and completed count from the blockchain.
5. Capture `evidence/04-successful-transaction.png` and `evidence/06-blockchain-data-ui.png`.

## Execute and record all required tests

Follow every row in `testing/TEST_RESULTS.md`. Use at least two distinct test accounts so unauthorised calls are genuine. For the failed case screenshot, trigger one invalid or unauthorised transaction, keep the revert message visible, and save it as `evidence/05-failed-transaction.png`. Replace every `Pending execution` entry with the exact observed result and relevant hash or revert text.

## Security and privacy

- Never commit private keys, wallet seed phrases, passwords, `.env` files, or provider credentials.
- Verify the network, contract address, and transaction details in MetaMask before signing.
- Only public wallet and transaction addresses belong in the deployment record.
- This course project has not been professionally audited and should not be used to manage real funds.
