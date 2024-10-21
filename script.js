const token = 'EAAPniues4f4BO3D8pcAW79kk1lBKHLZCcZBpXZCkZCWqfUTa5X9YgrQ1kki1ivpHQ13qUXW6MJK2VTLMT9wc3VFyBJLiZBo0N0zhWrsdHYer0gkYHnrCcN4YGhifDupZCZB2KNaPVw3Xjtmq4HlUCG8wpOKEfoOxZCNn0Sao4CngDgYbzhOqXUYC0QZDZD'; // Replace with your access token
const userId = '854184200246348'; // Replace with your user id (Instagram Business/Creator Account)

const postsContainer = document.getElementById('posts-container');
const hashtagInput = document.getElementById('hashtag');
const loadPostsButton = document.getElementById('loadPostsButton');
const hashtagTitle = document.getElementById('hashtagTitle');

// Function to get the hashtag ID from Instagram API
async function getHashtagId(hashtagName) {
  const response = await fetch(`https://graph.instagram.com/ig_hashtag_search?user_id=${userId}&q=${hashtagName}&access_token=${token}`);
  const data = await response.json();
  if (data.data && data.data.length > 0) {
    return data.data[0].id; // Return the first hashtag ID
  } else {
    throw new Error('Hashtag not found');
  }
}

// Function to fetch recent media by hashtag
async function fetchPostsByHashtag(hashtagName) {
  try {
    // Clear existing posts
    postsContainer.innerHTML = '';

    // Update the hashtag title on the page
    hashtagTitle.innerText = `#${hashtagName}`;

    // Get the hashtag ID
    const hashtagId = await getHashtagId(hashtagName);

    // Fetch the posts for the given hashtag
    const response = await fetch(`https://graph.instagram.com/${hashtagId}/recent_media?user_id=${userId}&fields=id,caption,media_type,media_url,permalink&access_token=${token}`);
    const data = await response.json();

    // Display posts on the page
    displayPosts(data.data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    postsContainer.innerHTML = `<p>Error fetching posts for #${hashtagName}</p>`;
  }
}

// Function to display posts on the page
function displayPosts(posts) {
  if (posts && posts.length > 0) {
    posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('instagram-post');

      if (post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM') {
        postDiv.innerHTML = `
          <a href="${post.permalink}" target="_blank">
            <img src="${post.media_url}" alt="Instagram post" width="100%">
          </a>
          <p>${post.caption || ''}</p>
        `;
      } else if (post.media_type === 'VIDEO') {
        postDiv.innerHTML = `
          <a href="${post.permalink}" target="_blank">
            <video width="100%" controls>
              <source src="${post.media_url}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </a>
          <p>${post.caption || ''}</p>
        `;
      }

      postsContainer.appendChild(postDiv);
    });
  } else {
    postsContainer.innerHTML = '<p>No posts found for this hashtag.</p>';
  }
}

// Event listener for the Load Posts button
loadPostsButton.addEventListener('click', () => {
  const hashtagName = hashtagInput.value.trim();
  if (hashtagName) {
    fetchPostsByHashtag(hashtagName);
  } else {
    alert('Please enter a valid hashtag.');
  }
});
