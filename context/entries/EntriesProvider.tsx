import { FC, useReducer } from 'react'
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from './'
import { v4 as uuidv4 } from "uuid";

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'PENDIENTE ntriesReducer, Entries_INITIAL_STATE ntriesReducer, Entries_INITIAL_STATE',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      _id: uuidv4(),
      description: 'PROGRESS ntriesReducer, Entries_INITIAL_STATE',
      status: 'in-profress',
      createdAt: Date.now() - 1000000
    },
    {
      _id: uuidv4(),
      description: 'FINISHED ntriesReducer, Entries_INITIAL_STATE ntriesReducer, EnNITIAL_STATE ntriesReducer, Entries_INITIAL_STATE',
      status: 'finished',
      createdAt: Date.now() - 1500000
    }
  ],
}

interface Props {
  children?: React.ReactNode
}

export const EntriesProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending'
    }
    dispatch({ type: '[Entry] - Add Entry', payload: newEntry })
  }

  const updateEntry = (entry: Entry) => {
    dispatch({ type: '[Entry] - Update Entry', payload: entry })
  };

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