document.getElementById('resetButton').addEventListener('click', function() {
    const selectedOption = document.getElementById('options').value;
    fetch(`/reset?option=${selectedOption}`)
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => console.error('Error:', error));
});
