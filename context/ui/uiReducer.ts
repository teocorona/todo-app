import { UIState } from "./";


type UIActionType =
    | { type: '[UI] - Open Sidebar' }
    | { type: '[UI] - Close Sidebar' }
    | { type: '[UI] - toggle Add Entry', payload: boolean }
    | { type: '[UI] - toggle Dragging', payload: boolean }


export const uiReducer = (state: UIState, action: UIActionType): UIState => {

    switch (action.type) {
        case '[UI] - Open Sidebar':
            return {
                ...state,
                sidemenuOpen: true,
            }
        case '[UI] - Close Sidebar':
            return {
                ...state,
                sidemenuOpen: false,
            }
        case '[UI] - toggle Add Entry':
            return {
                ...state,
                isAddingEntry: action.payload,
            }
        case '[UI] - toggle Dragging':
            return {
                ...state,
                isDragging: action.payload,
            }

        default:
            return state

    }

}
