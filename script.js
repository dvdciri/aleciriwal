const token = 'IGQWROS3lSbklLOGVOdFJXVWVESWVLNTQxM1RxRWZArUHNFS1FXbElSX1J4U0tKblBGX2ZACNWF0WXJBbm9XbmtJQVJJWWJEMndpam1sYWFPaDN5ZATcwaVZAudDU2b0JySTRrMGpzbjdxZAEtnWlg3clBSNjJtWjh4d0EZD'; // Replace with your access token
const userId = '854184200246348'; // Replace with your user id (Instagram Business/Creator Account)
const hashtagName = 'dogs'; // Replace with your hashtag
const postsContainer = document.getElementById('posts-container');

// Function to get the hashtag ID from Instagram API
async function getHashtagId() {
  const response = await fetch(`https://graph.instagram.com/ig_hashtag_search?user_id=${userId}&q=${hashtagName}&access_token=${token}`);
  const data = await response.json();
  return data.data[0].id; // Return the first hashtag ID
}

// Function to fetch recent media by hashtag
async function fetchPostsByHashtag() {
  try {
    const hashtagId = await getHashtagId();
    const response = await fetch(`https://graph.instagram.com/${hashtagId}/recent_media?user_id=${userId}&fields=id,caption,media_type,media_url,permalink&access_token=${token}`);
    const data = await response.json();
    displayPosts(data.data);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// Function to display posts on the page
function displayPosts(posts) {
  posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('instagram-post');
    
    if (post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM') {
      postDiv.innerHTML = `
        <a href="${post.permalink}" target="_blank">
          <img src="${post.media_url}" alt="Instagram post" width="100%">
        </a>
        <p>${post.caption}</p>
      `;
    } else if (post.media_type === 'VIDEO') {
      postDiv.innerHTML = `
        <a href="${post.permalink}" target="_blank">
          <video width="100%" controls>
            <source src="${post.media_url}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </a>
        <p>${post.caption}</p>
      `;
    }
    
    postsContainer.appendChild(postDiv);
  });
}

// Call the function to fetch and display posts
fetchPostsByHashtag();
