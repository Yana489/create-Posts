fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => {
    const list = document.querySelector(".posts-list");
    const searchOfPostsInput = document.querySelector(".search-post");
    
    function displayPosts(json) {
      list.innerHTML = "";
      for (let i = 0; i < json.length; i++) {
        const post = document.createElement("li");
        post.classList.add("post-list-item");
        const postTitle = document.createElement("a");
        postTitle.classList.add("post-title");
        postTitle.setAttribute("href", `post-details.html?id=${json[i].id}`);
        postTitle.setAttribute("target", "_blank");
        postTitle.innerHTML = json[i].title;
        const postText = document.createElement("p");
        postText.classList.add("post-text");
        postText.innerHTML = json[i].body.substring(0, 50) + "...";

        post.append(postTitle, postText);
        list.appendChild(post);
      }
    }
    displayPosts(json);

    searchOfPostsInput.addEventListener("input", searchOfPosts);

    function searchOfPosts() {
      if (searchOfPostsInput.value.length > 2) {
        const filteredPosts = json.filter(
          (json) =>
            json.title
              .toLowerCase()
              .includes(searchOfPostsInput.value.toLowerCase()) ||
            json.body
              .toLowerCase()
              .includes(searchOfPostsInput.value.toLowerCase())
        );
        displayPosts(filteredPosts);
      } else {
        displayPosts(json);
      }
    }
  });
