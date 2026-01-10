import { test, expect } from '../src/pw-fixtures/base.fixture';

test.describe('Horizontal Dashboard Tests', () => {

  test.beforeEach(async ({MainDashboardPage}) => {
    await MainDashboardPage.goto();
  })

  test('check the page header', async({MainDashboardPage}) => {
    await expect(MainDashboardPage.heading1).toBeVisible();
  })

  test('check the top analytic banner on the page', async({MainDashboardPage}) => {
    await expect(MainDashboardPage.getMetricsLocators('Earnings').header).toHaveText('Earnings');
    await expect(MainDashboardPage.getMetricsLocators('Earnings').value).toHaveText(/\$\d+(?:\.\d+)?/);

    await expect(MainDashboardPage.getMetricsLocators('Spend this month').header).toHaveText('Spend this month');
    await expect(MainDashboardPage.getMetricsLocators('Spend this month').value).toHaveText(/\$\d+(?:\.\d+)?/);

    await expect(MainDashboardPage.getMetricsLocators('Sales').header).toHaveText('Sales');
    await expect(MainDashboardPage.getMetricsLocators('Sales').value).toHaveText(/\$\d+(?:\.\d+)?/);

    await expect(MainDashboardPage.getMetricsLocators('Your balance').header).toHaveText('Your balance');
    await expect(MainDashboardPage.getMetricsLocators('Your balance').value).toHaveText(/\$\d+(?:\.\d+)?/);

    await expect(MainDashboardPage.getMetricsLocators('New Tasks').header).toHaveText('New Tasks');
    await expect(MainDashboardPage.getMetricsLocators('New Tasks').value).toHaveText(/\d+/);

    await expect(MainDashboardPage.getMetricsLocators('Total Projects').header).toHaveText('Total Projects');
    await expect(MainDashboardPage.getMetricsLocators('Total Projects').value).toHaveText(/\d+/);

  })

  test('check the tables', async({MainDashboardPage}) => {
    const checkTableContents = await MainDashboardPage.getTableContents(MainDashboardPage.checkTable);
    const NOT_EMPTY = /(.|\s)*\S(.|\s)*/

    for (const row of checkTableContents) {
        expect(row['NAME']).toMatch(NOT_EMPTY)
        expect(row['PROGRESS']).toMatch(NOT_EMPTY)
        expect(row['QUANTITY']).toMatch(NOT_EMPTY)
        expect(row['DATE']).toMatch(NOT_EMPTY)
    }
    
    const complexTableContents = await MainDashboardPage.getTableContents(MainDashboardPage.complexTable);
    for (const row of complexTableContents) {
      expect(row['NAME']).toMatch(NOT_EMPTY)
      expect(row['STATUS']).toMatch(NOT_EMPTY)
      expect(row['DATE']).toMatch(NOT_EMPTY)
      // expect(row['PROGRESS']).toMatch(NOT_EMPTY) // special case for progress bar
    }
  })
});