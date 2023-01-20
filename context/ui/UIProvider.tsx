
import { FC, useReducer } from 'react'
   import { UIContext, uiReducer } from './'
   
   
   export interface UIState {
      sidemenuOpen: boolean
      isAddingEntry: boolean
      isDragging: boolean
    }
    
    
    const UI_INITIAL_STATE: UIState = {
        sidemenuOpen: false,
        isAddingEntry: false,
        isDragging: false
    }
    
    interface Props {
        children?: React.ReactNode
    }
    
    export const UIProvider: FC<Props> = ({ children }) => {
    
        const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

        const openSideMenu = () => {
            dispatch({type: '[UI] - Open Sidebar'})
        }
        const closeSideMenu = () => {
            dispatch({type: '[UI] - Close Sidebar'})
        }
        const toggleIsAddingEntry = (isAdding: boolean) => {
            dispatch({type: '[UI] - toggle Add Entry', payload: isAdding})
        }
        const toggleDragging = (isDragging: boolean) => {
            dispatch({type: '[UI] - toggle Dragging', payload: isDragging})
        }
    
        return (
            <UIContext.Provider value={{
                ...state,

                //funciones
                openSideMenu,
                closeSideMenu,
                toggleIsAddingEntry,
                toggleDragging
            }}>
                {children}
            </UIContext.Provider>
        )
    }