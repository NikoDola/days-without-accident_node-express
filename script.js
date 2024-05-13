async function Fethincg () {
    fetch('./data.json')
    .then(x => x.json())
    .then(x => {
        const seconds = document.getElementById('main');
        seconds.textContent = x.seconds;
        const latest = document.getElementById('latest')
        latest.textContent = x.follow
        const total = document.getElementById('total')
        total.textContent = x.total
        
    })
    .catch((err) => console.log('error', err));
}

Fethincg()