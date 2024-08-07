document.addEventListener('DOMContentLoaded', (event) => {
    if (sessionStorage.getItem('numSections')) {
        document.getElementById('numSections').value = sessionStorage.getItem('numSections');
        document.getElementById('totalSpaces').innerText = sessionStorage.getItem('totalSpaces');
        document.getElementById('totalEntry').innerText = sessionStorage.getItem('totalEntry');
        document.getElementById('totalExit').innerText = sessionStorage.getItem('totalExit');
        document.getElementById('totalPOF').innerText = sessionStorage.getItem('totalPOF');
        document.getElementById('totalDOOR').innerText = sessionStorage.getItem('totalDOOR');
        document.getElementById('totalGATE').innerText = sessionStorage.getItem('totalGATE');
        document.getElementById('totalCashless').innerText = sessionStorage.getItem('totalCashless');
        document.getElementById('totalSCANNER').innerText = sessionStorage.getItem('totalSCANNER');
        document.getElementById('totalCounters').innerText = sessionStorage.getItem('totalCounters');
        generateSections();
        generateStationsBySection();
    }
});

function generateSections() {
    const numSections = document.getElementById('numSections').value;
    const sectionsContainer = document.getElementById('sectionsContainer');
    sectionsContainer.innerHTML = '';  // Clear previous sections

    for (let i = 1; i <= numSections; i++) {
        const sectionDiv = document.createElement('div');
        sectionDiv.classList.add('section-container');
        
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Parking Sections</th>
            <th>Name</th>
            <th>Spaces</th>
            <th>Entry</th>
            <th>Exit</th>
            <th>POF</th>
            <th>DOOR</th>
            <th>GATE</th>
            <th>Cashless</th>
            <th>SCANNER</th>
            <th>C-display</th>
            <th>Remark</th>
        `;
        table.appendChild(headerRow);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Section ${i}</td>
            <td><input type="text" name="section${i}Name" value="in te vullen indien meerdere secties" required></td>
            <td><input type="number" name="section${i}Spaces" required oninput="calculateSums()"></td>
            <td><input type="number" name="section${i}Entry" required oninput="calculateSums()"></td>
            <td><input type="number" name="section${i}Exit" required oninput="calculateSums()"></td>
            <td><input type="number" name="section${i}POF" required oninput="calculateSums()"></td>
            <td><input type="number" name="section${i}DOOR" required oninput="calculateSums()"></td>
            <td><input type="number" name="section${i}GATE" required oninput="calculateSums()"></td>
            <td><input type="number" name="section${i}Cashless" required oninput="calculateSums()"></td>
            <td><input type="number" name="section${i}SCANNER" required oninput="calculateSums()"></td>
            <td>
                <select name="section${i}Cdisplay" onchange="calculateSums()">
                    <option value="Yes">Yes</option>
                    <option value="No" selected>No</option>
                </select>
            </td>
            <td><input type="text" name="section${i}Remark"></td>
        `;
        table.appendChild(row);

        sectionDiv.appendChild(table);
        sectionsContainer.appendChild(sectionDiv);
    }

    calculateSums();
}

