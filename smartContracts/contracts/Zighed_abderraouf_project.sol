// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Zighed_abderraouf_project is Ownable {
    enum State {
        Manufactured,
        AtManufacturer,
        AtDistributor,
        AtRetailer,
        SoldOut
    }

    struct CosmeticItem {
        bytes32 itemId;
        bytes32 batchId;
        bool sold;
        address consumer;
    }

    struct CosmeticBatch {
        bytes32 batchId;
        string brand;
        string item;
        address manufacturer;
        address distributor;
        address retailer;
        State state;
        mapping(uint => CosmeticItem) items;
        uint itemCount;
        bool hasOwnerApproval;
    }

    mapping(bytes32 => CosmeticBatch) private batchIdToCosmeticBatch;

    // events
    event CosmeticsAdded(
        bytes32 indexed batchId,
        string brand,
        string item,
        uint itemCount,
        address manufacturer
    );
    event ManufacturerAssigned(
        bytes32 indexed batchId,
        address indexed manufacturer
    );
    event DistributorAssigned(
        bytes32 indexed batchId,
        address indexed distributor
    );
    event RetailerAssigned(bytes32 indexed batchId, address indexed retailer);
    event GotOwnerApproval(bytes32 indexed batchId);
    event MarkedReadyToPurchase(bytes32 indexed batchId);
    event ItemSold(bytes32 batchId, uint itemId);

    // modifiers
    modifier OnlyManufacturer(bytes32 _batchId) {
        CosmeticBatch storage batch = batchIdToCosmeticBatch[_batchId];
        require(
            batch.manufacturer == msg.sender,
            "Caller is not the Manufacturer"
        );
        _;
    }

    modifier OnlyDistributor(bytes32 _batchId) {
        CosmeticBatch storage batch = batchIdToCosmeticBatch[_batchId];
        require(
            batch.distributor == msg.sender,
            "Caller is not the Distributor"
        );
        _;
    }

    modifier OnlyRetailer(bytes32 _batchId) {
        CosmeticBatch storage batch = batchIdToCosmeticBatch[_batchId];
        require(batch.retailer == msg.sender, "Caller is not the Retailer");
        _;
    }

    // functions

    function addCosmetics(
        string memory brand,
        string memory item,
        uint itemCount
    ) external {
        bytes32 batchId = keccak256(
            abi.encodePacked(
                msg.sender,
                block.timestamp,
                brand,
                item,
                itemCount
            )
        );

        CosmeticBatch storage cosmeticBatch = batchIdToCosmeticBatch[batchId];
        cosmeticBatch.batchId = batchId;
        cosmeticBatch.brand = brand;
        cosmeticBatch.item = item;
        cosmeticBatch.manufacturer = msg.sender;
        cosmeticBatch.state = State.Manufactured;
        cosmeticBatch.itemCount = itemCount;

        for (uint i = 0; i < itemCount; i++) {
            bytes32 itemId = keccak256(abi.encodePacked(batchId, i));
            cosmeticBatch.items[i] = CosmeticItem(
                itemId,
                batchId,
                false,
                address(0)
            );
        }

        emit CosmeticsAdded(batchId, brand, item, itemCount, msg.sender);
    }

    function giveApprovalToBatch(bytes32 _batchId) external onlyOwner {
        CosmeticBatch storage batch = batchIdToCosmeticBatch[_batchId];
        require(batch.batchId == _batchId, "Invalid cosmetics batchId");
        batch.hasOwnerApproval = true;
        emit GotOwnerApproval(_batchId);
    }

    function assignDistributor(
        address _distributor,
        bytes32 _batchId
    ) external OnlyManufacturer(_batchId) {
        CosmeticBatch storage batch = batchIdToCosmeticBatch[_batchId];
        require(batch.batchId == _batchId, "Invalid cosmetics batchId");
        require(batch.hasOwnerApproval, "Has no owner approval");

        batch.distributor = _distributor;
        batch.state = State.AtManufacturer;
        emit DistributorAssigned(_batchId, _distributor);
    }

    function assignRetailer(
        address _retailer,
        bytes32 _batchId
    ) external OnlyDistributor(_batchId) {
        CosmeticBatch storage batch = batchIdToCosmeticBatch[_batchId];
        require(batch.batchId == _batchId, "Invalid cosmetics batchId");
        require(batch.hasOwnerApproval, "Has no owner approval");

        batch.retailer = _retailer;
        batch.state = State.AtDistributor;
        emit RetailerAssigned(_batchId, _retailer);
    }

    function markReadyToPurchase(
        bytes32 _batchId
    ) public OnlyRetailer(_batchId) {
        CosmeticBatch storage batch = batchIdToCosmeticBatch[_batchId];
        require(batch.batchId == _batchId, "Invalid cosmetics batchId");
        require(batch.hasOwnerApproval, "Has no owner approval");

        batch.state = State.AtRetailer;

        emit MarkedReadyToPurchase(_batchId);
    }

    function sellItem(
        bytes32 _batchId,
        uint _itemId,
        address consumer
    ) external OnlyRetailer(_batchId) {
        CosmeticBatch storage batch = batchIdToCosmeticBatch[_batchId];
        require(batch.batchId == _batchId, "Invalid cosmetics batchId");
        require(batch.hasOwnerApproval, "Has no owner approval");

        CosmeticItem storage item = batch.items[_itemId];
        require(!item.sold, "Item already sold");

        item.sold = true;
        item.consumer = consumer;

        bool allItemsSold = true;
        for (uint i = 0; i < batch.itemCount; i++) {
            if (!batch.items[i].sold) {
                allItemsSold = false;
                break;
            }
        }

        if (allItemsSold) {
            batch.state = State.SoldOut;
        }

        emit ItemSold(_batchId, _itemId);
    }

    function getCosmetics(
        bytes32 _batchId
    )
        public
        view
        returns (
            string memory,
            string memory,
            address,
            address,
            address,
            uint8,
            uint,
            bool
        )
    {
        CosmeticBatch storage batch = batchIdToCosmeticBatch[_batchId];

        require(batch.batchId == _batchId, "Invalid cosmetics batchId");

        return (
            batch.brand,
            batch.item,
            batch.manufacturer,
            batch.distributor,
            batch.retailer,
            uint8(batch.state),
            batch.itemCount,
            batch.hasOwnerApproval
        );
    }

    function getCosmeticItemDetails(
        bytes32 _batchId,
        uint _itemId
    ) public view returns (bytes32, bytes32, bool, address) {
        CosmeticBatch storage batch = batchIdToCosmeticBatch[_batchId];
        CosmeticItem storage item = batch.items[_itemId];

        require(batch.batchId == _batchId, "Invalid cosmetics batchId");

        return (item.itemId, item.batchId, item.sold, item.consumer);
    }
}
