import * as home from './action-type';

export const getPanelList = () => ({
    type: home.GET_PANELLIST
});

export const getTodoList = () => ({
    type: home.GET_TODOLIST
});

export const addTodoItem = item => ({
    type: home.ADD_TODOITEM,
    text: item.text,
    checked: item.checked
});

export const getInputValue = () => ({
    type: home.GET_INPUTVALUE
});

export const setInputValue = value => ({
    type: home.SET_INPUTVALUE,
    value
});

export const setChecked = index => ({
    type: home.SET_CHECKED,
    index
});

export const removeTodoItem = index => ({
    type: home.REMOVE_TODOITEM,
    index
});

export const toggleTodoList = () => ({
    type: home.TOGGLE_TODOLIST
});
