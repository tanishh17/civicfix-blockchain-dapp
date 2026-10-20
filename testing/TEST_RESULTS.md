# CivicFix test cases and observed results

Run these cases in Remix and the frontend after deployment. Replace `Pending execution` only with the actual observed result and transaction hash or revert message.

| ID | Category | Account and input | Expected result | Observed result |
|---|---|---|---|---|
| T01 | Valid | Account A creates title `Broken streetlight`, location `Library north gate`, details `Light has remained off for three nights.` | Transaction succeeds; request 1 is Open and appears in the UI. | Pending execution |
| T02 | Valid | Account B calls `claimRequest(1)`. | Transaction succeeds; volunteer is Account B and status is Claimed. | Pending execution |
| T03 | Valid | Account A calls `completeRequest(1)`. | Transaction succeeds; status is Completed and `completedCount` increases. | Pending execution |
| T04 | Invalid | Any account creates a request with title `Lamp` (fewer than 5 characters). | Transaction reverts with `Title must contain 5 to 80 characters`. | Pending execution |
| T05 | Invalid | Any account calls `getRequest(999)` when that ID does not exist. | Call reverts with `Request does not exist`. | Pending execution |
| T06 | Invalid | Account A calls `claimRequest(1)` on its own Open request. | Transaction reverts with `Requester cannot claim own request`. | Pending execution |
| T07 | Unauthorised | Account B calls `cancelRequest(1)` for Account A's Open request. | Transaction reverts with `Only requester can perform this action`. | Pending execution |
| T08 | Unauthorised | Account B calls `completeRequest(1)` for Account A's Claimed request. | Transaction reverts with `Only requester can perform this action`. | Pending execution |

## Evidence log

For successful transactions record the transaction hash, block number, gas used, account, function, and resulting state. For failed transactions record the account, function, input, and exact revert message. Place the screenshots in `evidence/` and reference the relevant filename in this table.
