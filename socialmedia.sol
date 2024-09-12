// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SocialMedia {
    struct Profile {
        string name;
        string bio;
    }

    struct Post {
        address author;
        string content;
    }

    mapping(address => Profile) public profiles;
    Post[] public posts;

    // Function to create a profile
    function createProfile(string memory name, string memory bio) public {
        profiles[msg.sender] = Profile(name, bio);
    }

    // Function to create a post
    function createPost(string memory content) public {
        posts.push(Post(msg.sender, content));
    }

    // Function to get all posts
    function getPosts() public view returns (Post[] memory) {
        return posts;
    }
}
