# Decentralized Blogging Platform

A basic Ethereum smart contract for a blogging application where users can write posts and create profiles on the blockchain.

## Prerequisites
- **Node.js** (for package management)
- **Remix IDE** (for contract development to obtain the ABI and contract address)
- **MetaMask** (or another Ethereum wallet)

## Installing

### Compiling and Deploying the Contract
1. Compile the Solidity contract (`BlogPlatform.sol`) using Remix IDE or any other development environment.
2. Deploy the compiled contract using MetaMask (injected Web3) to obtain the contract address and ABI.
3. Deploy the contract to your preferred Ethereum network (local, testnet, or mainnet).

### Frontend Setup
1. Create an `index.html` file for the frontend layout.
2. Create a `styles.css` file for basic styling.
3. Create a `script.js` file for interaction with the deployed smart contract using your contract ABI and address.

## Usage
1. Open `index.html` in your web browser.
2. Connect your MetaMask wallet to the correct Ethereum network.
3. Use the form to create a profile by entering your name and bio.
4. View existing posts displayed on the page.

## Example Code
Here is an example of how to interact with the smart contract in `script.js`:

```javascript
// Function to connect to the wallet
async function connectWallet() {
    if (window.ethereum) {
        try {
            // Request account access if needed
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(`Connected account: ${accounts[0]}`);

            // Initialize ethers provider and signer
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();

            // Create a connection to the smart contract
            contract = new ethers.Contract(contractAddress, contractABI, signer);

            alert('Wallet connected');
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            alert('Failed to connect wallet. Check the console for more details.');
        }
    } else {
        alert('No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.');
    }
}

// Add event listener to connect wallet button
document.getElementById('connectWalletButton').addEventListener('click', connectWallet);
```
## License
This project is licensed under the MIT License.

## Author
Sakshi Vishwakarma
