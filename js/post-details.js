document.addEventListener("DOMContentLoaded", showPostDetails);

function showPostDetails() {
  let currentUrl = new URLSearchParams(window.location.search);

  let postId = currentUrl.get("id");
  let postDetailsTitle = document.querySelector(".post-details-title");
  let postDetailsText = document.querySelector(".post-details-body");
  let postAuthor = document.querySelector(".post-details-author");
  let postComments = document.querySelector(".post-details-comments");

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

  let inputUserName = document.querySelector(".comment-input-name");
  let inputUserEmail = document.querySelector(".comment-input-email");
  let inputUserComment = document.querySelector(".comment-input-text");
  let sendCommentButton = document.querySelector(".comment-button");

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
}

let telegramImg = document.querySelector(".telegram");
let whatsappImg = document.querySelector(".whatsapp");

telegramImg.addEventListener("click", shareTelegram);
whatsappImg.addEventListener("click", shareWhatsapp);

function shareTelegram() {
  window.open("https://telegram.me/share/url?url=https://t.me/YS2022A");
}

function shareWhatsapp() {
  window.open("https://api.whatsapp.com/send?phone=49157731279");
}
