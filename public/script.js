document.getElementById('resetButton').addEventListener('click', function() {
    fetch('/reset')
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => console.error('Error:', error));
});
