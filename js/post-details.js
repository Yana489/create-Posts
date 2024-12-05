document.addEventListener("DOMContentLoaded", showPostDetails);

function showPostDetails() {
  let currentUrl = new URLSearchParams(window.location.search);

  let postId = currentUrl.get("id");
  let postDetailsTitle = document.querySelector(".post-details-title");
  let postDetailsText = document.querySelector(".post-details-body");
  let postAuthor = document.querySelector(".post-details-author");
  let postComments = document.querySelector(".post-details-comments");
  let inputUserName = document.querySelector(".comment-input-name");
  let inputUserEmail = document.querySelector(".comment-input-email");
  let inputUserComment = document.querySelector(".comment-input-text");
  let sendCommentButton = document.querySelector(".comment-button");
  let telegramImg = document.querySelector(".telegram");
  let whatsappImg = document.querySelector(".whatsapp");

  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response) => response.json())
    .then((post) => {
      postDetailsTitle.innerHTML = post.title;
      postDetailsText.innerHTML = post.body;
      getUserById(post.userId);
    });

  function getUserById(userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((author) => {
        postAuthor.innerHTML = `Author: ${author.name} (${author.email})`;
      });
  }
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((response) => response.json())
    .then((comment) => {
      for (let i = 0; i < comment.length; i++) {
        const commentItem = document.createElement("li");
        commentItem.classList.add("comment-item");
        commentItem.innerHTML = `<strong>${comment[i].name}</strong>(${comment[i].email})<br>${comment[i].body}`;
        postComments.appendChild(commentItem);
      }
    });

  sendCommentButton.addEventListener("click", sendComment);

  function sendComment() {
    if (
      !inputUserName.value ||
      !inputUserEmail.value ||
      !inputUserComment.value
    ) {
      return;
    } else {
      let comment = {
        name: inputUserName.value,
        email: inputUserEmail.value,
        body: inputUserComment.value,
      };
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((comment) => {
          console.log(comment);
        });
      inputUserName.value = "";
      inputUserEmail.value = "";
      inputUserComment.value = "";
    }
  }

  telegramImg.addEventListener("click", shareTelegram);
  whatsappImg.addEventListener("click", shareWhatsapp);

  function shareTelegram() {
    window.open(
      `https://telegram.me/share/url?url=http://127.0.0.1:5500/post-details.html?${postId}`
    );
  }

  function shareWhatsapp() {
    window.open(
      `https://web.whatsapp.com/send?url=http://127.0.0.1:5500/post-details.html?${postId}`
    );
  }
}
