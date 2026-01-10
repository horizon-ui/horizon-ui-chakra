import { test as base, expect } from '@playwright/test';
import MainDashboardPage from "../pw-page-objects/main-dashboard.page";

export const test = base.extend({
    MainDashboardPage: async ({page}, use) => {
        const mainDashboardPage = new MainDashboardPage(page);
        await use(mainDashboardPage);
    }
})

export {expect};