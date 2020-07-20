export default (
    LSSM: Vue,
    tabs: { name: string; vehicleTypes: number[] }[]
): void => {
    Array.from(
        document.querySelectorAll(
            '#tabs > li > a:not([href="#all"]):not([href="#occupied"])'
        ) as NodeListOf<HTMLAnchorElement>
    ).map(e => {
        const target = e.getAttribute('href');
        target && document.querySelector(target)?.remove();
        e.parentElement?.remove();
    });

    const tabList = document.getElementById('tabs');
    const allTab = tabList?.querySelector('#tabs > li:first-child');
    const occupiedTab = tabList?.querySelector('#tabs > li:last-child');
    const panelWrapper = document.querySelector(
        '#vehicle_list_step .tab-content'
    );

    if (!tabList || !allTab || !occupiedTab || !panelWrapper) return;

    const panels = {} as {
        [key: string]: HTMLDivElement;
    };
    const tabBar = {
        all: { tablesorterId: null },
        occupied: { tablesorterId: 'vehicle_show_table_occupied' },
    } as {
        [key: string]: {
            tablesorterId: string | null;
        };
    };
    const vehicleTypeMap = {} as {
        [id: string]: number[];
    };

    tabs.forEach(({ name, vehicleTypes }) => {
        const tabId = LSSM.$store.getters.nodeAttribute(
            `tailoredtabs-${name.replace(/ /g, '_').replace(/["']/g, '')}`
        );

        const tabSelector = document.createElement('li');
        tabSelector.setAttribute('role', 'presentation');
        const tabLink = document.createElement('a');
        tabLink.href = `#${tabId}`;
        tabLink.setAttribute('tabload', tabId);
        tabLink.textContent = name;
        tabSelector.appendChild(tabLink);
        tabList.insertBefore(tabSelector, occupiedTab);

        const tabPane = document.createElement('div');
        tabPane.classList.add('tab-pane');
        tabPane.id = tabId;
        tabPane.setAttribute('role', 'tabpanel');

        const tabTable = document.createElement('table');
        tabTable.classList.add('table', 'table-striped');
        tabTable.id = `vehicle_show_table_${tabId}`;

        const thead = document.createElement('thead');
        const headRow = document.createElement('tr');
        const searchHead = document.createElement('th');
        searchHead.style.width = '20px';
        const searchLink = document.createElement('a');
        searchLink.href = '#';
        searchLink.setAttribute('table_id', tabId);
        searchLink.classList.add('show_hide_search');
        const searchSpan = document.createElement('span');
        searchSpan.classList.add('glyphicon', 'glyphicon-search');
        const emptyHead = document.createElement('th');
        emptyHead.style.width = '20px';
        const vehicleHead = document.createElement('th');
        vehicleHead.textContent = LSSM.$tc('vehicle', 0);
        const distanceHead = document.createElement('th');
        distanceHead.textContent = LSSM.$tc('distance', 1).toString();
        const stationHead = document.createElement('th');
        stationHead.classList.add('hidden-xs');
        stationHead.textContent = LSSM.$tc('station', 1).toString();
        const searchRow = document.createElement('tr');
        searchRow.classList.add('mission_vehicle_search_outer');
        searchRow.id = `mission_vehicle_search_outer_${tabId}`;
        const searchWrapper = document.createElement('th');
        searchWrapper.colSpan = 5;
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.setAttribute('table_id', tabId);
        searchInput.classList.add('mission_vehicle_search_input');
        searchInput.id = `search_field_${tabId}`;

        const tbody = document.createElement('tbody');
        tbody.id = `vehicle_show_table_body_${tabId}`;

        searchLink.appendChild(searchSpan);
        searchHead.appendChild(searchLink);
        headRow.appendChild(searchHead);
        headRow.appendChild(emptyHead);
        headRow.appendChild(vehicleHead);
        headRow.appendChild(distanceHead);
        headRow.appendChild(stationHead);
        thead.appendChild(headRow);
        searchWrapper.appendChild(searchInput);
        searchRow.appendChild(searchWrapper);
        thead.appendChild(searchRow);
        tabTable.appendChild(thead);
        tabTable.appendChild(tbody);
        tabPane.appendChild(tabTable);

        panelWrapper.appendChild(tabPane);

        panels[tabId] = tabPane;
        tabBar[tabId] = { tablesorterId: `vehicle_show_table_${tabId}` };
        vehicleTypeMap[tabId] = vehicleTypes;
    });

    tabList.addEventListener('click', e => {
        const tabSelector = (e.target as HTMLElement)?.closest('a[tabload]');
        const tab = tabSelector?.getAttribute('tabload');
        if (!tabSelector || !tab || ['all', 'occupied'].includes(tab)) return;
        e.preventDefault();

        tabList.querySelector('li.active')?.classList.remove('active');
        tabSelector.parentElement?.classList.add('active');
        document.getElementById('all')?.classList.remove('active');
        document.getElementById('occupied')?.classList.remove('active');
        Object.entries(panels).forEach(([id, panel]) =>
            panel.classList[id === tab ? 'add' : 'remove']('active')
        );

        const tableSorterId = tabBar[tab].tablesorterId;
        if (!tableSorterId) return;
        const tableSorterEl = document.getElementById(tableSorterId);
        if (!tableSorterEl) return;

        const vehicles = Array.from(
            document.querySelectorAll(
                '#vehicle_show_table_body_all tr td[vehicle_type_id]'
            ) as NodeListOf<HTMLTableDataCellElement>
        )
            .filter(v =>
                vehicleTypeMap[tab].includes(
                    parseInt(v.getAttribute('vehicle_type_id') || '-1')
                )
            )
            .map(v => v.parentElement)
            .filter(v => !!v) as HTMLTableRowElement[];

        const tbody = tableSorterEl.querySelector('tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        tbody.append(...vehicles.map(v => v.cloneNode(true)));
    });
};