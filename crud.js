function remove(id) {
    chrome.bookmarks.remove(id, function () {
        if (chrome.runtime.lastError) {
            console.error('Error al eliminar el marcador:', chrome.runtime.lastError.message);
            return;
        }

        console.log('Marcador eliminado correctamente del almacenamiento.');

    });
}

function actualizar(id) {
    chrome.bookmarks.get(id, (updatedBookmark) => {
        if (chrome.runtime.lastError) {
            console.error('Error al obtener el marcador:', chrome.runtime.lastError.message);
            return;
        }
        // Aquí puedes hacer lo que necesites con la información actualizada del marcador
        const marker = updatedBookmark[0];
        const title = marker.title;
        const url = marker.url;
        openDialog(id, title, url);

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

        chrome.bookmarks.update(id, { title: newTitle, url: newUrl }, () => {
            if (chrome.runtime.lastError) {
                console.error('Error al actualizar el marcador:', chrome.runtime.lastError.message);
                return;
            }
            // Cerrar la ventana de diálogo
            dialog.close()
            /* Nota: seccion para establecer la correcion de adlistener y borrar la funcion siguente*/
            actualizarMarcadorEnLista(id, newTitle, newUrl);
        });
    });
}
function handleItemClick(newUrl) {
    return function () {
        window.open(newUrl, '_blank');
    };
}

function actualizarMarcadorEnLista(id, newTitle, newUrl) {
    const tr = document.getElementById(id);
    if (tr) {

        const span = tr.querySelector('span');
        const image = tr.querySelector('img');
        const td = tr.querySelector('td');
        if (span && image && td) {
            span.textContent = newTitle;
            image.src = `http://www.google.com/s2/favicons?domain=${newUrl}`;

           // Remover cualquier manejador de eventos click previo
            td.replaceWith(td.cloneNode(true));
            const newTd = tr.querySelector('td');

            // Agregar el nuevo manejador de eventos click
            newTd.addEventListener('click', handleItemClick(newUrl));

            // Agregar el nuevo manejador de eventos click
            td.addEventListener('click', handleItemClick(newUrl));
            console.log('Marcador actualizado en la lista:', { id, newTitle, newUrl });

        } else {
            console.error("No se encontraron todos los elementos necesarios en el tr especificado.");
        }
    } else {
        console.error("No se encontró un tr con el id:", id);
    }
}






