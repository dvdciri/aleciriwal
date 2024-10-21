// Example array of post URLs. Replace these with actual post URLs.
const posts = [
  "https://www.instagram.com/p/YourPostID1/",
  "https://www.instagram.com/p/YourPostID2/",
  "https://www.instagram.com/p/YourPostID3/",
  "https://www.instagram.com/p/YourPostID4/",
  "https://www.instagram.com/p/YourPostID5/",
  "https://www.instagram.com/p/YourPostID6/",
  "https://www.instagram.com/p/YourPostID7/",
  "https://www.instagram.com/p/YourPostID8/",
  // Add more URLs as needed
];

const postsContainer = document.getElementById('posts-container');

// Function to create an Instagram post embed
function createInstagramEmbed(postUrl) {
  const postDiv = document.createElement('div');
  postDiv.classList.add('instagram-post');
  postDiv.innerHTML = `
    <blockquote class="instagram-media" data-instgrm-permalink="${postUrl}" data-instgrm-version="14"></blockquote>
  `;
  postsContainer.appendChild(postDiv);
}

// Load Instagram embed script
function loadInstagramEmbedScript() {
  const script = document.createElement('script');
  script.async = true;
  script.src = "https://www.instagram.com/embed.js";
  document.body.appendChild(script);
}

// Initialize posts
function initializePosts() {
  posts.forEach(postUrl => createInstagramEmbed(postUrl));
  loadInstagramEmbedScript();
}

// Call initialize on page load
window.onload = initializePosts;
