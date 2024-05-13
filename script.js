async function Fetching() {
    fetch('./data.json')
    .then(x => x.json())
    .then(x => {
        const seconds = document.getElementById('main');
        seconds.textContent = ` ${x.seconds} Days`;

        const latest = document.getElementById('latest')
        latest.textContent = `${x.follow} days with out a accident`;

        const total = document.getElementById('total')
        total.textContent = `${x.total} Total accidents`

        const lastActivity = document.getElementById('lastActivity')
        lastActivity.textContent = `${x.lastActivity} last activity`

        const hr = document.getElementById('hr')
        hr.textContent = `${x.hr} hr`

        const she = document.getElementById('she')
        she.textContent = `${x.she} she`

        const si = document.getElementById('si')
        si.textContent = `${x.si} si`
        
    })
    .catch((err) => console.log('error', err));
}

Fetching();
