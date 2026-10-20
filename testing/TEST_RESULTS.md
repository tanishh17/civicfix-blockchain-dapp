# CivicFix Test Cases and Observed Results

## Testing Environment

- DApp: CivicFix Community Repair Request Registry
- Smart contract: `CivicFix.sol`
- Solidity compiler: `0.8.24`
- Development environment: Remix IDE
- Blockchain: Ganache Local
- Frontend: HTML, CSS, JavaScript, and Ethers.js
- Wallet integration: MetaMask

The smart contract was deployed through Remix, and the CivicFix frontend was opened in a browser.

**Note:** The following table records the required test cases. Tests must be executed against the deployed contract before their observed results can be marked as passed.

| ID | Category | Account and Input | Expected Result | Observed Result |
|---|---|---|---|---|
| T01 | Valid | Account A creates a request with title `Broken streetlight`, location `Library north gate`, and details `Light has remained off for three nights.` | Transaction succeeds. Request 1 is created with Open status and appears in the frontend. | Pending verification. Record the actual transaction result, request ID, and transaction hash. |
| T02 | Valid | Account B calls `claimRequest(1)`. | Transaction succeeds. Account B becomes the volunteer, and the request status changes to Claimed. | Pending verification. Record the actual transaction result and transaction hash. |
| T03 | Valid | Account A calls `completeRequest(1)` after Account B claims the request. | Transaction succeeds. The request status changes to Completed, and `completedCount` increases by one. | Pending verification. Record the actual transaction result and transaction hash. |
| T04 | Invalid | An account attempts to create a request with title `Lamp`. | The contract rejects the transaction with `Title must contain 5 to 80 characters`. | Pending verification. Record the actual revert message. |
| T05 | Invalid | An account calls `getRequest(999)` when request 999 does not exist. | The call reverts with `Request does not exist`. | Pending verification. Record the actual revert message. |
| T06 | Invalid | Account A attempts to call `claimRequest(1)` on its own Open request. | The transaction reverts with `Requester cannot claim own request`. | Pending verification. Record the actual revert message. |
| T07 | Unauthorised | Account B attempts to call `cancelRequest(1)` on Account A's Open request. | The transaction reverts with `Only requester can perform this action`. | Pending verification. Record the actual revert message. |
| T08 | Unauthorised | Account B attempts to call `completeRequest(1)` on Account A's Claimed request. | The transaction reverts with `Only requester can perform this action`. | Pending verification. Record the actual revert message. |

## Evidence Log

For each successful transaction, record:

- Test ID
- Account used
- Contract function called
- Transaction hash
- Block number
- Gas used
- Resulting request status
- Corresponding screenshot filename

For each rejected transaction or failed call, record:

- Test ID
- Account used
- Contract function called
- Input supplied
- Actual revert message or rejection reason
- Corresponding screenshot filename

## Required Screenshots

Save genuine screenshots of the actual application and testing sessions in the `evidence/` directory.

| Filename | Evidence |
|---|---|
| `01-remix-compilation.png` | Successful Solidity compilation in Remix |
| `02-remix-deployment.png` | Successful CivicFix contract deployment |
| `03-metamask-connected.png` | MetaMask connected to CivicFix on the correct network |
| `04-successful-transaction.png` | Successful repair-request transaction |
| `05-failed-transaction.png` | Rejected invalid or unauthorised operation |
| `06-blockchain-data-ui.png` | Blockchain data and repair requests displayed in the frontend |

## Testing Notes

1. Execute the tests against the deployed CivicFix contract.
2. Use at least two distinct accounts for the unauthorised-access tests.
3. Ensure that each test's initial contract state satisfies its preconditions.
4. Record actual results rather than assuming that the expected behaviour occurred.
5. Do not use transaction hashes or deployment details from a different or temporary blockchain instance as evidence of the actual deployment.
6. Update each observed-result entry after executing the corresponding test.
