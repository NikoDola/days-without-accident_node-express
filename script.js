async function Fetching() {
    fetch('./data.json')
    .then(x => x.json())
    .then(x => {
        const seconds = document.getElementById('main');
        seconds.textContent = ` ${x.seconds}`;

        const latest = document.getElementById('latest')
        latest.textContent = `${x.follow}`;

        const total = document.getElementById('total')
        total.textContent = `${x.total}`

        const lastActivity = document.getElementById('lastActivity')
        lastActivity.textContent = `${x.lastActivity}`

        const hr = document.getElementById('hr')
        hr.textContent = `${x.hr}`

        const she = document.getElementById('she')
        she.textContent = `${x.she}`

        const si = document.getElementById('si')
        si.textContent = `${x.si}`
        
    })
    .catch((err) => console.log('error', err));
}

Fetching();
