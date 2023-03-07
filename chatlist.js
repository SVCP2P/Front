const chatListContent = document.getElementById("chatListContent");

function createChatCell(user) {
  const chatCell = document.createElement("div");
  chatCell.classList.add("chat-list-cell");

  const username = document.createElement("div");
  username.classList.add("chat-list-cell-username");
  username.textContent = user.username;
  chatCell.appendChild(username);

  chatCell.addEventListener("click", () => {
    window.location.href = `chat.html?username=${user.username}`;
  });

  return chatCell;
}

function fillChatList(users) {
  users.forEach((user) => {
    const chatCell = createChatCell(user);
    chatListContent.appendChild(chatCell);
  });
}

async function getAuthLinks() {
  const response = await fetch("http://0.0.0.0:3000/user/getauthlinks", {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
    }
  });
  const data = await response.json();
  const users = data.users;
  fillChatList(users);
}

getAuthLinks();
