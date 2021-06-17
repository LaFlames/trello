import React from 'react';
import { Story, Meta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Components/Task";
import {Provider} from "react-redux";
import AppWithRedux from "../AppWithRedux";
import {store} from "../state/store";

export default {
    title: 'TODOLISTS/AppWithRedux',
    component: Task
} as Meta;


const Template: Story = (args) => <Provider store={store}> <AppWithRedux /> </Provider>;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};

