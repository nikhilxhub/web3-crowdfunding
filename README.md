# 🌐 CrowdFund — Decentralized Crowdfunding Platform

CrowdFund is a Web3 crowdfunding dApp where users can launch campaigns and receive Ethereum contributions transparently. Built with **React**, **TailwindCSS**, and powered by a **Solidity smart contract** deployed on the **Sepolia testnet**, this platform enables trustless fundraising with a clean, responsive UI.

---

## 🚀 Features

- 📝 Create campaigns with title, description, target amount, and deadline
- 💸 Donate ETH directly from your wallet
- 📊 Track campaign progress and contributor stats
- 🔐 Withdraw funds or refund donors based on campaign outcome
- 🎨 Elegant UI with ShadCN, Framer Motion, and Radix primitives

---

## 🧰 Tech Stack

| Layer        | Tools & Libraries                                                                 |
|--------------|------------------------------------------------------------------------------------|
| Frontend     | React, Vite, TailwindCSS, ShadCN UI, Framer Motion, Radix UI                      |
| Blockchain   | Solidity, Ethers.js, Thirdweb SDK, Forge                                                 |
| Styling      | Tailwind Merge, clsx, class-variance-authority                                    |
| Routing      | React Router DOM                                                                  |
| Form & Validation | React Hook Form, Zod, @hookform/resolvers                                   |
| Animation    | GSAP, Framer Motion, tw-animate-css                                               |

---

## 🔧 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/nikhilxhub/web3-crowdfunding
cd client

# Install dependencies
npm install

# Create .env file
touch .env

✍️ Add the following to .env
VITE_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
SECRET_KEY=your_secret_key

## 📦 Contract Structure

- `createCampaign(...)`: Initializes a new campaign
- `donateToCampaign(...)`: Allows users to contribute ETH
- `getCampaigns()`: Returns all campaigns
- `getDonators(campaignId)`: Lists contributors for a campaign
- `withdrawFunds(campaignId)`: Allows campaign owner to withdraw funds
- `refundDonors(campaignId)`: Refunds contributors if target not met

# Start local dev server
npm run dev

# Build for production
npm run build

🤝 How to Contribute
We welcome contributions! Here's how you can help:

1.Fork the repo

2.Create a new branch git checkout -b feature/your-feature-name

3.Make your changes

4.Run lint and build checks

5.Commit and push git commit -m "Add: your feature" git push origin feature/your-feature-name

6.Open a Pull Request
