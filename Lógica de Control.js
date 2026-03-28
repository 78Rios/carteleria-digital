import { getDatabase, ref, set, onValue, push } from "https://www.gstatic.com/firebasejs/9/database.js";

const db = getDatabase();
const playlistRef = ref(db, 'screens/pantalla_principal/playlist');

// Función para añadir anuncio
window.addAd = function() {
    const url = document.getElementById('ad-url').value;
    const duration = document.getElementById('ad-duration').value;

    if (url) {
        const newAdRef = push(playlistRef); // Crea un ID único
        set(newAdRef, {
            url: url,
            duration: parseInt(duration),
            timestamp: Date.now()
        }).then(() => {
            alert("¡Publicidad enviada a la pantalla!");
            document.getElementById('ad-url').value = "";
        });
    }
};

// Mostrar la lista actual para poder borrar o editar
onValue(playlistRef, (snapshot) => {
    const listContainer = document.getElementById('playlist-manager');
    listContainer.innerHTML = ""; // Limpiar lista
    
    snapshot.forEach((childSnapshot) => {
        const ad = childSnapshot.val();
        listContainer.innerHTML += `
            <li class="ad-item">
                <span>Visualizando: ${ad.url.substring(0, 20)}...</span>
                <strong>${ad.duration}s</strong>
                <button onclick="removeAd('${childSnapshot.key}')" style="color:red; background:none; border:none; cursor:pointer;">Eliminar</button>
            </li>
        `;
    });
});