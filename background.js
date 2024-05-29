chrome.bookmarks.getTree((bookmarkTreeNodes) => {

  const bookmarks = getBookmarks(bookmarkTreeNodes);
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request === "getBookmarks") {
      sendResponse(bookmarks);
    }
  });
});

function getBookmarks(bookmarkNodes) {
  const bookmarks = [];

  bookmarkNodes.forEach((node) => {
    if (node.url) {
      bookmarks.push({
        title: node.title,
        url: node.url,
        id: node.id,
      });
    } else if (node.children) {
      bookmarks.push({
        title: node.title,
        url:'',
        id: '',
      });
      bookmarks.push(...getBookmarks(node.children));
    }
  });
  //console.log(bookmarks);
  return bookmarks;
}

chrome.action.onClicked.addListener(function() {
  chrome.windows.create({
    "url": "popup.html",
    "type": "popup",
    "height": 600,
    "width": 800
  });
});


function getBookmarkFolderTitle(bookmarkId) {
  chrome.bookmarks.get(bookmarkId, function(results) {
    if (results.length > 0) {
      const folder = results[0].parentId;
      chrome.bookmarks.get(folder, function(results) {
        if (results.length > 0) {
          const folderTitle = results[0].title;
          document.title = folderTitle + " - My Bookmarks";
        }
      });
    }
  });
}

