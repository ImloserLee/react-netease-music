import * as home from './action-type';
const defaultState = {
    panelList: [
        {
            icon: 'iconyonghu',
            text: '访问者',
            number: '10,223'
        },
        {
            icon: 'iconxiaoxi',
            text: '消息',
            number: '3,423'
        },
        {
            icon: 'iconshoppingcar',
            text: '购物车',
            number: '7,623'
        },
        {
            icon: 'icongithub',
            text: 'Github Start',
            number: '2,342'
        }
    ],
    todoList: [
        {
            text: 'react',
            checked: false
        },
        {
            text: 'react-router',
            checked: false
        },
        {
            text: 'redux',
            checked: false
        },
        {
            text: 'webpack',
            checked: false
        },
        {
            text: 'redux-thunk',
            checked: false
        },
        {
            text: 'redux-saga',
            checked: false
        },
        {
            text: 'react-develop-tool',
            checked: false
        },
        {
            text: 'react-native',
            checked: false
        }
    ],
    inputValue: ''
};
export const homeReducer = (state = defaultState, action = {}) => {
    const { todoList } = state;
    switch (action.type) {
        case home.GET_PANELLIST:
            return { ...state };
        case home.GET_TODOLIST:
            return { ...state };
        case home.ADD_TODOITEM:
            return {
                ...state,
                todoList: [
                    ...state.todoList,
                    {
                        text: action.text,
                        checked: action.checked
                    }
                ]
            };

        case home.GET_INPUTVALUE:
            return { ...state };
        case home.SET_INPUTVALUE:
            return { ...state, ...{ inputValue: action.value } };
        case home.SET_CHECKED:
            return {
                ...state,
                todoList: todoList.map((todo, index) => {
                    return index === action.index
                        ? {
                              ...todo,
                              checked: !todo.checked
                          }
                        : todo;
                })
            };
        case home.REMOVE_TODOITEM:
            return {
                ...state,
                todoList: todoList.filter((todo, index) => {
                    return index !== action.index;
                })
            };
        case home.TOGGLE_TODOLIST:
            return {
                ...state,
                todoList: todoList.map(todo => {
                    todo.checked = !todo.checked;
                    return todo;
                })
            };
        default:
            return state;
    }
};
