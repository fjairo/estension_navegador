function remove(id) {
    chrome.bookmarks.remove(id, () => {

        const listItem = document.getElementById(id);

        listItem.remove();

    });
}

function openDialog(id, title, url) {
    // https://codepen.io/yune/pen/mpQxRB
    const titleInput = document.getElementById("bookmark-title")
    const urlInput = document.getElementById("bookmark-url");
    const dialog = document.getElementById('dialog');
    const form = dialog.querySelector('form');
    const submitButton = form.querySelector('button[type=submit]');

    titleInput.value = title;
    urlInput.value = url
    
    submitButton.dataset.id = id;
    dialog.showModal();
    titleInput.focus();
    urlInput.focus();

    document.getElementById('cancel').addEventListener('click', () => {
        dialog.close()
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const newTitle = titleInput.value;
        const newUrl = urlInput.value;

        // Actualizar el marcador en Chrome
        chrome.bookmarks.update(id, {title: newTitle, url: newUrl}, () => {
            // Cerrar la ventana de diálogo
            dialog.close()
        });
    });
}







