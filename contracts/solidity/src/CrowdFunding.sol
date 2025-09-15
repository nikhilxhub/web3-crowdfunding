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
    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner, 
        string memory _title, 
        string memory _description, 
        uint256 _target, 
        uint256 _deadline, 
        string memory _image

    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;


        numberOfCampaigns++;

        // newly created campaign is stored at index
        return numberOfCampaigns-1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];


        // donate to campaign
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent){
            campaign.amountCollected = campaign.amountCollected + amount;
        }




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





}