function calculateSums() {
    const numSections = document.getElementById('numSections').value;
    let totalSpaces = 0;
    let totalEntry = 0;
    let totalExit = 0;
    let totalPOF = 0;
    let totalDOOR = 0;
    let totalGATE = 0;
    let totalCashless = 0;
    let totalSCANNER = 0;
    let totalCounters = 0;

    for (let i = 1; i <= numSections; i++) {
        const spaces = parseInt(document.querySelector(`input[name="section${i}Spaces"]`)?.value || 0);
        const entry = parseInt(document.querySelector(`input[name="section${i}Entry"]`)?.value || 0);
        const exit = parseInt(document.querySelector(`input[name="section${i}Exit"]`)?.value || 0);
        const pof = parseInt(document.querySelector(`input[name="section${i}POF"]`)?.value || 0);
        const door = parseInt(document.querySelector(`input[name="section${i}DOOR"]`)?.value || 0);
        const gate = parseInt(document.querySelector(`input[name="section${i}GATE"]`)?.value || 0);
        const cashless = parseInt(document.querySelector(`input[name="section${i}Cashless"]`)?.value || 0);
        const scanner = parseInt(document.querySelector(`input[name="section${i}SCANNER"]`)?.value || 0);
        const cdisplay = document.querySelector(`select[name="section${i}Cdisplay"]`)?.value || 'No';

        totalSpaces += spaces;
        totalEntry += entry;
        totalExit += exit;
        totalPOF += pof;
        totalDOOR += door;
        totalGATE += gate;
        totalCashless += cashless;
        totalSCANNER += scanner;
        if (cdisplay === 'Yes') {
            totalCounters++;
        }
    }

    document.getElementById('totalSpaces').innerText = totalSpaces;
    document.getElementById('totalEntry').innerText = totalEntry;
    document.getElementById('totalExit').innerText = totalExit;
    document.getElementById('totalPOF').innerText = totalPOF;
    document.getElementById('totalDOOR').innerText = totalDOOR;
    document.getElementById('totalGATE').innerText = totalGATE;
    document.getElementById('totalCashless').innerText = totalCashless;
    document.getElementById('totalSCANNER').innerText = totalSCANNER;
    document.getElementById('totalCounters').innerText = totalCounters;

    // Save sums to sessionStorage for use later
    sessionStorage.setItem('totalSpaces', totalSpaces);
    sessionStorage.setItem('totalEntry', totalEntry);
    sessionStorage.setItem('totalExit', totalExit);
    sessionStorage.setItem('totalPOF', totalPOF);
    sessionStorage.setItem('totalDOOR', totalDOOR);
    sessionStorage.setItem('totalGATE', totalGATE);
    sessionStorage.setItem('totalCashless', totalCashless);
    sessionStorage.setItem('totalSCANNER', totalSCANNER);
    sessionStorage.setItem('totalCounters', totalCounters);

    generateStationsBySection();
}

function generateStationsBySection() {
    const totalEntry = parseInt(sessionStorage.getItem('totalEntry'));
    const totalExit = parseInt(sessionStorage.getItem('totalExit'));
    const totalPOF = parseInt(sessionStorage.getItem('totalPOF'));
    const totalDOOR = parseInt(sessionStorage.getItem('totalDOOR'));
    const totalGATE = parseInt(sessionStorage.getItem('totalGATE'));
    const totalCashless = parseInt(sessionStorage.getItem('totalCashless'));
    const totalSCANNER = parseInt(sessionStorage.getItem('totalSCANNER'));

    const stationsContainer = document.getElementById('stationsContainer');
    stationsContainer.innerHTML = '';  // Clear previous stations

    const numSections = sessionStorage.getItem('numSections');
    if (!numSections) {
        alert('No section information available.');
        return;
    }

    for (let i = 1; i <= numSections; i++) {
        const sectionHeader = document.createElement('h3');
        sectionHeader.innerText = `Section ${i}`;
        stationsContainer.appendChild(sectionHeader);

        const stationTypes = [
            { type: 'Entry', count: totalEntry },
            { type: 'Exit', count: totalExit },
            { type: 'POF', count: totalPOF },
            { type: 'DOOR', count: totalDOOR },
            { type: 'GATE', count: totalGATE },
            { type: 'Cashless', count: totalCashless },
            { type: 'SCANNER', count: totalSCANNER }
        ];

        stationTypes.forEach(station => {
            if (station.count > 0) {
                const table = createTableForStation(i, station.type, station.count);
                stationsContainer.appendChild(table);
            }
        });
    }

    generateIPSettings();
}

