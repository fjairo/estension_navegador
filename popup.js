document.addEventListener("DOMContentLoaded", () => {

  chrome.runtime.sendMessage("getBookmarks", (bookmarks) => {

    const bookmarksList = document.getElementById("bookmarks");
    bookmarksList.innerHTML = "";

    bookmarks.forEach((bookmark) => {

      if (bookmark.id !== '' && bookmark.url !== '') {

        const tr = document.createElement("tr");
        const td = document.createElement("td");
        const td2 = document.createElement("td");
        const a = document.createElement("a");
        const button = document.createElement("button");
        const button2 = document.createElement("button");
        const img = document.createElement("img");

        a.textContent = bookmark.title;
        a.href = bookmark.url;
        a.target = "_blank";

        img.src = `http://www.google.com/s2/favicons?domain=${bookmark.url}`;

        tr.id = bookmark.id
        td.width
        button.innerHTML = "remove ";
        button.addEventListener("click", () => {
          remove(bookmark.id);
        });

        button2.innerHTML = "actualizar ";
        button2.addEventListener("click", () => {
          openDialog(bookmark.id, bookmark.title, bookmark.url);
        })
        td.appendChild(img);
        td.appendChild(a);
        td2.appendChild(button);
        td2.appendChild(button2);
        tr.appendChild(td);
        tr.appendChild(td2);
        bookmarksList.appendChild(tr);

      } else if(bookmark.url == ''&& bookmark.title !== '') {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        const h1 = document.createElement("h1");
        const img = document.createElement("img");

        img.src = 'img/file-and-folder.png'

        h1.textContent = bookmark.title;
        img.style.marginLeft = '5%';
        h1.style.marginLeft = '4%';
        td.colSpan = '2';
        td.style.background = '#F4D03F'
        td.style.fontSize = '10px'
        td.style.padding = '0px'
        td.style.display = 'flex';
        td.style.alignItems = 'center';
        td.style.justifyContent = 'flex-start';
        td.style.width = '142.7%';
        td.style.gap = '10px';
        tr.style.borderBottom = '15px solid #ccc';
        tr.style.borderTop = '3.7px solid #ccc';


        td.appendChild(img);
        td.appendChild(h1);
        tr.appendChild(td);

        bookmarksList.appendChild(tr);
      }
    });
  });
});
