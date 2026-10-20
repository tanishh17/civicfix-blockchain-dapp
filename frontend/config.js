// Replace after deploying CivicFix.sol through Remix IDE.
const CONTRACT_ADDRESS = "0xBA3ccee216D93d4fD784c6C4620659F333A8812b";

const CONTRACT_ABI = [
  "function communityName() view returns (string)",
  "function completedCount() view returns (uint256)",
  "function createRequest(string title,string location,string details) returns (uint256)",
  "function claimRequest(uint256 requestId)",
  "function completeRequest(uint256 requestId)",
  "function cancelRequest(uint256 requestId)",
  "function getAllRequests() view returns ((uint256 id,address requester,address volunteer,string title,string location,string details,uint64 createdAt,uint8 status)[])",
  "event RequestCreated(uint256 indexed requestId,address indexed requester,string title)",
  "event RequestClaimed(uint256 indexed requestId,address indexed volunteer)",
  "event RequestCompleted(uint256 indexed requestId,address indexed requester,address indexed volunteer)",
  "event RequestCancelled(uint256 indexed requestId,address indexed requester)"
];
