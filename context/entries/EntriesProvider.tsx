import { FC, useEffect, useReducer } from 'react'
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from './'
import { entriesApi } from '../../apis';
import { useSnackbar } from 'notistack';

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}

interface Props {
  children?: React.ReactNode
}

export const EntriesProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>('/entries', {description})
      dispatch({ type: '[Entry] - Add Entry', payload: data })

    } catch (error) {
      console.log({error})
    }
  }

  const updateEntry = async (entry: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`,entry)
      dispatch({ type: '[Entry] - Update Entry', payload: data })
      if(showSnackbar){
        enqueueSnackbar('Entrada actualizada',{
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
      }
    } catch (error) {
      console.log({error})
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: '[Entry] - Refresh Data', payload: data })
  }
  useEffect(() => {
    refreshEntries();
  }, [])


  return (
    <EntriesContext.Provider value={{
      ...state,
      addNewEntry,
      updateEntry,
    }}>
      {children}
    </EntriesContext.Provider>
  )
};