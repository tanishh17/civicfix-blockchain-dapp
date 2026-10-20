// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title CivicFix - a transparent community repair request registry
/// @notice Residents publish repair requests, volunteers claim them, and the
///         original requester verifies completion. No personal data is stored.
contract CivicFix {
    enum Status { Open, Claimed, Completed, Cancelled }

    struct RepairRequest {
        uint256 id;
        address requester;
        address volunteer;
        string title;
        string location;
        string details;
        uint64 createdAt;
        Status status;
    }

    address public immutable administrator;
    string public communityName;
    uint256 public requestCount;
    uint256 public completedCount;

    mapping(uint256 => RepairRequest) private requests;

    event RequestCreated(uint256 indexed requestId, address indexed requester, string title);
    event RequestClaimed(uint256 indexed requestId, address indexed volunteer);
    event RequestCompleted(uint256 indexed requestId, address indexed requester, address indexed volunteer);
    event RequestCancelled(uint256 indexed requestId, address indexed requester);

    modifier requestExists(uint256 requestId) {
        require(requestId > 0 && requestId <= requestCount, "Request does not exist");
        _;
    }

    modifier onlyRequester(uint256 requestId) {
        require(msg.sender == requests[requestId].requester, "Only requester can perform this action");
        _;
    }

    constructor(string memory initialCommunityName) {
        require(bytes(initialCommunityName).length >= 3, "Community name is too short");
        administrator = msg.sender;
        communityName = initialCommunityName;
    }

    function createRequest(
        string calldata title,
        string calldata location,
        string calldata details
    ) external returns (uint256 requestId) {
        require(bytes(title).length >= 5 && bytes(title).length <= 80, "Title must contain 5 to 80 characters");
        require(bytes(location).length >= 3 && bytes(location).length <= 80, "Location must contain 3 to 80 characters");
        require(bytes(details).length >= 10 && bytes(details).length <= 500, "Details must contain 10 to 500 characters");

        requestId = ++requestCount;
        requests[requestId] = RepairRequest({
            id: requestId,
            requester: msg.sender,
            volunteer: address(0),
            title: title,
            location: location,
            details: details,
            createdAt: uint64(block.timestamp),
            status: Status.Open
        });

        emit RequestCreated(requestId, msg.sender, title);
    }

    function claimRequest(uint256 requestId) external requestExists(requestId) {
        RepairRequest storage item = requests[requestId];
        require(item.status == Status.Open, "Request is not open");
        require(msg.sender != item.requester, "Requester cannot claim own request");
        item.volunteer = msg.sender;
        item.status = Status.Claimed;
        emit RequestClaimed(requestId, msg.sender);
    }

    function completeRequest(uint256 requestId)
        external
        requestExists(requestId)
        onlyRequester(requestId)
    {
        RepairRequest storage item = requests[requestId];
        require(item.status == Status.Claimed, "Request must be claimed first");
        item.status = Status.Completed;
        completedCount += 1;
        emit RequestCompleted(requestId, msg.sender, item.volunteer);
    }

    function cancelRequest(uint256 requestId)
        external
        requestExists(requestId)
        onlyRequester(requestId)
    {
        RepairRequest storage item = requests[requestId];
        require(item.status == Status.Open, "Only an open request can be cancelled");
        item.status = Status.Cancelled;
        emit RequestCancelled(requestId, msg.sender);
    }

    function getRequest(uint256 requestId)
        external
        view
        requestExists(requestId)
        returns (RepairRequest memory)
    {
        return requests[requestId];
    }

    function getAllRequests() external view returns (RepairRequest[] memory result) {
        result = new RepairRequest[](requestCount);
        for (uint256 i = 1; i <= requestCount; i++) {
            result[i - 1] = requests[i];
        }
    }
}
