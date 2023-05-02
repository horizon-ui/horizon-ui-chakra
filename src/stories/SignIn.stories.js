// import { within, userEvent } from '@storybook/testing-library';

import { userEvent, within } from '@storybook/testing-library';
import { App } from './App';

export default {
    title: 'Example/SignIn',
    component: App,
};

export const SignIn = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const marketplaceBtn = await canvas.getByText('Sign In');
        await userEvent.click(marketplaceBtn);
    },
};

export const ExitSignIn = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const marketplaceBtn = await canvas.getByText('Back to Simmmple');
        await userEvent.click(marketplaceBtn);
    },
};
