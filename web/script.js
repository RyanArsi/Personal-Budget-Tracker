

document.addEventListener('DOMContentLoaded', function() {
    console.log('Personal Budget Tracker carregado!');
    
    initializeApp();
});


function initializeApp() {
   
}





function makeRequest(url, method = 'GET', data = null) {
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null
    })
    .then(response => response.json())
    .catch(error => console.error('Erro na requisição:', error));
}
