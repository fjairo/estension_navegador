function cargarYMostrarMarcadores() {
  chrome.bookmarks.getTree((bookmarks) => {
    const bookmarksList = document.getElementById("bookmarks");
    bookmarksList.innerHTML = ""; // Limpiar lista anterior

    function processBookmarks(nodes, level = 0) {
      nodes.forEach((node) => {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        const td2 = document.createElement("td");
        const span = document.createElement("span");
        const img = document.createElement("img");

        if (node.children) {
          // Si el nodo tiene hijos, es un nodo padre y se procesa de manera especial
          span.textContent = node.title;
          img.src = 'http://www.google.com/s2/favicons?domain=folder'; // Icono de carpeta para nodos padre
          td.colSpan = "3"; // Hacer que el td se extienda a través de columnas para destacar como encabezado
          td.className = 'td-parent';
          tr.style.fontWeight = "bold";
          tr.style.backgroundColor = "#F4D03F"; // Fondo distinto para nodos padre
        } else {
          // Nodos hoja con URL
          span.textContent = node.title;
          img.src = `http://www.google.com/s2/favicons?domain=${node.url}`;
          td.className = 'td1';
          td2.className = 'td2';
          tr.className = 'fila'
          tr.id = node.id;

          // Agregar botones si es un nodo hoja
          const button = document.createElement("button");
          const button2 = document.createElement("button");
          button.textContent = "Remove";
          button.addEventListener("click", () => {
            remove(node.id);
          });
          button2.textContent = "Actualizar";
          button2.addEventListener("click", () => {
            actualizar(node.id);
          });

          td.addEventListener('click', handleItemClick(node.url));

          td2.appendChild(button);
          td2.appendChild(button2);
        }

        td.appendChild(img);
        td.appendChild(span);
        tr.appendChild(td);
        if (!node.children) {
          tr.appendChild(td2);
        }
        td.style.paddingLeft = `${level * 30}px`; // Indentación para visualizar la jerarquía
        bookmarksList.appendChild(tr);

        // Si el nodo tiene hijos, procesar recursivamente incrementando el nivel de indentación
        if (node.children) {
          processBookmarks(node.children, level + 1);
        }
      });
    }
    processBookmarks(bookmarks); // Procesar la estructura del árbol de marcadores
  });
}

chrome.bookmarks.onCreated.addListener((id, bookmark) => {
  cargarYMostrarMarcadores();
});

chrome.bookmarks.onRemoved.addListener((id, removeInfo) => {
  const listItem = document.getElementById(id);
  if (listItem) {
    listItem.remove();
  }
});
/*
chrome.bookmarks.onChanged.addListener((id, changeInfo) => {
  actualizarMarcadorEnLista(id,);
});
*/
chrome.bookmarks.onMoved.addListener((id, moveInfo) => {
  cargarYMostrarMarcadores();
});

chrome.bookmarks.onChildrenReordered.addListener((id, reorderInfo) => {
  cargarYMostrarMarcadores();
});
/*
chrome.bookmarks.onImportBegan.addListener(() => {
  cargarYMostrarMarcadores();
});

chrome.bookmarks.onImportEnded.addListener(() => {
  cargarYMostrarMarcadores();
});
*/
document.addEventListener("DOMContentLoaded", () => {
  cargarYMostrarMarcadores();
});
