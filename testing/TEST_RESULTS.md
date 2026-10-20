# CivicFix Test Cases and Test Results

## 1. Testing Environment

- Application: CivicFix Community Repair Request Registry
- Smart Contract: `CivicFix.sol`
- Solidity Compiler: `0.8.24`
- Development Environment: Remix IDE
- Blockchain: Ganache Local
- Wallet: MetaMask
- Frontend: HTML, CSS, JavaScript, and Ethers.js

## 2. Test Results

The following eight test cases cover valid operations, invalid inputs,
and unauthorised access attempts.

| ID | Category | Test Description | Expected Result | Test Result |
|---|---|---|---|---|
| T01 | Valid | Account A creates a repair request with title `Broken streetlight`, location `Library north gate`, and details `Light has remained off for three nights.` | Transaction succeeds; request is created with Open status and displayed in the frontend. | Pass in automated preflight |
| T02 | Valid | Account B calls `claimRequest(1)`. | Transaction succeeds; Account B becomes the volunteer and the status changes to Claimed. | Pass in automated preflight |
| T03 | Valid | Account A calls `completeRequest(1)` after Account B claims the request. | Transaction succeeds; status changes to Completed and `completedCount` increases. | Pass in automated preflight |
| T04 | Invalid | An account creates a request with title `Lamp`. | The contract rejects the request with `Title must contain 5 to 80 characters`. | Pass in automated preflight |
| T05 | Invalid | An account calls `getRequest(999)` when request 999 does not exist. | The call reverts with `Request does not exist`. | Pass in automated preflight |
| T06 | Invalid | Account A attempts to claim its own Open request. | The transaction reverts with `Requester cannot claim own request`. | Pass in automated preflight |
| T07 | Unauthorised | Account B attempts to cancel Account A's Open request. | The transaction reverts with `Only requester can perform this action`. | Pass in automated preflight |
| T08 | Unauthorised | Account B attempts to complete Account A's Claimed request. | The transaction reverts with `Only requester can perform this action`. | Pass in automated preflight |

## 3. Automated Verification

According to `testing/AUTOMATED_PREFLIGHT.md`, all eight
valid, invalid, and unauthorised behaviours passed on an ephemeral
local Ganache chain using Solidity compiler version 0.8.24.

This automated verification demonstrates the expected contract
behaviour on the test chain. It is supplementary to the actual
Remix deployment and frontend testing evidence.

## 4. Evidence Requirements

The following screenshots document compilation, deployment,
wallet connection, transactions, and frontend data:

1. `01-remix-compilation.png`
2. `02-remix-deployment.png`
3. `03-metamask-connected.png`
4. `04-successful-transaction.png`
5. `05-failed-transaction.png`
6. `06-blockchain-data-ui.png`

Screenshots and transaction details should correspond to the
actual testing sessions.

## 5. Conclusion

The automated preflight report records successful verification
of all eight test behaviours, covering valid transactions,
input validation, request-state constraints, and access control.

The actual deployment and frontend evidence should be reviewed
alongside these automated results when evaluating the completed
application.
