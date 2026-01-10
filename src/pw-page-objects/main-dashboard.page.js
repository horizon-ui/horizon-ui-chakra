import {expect} from "../pw-fixtures/base.fixture";

export default class MainDashboardPage {
    
    constructor(page) {
        this.page = page
    }

    get heading1() { return this.page.getByText('Main Dashboard').last()};
    get checkTable() { return this.page.getByRole('table').first();};
    get complexTable() { return this.page.getByRole('table').last();};

    getMetricsLocators(metric) {
        const l = metric.toLowerCase().replaceAll(' ', '-');
        return {
            header: this.page.getByTestId(`${l}-metric-header`),
            value: this.page.getByTestId(`${l}-metric-value`)
        }
    }

    async goto(){
        await this.page.goto('/admin/default', {waitUntil: 'domcontentloaded'});
    }

    async getTableContents(table){
        await expect(table).toBeVisible();
        const tableValue = [];
        const headerNames = [];
        const rows = table.getByRole('row').all();
        const headers = table.getByRole('columnheader').all();
        for (const header of await headers) {
            headerNames.push(await header.innerText());
        }
        for (const row of (await rows).slice(1)) {
            const columns = row.getByRole('cell');
            const rowValues = {};
            for(let i =0; i < await columns.count(); i++) {
                rowValues[headerNames[i]] = await columns.nth(i).innerText();
            }
            tableValue.push(rowValues);
        }
        console.log(tableValue);
        expect(tableValue.length).toBeGreaterThan(1);
        return tableValue;
    }
}

