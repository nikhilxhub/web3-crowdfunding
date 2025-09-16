// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => uint256) public balances;

    uint256 public numberOfCampaigns = 0;

    event CampaignCreated(uint256 id, address owner, string title, uint256 target, uint256 deadline);
    event DonationReceived(uint256 id, address donator, uint256 amount);
    event FundsWithdrawn(uint256 id, address owner, uint256 amount);

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image

    ) public returns (uint256) {
        require(_deadline > block.timestamp, "The deadline should be in the future.");
        require(_target > 0, "Target amount must be greater than zero.");

        Campaign storage campaign = campaigns[numberOfCampaigns];

        campaign.owner = msg.sender;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;


        emit CampaignCreated(numberOfCampaigns, msg.sender, _title, _target, _deadline);

        numberOfCampaigns++;

        // newly created campaign is stored at index
        return numberOfCampaigns-1;
    }

    function donateToCampaign(uint256 _id) public payable {

        Campaign storage campaign = campaigns[_id];

        require(block.timestamp <=  campaign.deadline, "The campaign has ended");
        require(campaign.amountCollected < campaign.target, "Them campaign has already reached its target");
        require(msg.value > 0, "Donation amount must be greater than zero.");
        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);
        campaign.amountCollected += msg.value;
        balances[_id] += msg.value;

        emit DonationReceived(_id, msg.sender, msg.value);

    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory){

        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    // function getCampaigns() public view returns (Campaign[] memory){
    //     Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

    //     for(uint i = 0; i < numberOfCampaigns; i++){
    //         Campaign storage item = campaigns[i];

    //         allCampaigns[i] = item;
    //     }

    //     return allCampaigns;

    // }

    function getCampaigns() public view returns (
        address[] memory, string[] memory, string[] memory,
        uint256[] memory, uint256[] memory, uint256[] memory, string[] memory
    ) {
        address[] memory owners = new address[](numberOfCampaigns);
        string[] memory titles = new string[](numberOfCampaigns);
        string[] memory descriptions = new string[](numberOfCampaigns);
        uint256[] memory targets = new uint256[](numberOfCampaigns);
        uint256[] memory deadlines = new uint256[](numberOfCampaigns);
        uint256[] memory amounts = new uint256[](numberOfCampaigns);
        string[] memory images = new string[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage c = campaigns[i];
            owners[i] = c.owner;
            titles[i] = c.title;
            descriptions[i] = c.description;
            targets[i] = c.target;
            deadlines[i] = c.deadline;
            amounts[i] = c.amountCollected;
            images[i] = c.image;
        }

        return (owners, titles, descriptions, targets, deadlines, amounts, images);
    }

    function getCampaignStatus(uint256 _id) public view returns (string memory) {
        Campaign storage campaign = campaigns[_id];

        if (block.timestamp > campaign.deadline) {
            if (campaign.amountCollected >= campaign.target) {
                return "Successful";
            } else {
                return "Failed";
            }
        } else {
            return "Ongoing";
        }
    }




}
