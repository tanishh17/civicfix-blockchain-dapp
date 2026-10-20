# Automated preflight verification

This preflight is supplementary evidence, not a substitute for the assignment's required Remix IDE screenshots and observed-results record.

- Compiler: Solidity `0.8.24+commit.e11b9ed9`
- Verification network: ephemeral local Ganache chain
- Result: contract compiled and all eight required valid, invalid, and unauthorised behaviours passed on 20 October 2026.

| Test | Verified behaviour | Result |
|---|---|---|
| T01 | A valid repair request is created with Open status. | Pass |
| T02 | A different account claims the Open request. | Pass |
| T03 | The requester completes the Claimed request and increments the completed count. | Pass |
| T04 | A four-character title reverts with `Title must contain 5 to 80 characters`. | Pass |
| T05 | Reading non-existent request 999 reverts with `Request does not exist`. | Pass |
| T06 | A requester claiming their own request reverts with `Requester cannot claim own request`. | Pass |
| T07 | A non-requester cancelling a request reverts with `Only requester can perform this action`. | Pass |
| T08 | A non-requester completing a request reverts with `Only requester can perform this action`. | Pass |

The verification chain was intentionally ephemeral; its addresses and hashes are not deployment evidence and must not be copied into `deployment/DEPLOYMENT.md` or the final submission.
