import React from 'react';
import { Story, Meta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../features/TodolistsList/Todolist/Task/Task";
import {Provider} from "react-redux";
import App from "./App";
import {store} from "./store";

export default {
    title: 'TODOLISTS/AppWithRedux',
    component: Task
} as Meta;


const Template: Story = (args) => <Provider store={store}> <App /> </Provider>;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};