function createTableForStation(sectionIndex, stationType, count) {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>${stationType}</th>
        <th>Name</th>
        <th>Section</th>
        <th>ANPR</th>
        <th>Audio support</th>
        <th>Ticketprinter</th>
        <th>Credit card in</th>
        <th>Bancontact / CC</th>
        <th>Cash</th>
    `;
    table.appendChild(headerRow);

    for (let i = 1; i <= count; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stationType} ${i}</td>
            <td><input type="text" name="section${sectionIndex}${stationType}${i}Name" required></td>
            <td><input type="text" name="section${sectionIndex}${stationType}${i}Section" value="carpark${sectionIndex}" required></td>
            <td>
                <select name="section${sectionIndex}${stationType}${i}ANPR">
                    <option value="Yes">Yes</option>
                    <option value="No" selected>No</option>
                </select>
            </td>
            <td>
                <select name="section${sectionIndex}${stationType}${i}AudioSupport">
                    <option value="Yes">Yes</option>
                    <option value="No" selected>No</option>
                </select>
            </td>
            <td>
                <select name="section${sectionIndex}${stationType}${i}TicketPrinter">
                    <option value="Yes">Yes</option>
                    <option value="No" selected>No</option>
                </select>
            </td>
            <td>
                <select name="section${sectionIndex}${stationType}${i}CreditCardIn">
                    <option value="Yes">Yes</option>
                    <option value="No" selected>No</option>
                </select>
            </td>
            <td>
                <select name="section${sectionIndex}${stationType}${i}BancontactCC">
                    <option value="Yes">Yes</option>
                    <option value="No" selected>No</option>
                </select>
            </td>
            <td>
                <select name="section${sectionIndex}${stationType}${i}Cash">
                    <option value="Yes">Yes</option>
                    <option value="No" selected>No</option>
                </select>
            </td>
        `;
        table.appendChild(row);
    }

    return table;
}

function generateIPSettings() {
    const ipSettingsContainer = document.getElementById('ipSettingsContainer');
    ipSettingsContainer.innerHTML = '';  // Clear previous IP settings

    const stationInputs = Array.from(document.querySelectorAll('#stationsContainer input[type="text"]'))
        .filter(input => !input.name.includes('Section'));

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Station</th>
        <th>IP adres</th>
        <th>Subnetmask</th>
        <th>DNS 1</th>
        <th>DNS 2</th>
    `;
    table.appendChild(headerRow);

    // Adding Server IP fields
    const serverRowIntern = document.createElement('tr');
    serverRowIntern.innerHTML = `
        <td>Server Intern IP</td>
        <td><input type="text" name="serverInternIP" required></td>
        <td><input type="text" name="serverSubnetmask" required></td>
        <td><input type="text" name="serverDNS1" required></td>
        <td><input type="text" name="serverDNS2" required></td>
    `;
    table.appendChild(serverRowIntern);

    const serverRowExtern = document.createElement('tr');
    serverRowExtern.innerHTML = `
        <td>Server Extern IP</td>
        <td><input type="text" name="serverExternIP"></td>
        <td><input type="text" name="serverExternSubnetmask"></td>
        <td><input type="text" name="serverExternDNS1"></td>
        <td><input type="text" name="serverExternDNS2"></td>
    `;
    table.appendChild(serverRowExtern);

    stationInputs.forEach((input) => {
        const stationName = input.name.replace('Name', '');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stationName.replace(/([a-z])([A-Z])/g, '$1 $2')}</td>
            <td><input type="text" name="${stationName}IP" required></td>
            <td><input type="text" name="${stationName}Subnetmask" required></td>
            <td><input type="text" name="${stationName}DNS1" required></td>
            <td><input type="text" name="${stationName}DNS2" required></td>
        `;
        table.appendChild(row);
    });

    ipSettingsContainer.appendChild(table);
}

async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const response = await fetch(event.target.action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
    });

    if (response.ok) {
        window.location.href = "/thank-you.html";
    } else {
        alert('Failed to submit the form');
    }
}

function goBack() {
    window.history.back();
}
