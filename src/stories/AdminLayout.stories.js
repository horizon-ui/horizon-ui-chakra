import { userEvent, within } from '@storybook/testing-library';
import { App } from './AdminLayout';

export default {
  title: 'Example/App',
  component: App,
};



export const Dashboard = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const marketplaceBtn = await canvas.getByText('Main Dashboard');
    await userEvent.click(marketplaceBtn);
  }
};

export const MarketPlace = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const marketplaceBtn = await canvas.getByText('NFT Marketplace');
    await userEvent.click(marketplaceBtn);
  },
};

export const DataTable = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const marketplaceBtn = await canvas.getByText('Data Tables');
    await userEvent.click(marketplaceBtn);
  },
};

export const Profile = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const marketplaceBtn = await canvas.getByText('Profile');
    await userEvent.click(marketplaceBtn);
  },
};

export const RTLLayout = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const marketplaceBtn = await canvas.getByText('RTL Admin');
    await userEvent.click(marketplaceBtn);
  },
};

