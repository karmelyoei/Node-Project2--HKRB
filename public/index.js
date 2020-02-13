const xhr = new XMLHttpRequest(); // XHR for API

const inputValue = document.getElementById("inputSearch");
const buttonSearch = document.getElementById("buttonSearch");
const bookList = document.getElementById("bookList");

buttonSearch.addEventListener("click", event => {
  event.preventDefault();
  const bookvalue = inputValue.value.trim();
  const url = `https://www.googleapis.com/books/v1/volumes?q=${bookvalue}`;
  apicall(url, bookfunction, bookvalue);
});

const apicall = (url, callback, bookvalue) => {
  xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      const response = JSON.parse(xhr.responseText);
      if (callback) callback(response);
    }
  };
  xhr.open("GET", `/search=${bookvalue}`, true);
  xhr.send();
};
const bookfunction = response => {
  bookList.innerText = null;

  for (let i = 0; i < 10; i++) {
    const firstDiv = document.createElement("div");
    const bookItem = document.createElement("div");
    const secondDiv = document.createElement("div");
    const bookImg = document.createElement("img");
    const bookName = document.createElement("h2");
    const bookAuther = document.createElement("p");
    const bookDescription = document.createElement("span");
    const rating = document.createElement("p");
    const publisher = document.createElement("p");
    const publishDate = document.createElement("p");

    bookImg.className = "book-logo";
    bookName.className = "book_name";
    bookAuther.className = "book_auther";
    bookDescription.className = "book_desc";
    secondDiv.className = "second_div";

    bookName.innerHTML = response.items[i].volumeInfo.title;
    bookAuther.innerHTML = `Author: ${response.items[i].volumeInfo.authors[0]}`;
    bookImg.src = response.items[i].volumeInfo.imageLinks.thumbnail;
    bookDescription.innerHTML = `Description:  ${response.items[i].volumeInfo.description}`;
    rating.innerHTML = `Rating: ${response.items[i].volumeInfo.averageRating}`;
    publisher.innerHTML = `Publisher : ${response.items[i].volumeInfo.publisher}`;
    publishDate.innerHTML = `Publishing Date :${response.items[i].volumeInfo.publishedDate}`;

    firstDiv.appendChild(bookImg);
    secondDiv.appendChild(bookName);
    secondDiv.appendChild(bookAuther);
    secondDiv.appendChild(rating);
    secondDiv.appendChild(publisher);
    secondDiv.appendChild(publishDate);
    bookItem.appendChild(firstDiv);
    bookItem.appendChild(secondDiv);
    bookList.appendChild(bookItem);
    secondDiv.appendChild(bookDescription);
  }
};
