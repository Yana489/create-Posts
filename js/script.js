fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => {
    const list = document.querySelector(".posts-list");
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


      // let searchOfPostsInput = document.querySelector(".search-post");
      
      // searchOfPostsInput.addEventListener("input", searchOfPosts);

      // function searchOfPosts(query) {
      //   return
      //   json.filter(function(el)
      //   {
      //     return
      //     el.toLowerCase().indexOf(query.toLowerCase()) > -1; 
      //   })
      //   console.log(searchOfPosts(query))
      // }
    }
  });

  let searchOfPostsInput = document.querySelector(".search-post");
  searchOfPostsInput.addEventListener("input", searchOfPosts);

  function searchOfPosts(myquery){
    fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => {
    for (let i = 0; i < json.length; i++) {
    return json[i].filter(function(el){
      return el.toLowerCase().indexOf(myquery.toLowerCase()) > -1;
    })
 } })
  }