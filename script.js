let provider;
let signer;
let contract;

// Replace with your contract address and ABI
const contractAddress = '0xabEDBFB99caf46c7F208Bbc3c06d793715763dd8'; // Update with your actual contract address

const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            }
        ],
        "name": "createPost",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "bio",
                "type": "string"
            }
        ],
        "name": "createProfile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "posts",
        "outputs": [
            {
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPosts",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "author",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "content",
                        "type": "string"
                    }
                ],
                "internalType": "struct SocialMedia.Post[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "profiles",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "bio",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

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

// Function to create profile
async function createProfile(event) {
    event.preventDefault();

    if (!contract) {
        alert('Connect your wallet first to create a profile.');
        return;
    }

    const name = document.getElementById('profileName').value;
    const bio = document.getElementById('profileBio').value;

    try {
        await contract.createProfile(name, bio);
        alert('Profile created successfully!');
    } catch (error) {
        console.error('Error creating profile:', error);
        alert('Error creating profile. Check console for details.');
    }
}

// Function to create post
async function createPost(event) {
    event.preventDefault();

    if (!contract) {
        alert('Connect your wallet first to create a post.');
        return;
    }

    const content = document.getElementById('postContent').value;

    try {
        await contract.createPost(content);
        alert('Post created successfully!');
        // Refresh post list after creating post
        getPosts();
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Error creating post. Check console for details.');
    }
}

// Function to get all posts
async function getPosts() {
    try {
        if (!contract) {
            alert('Connect your wallet first to fetch posts.');
            return;
        }

        const posts = await contract.getPosts();
        // Clear previous posts
        const postList = document.getElementById('postList');
        postList.innerHTML = '';

        // Display each post
        posts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${post.author}</strong>: ${post.content}`;
            postList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error getting posts:', error);
        alert('Error getting posts. Check console for details.');
    }
}

// Add event listeners to forms
document.getElementById('profileForm').addEventListener('submit', createProfile);
document.getElementById('postForm').addEventListener('submit', createPost);

// Automatically load posts when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    getPosts();
});
