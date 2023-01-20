import { AddCircleOutline, SaveOutlined } from "@mui/icons-material"

import { Box, Button, TextField } from "@mui/material"
import { ChangeEvent, useContext, useState } from "react"
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";


export const NewEntry = () => {
  const {toggleIsAddingEntry, isAddingEntry} = useContext(UIContext)
  const {addNewEntry} = useContext(EntriesContext)
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);
  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(event.target.value)
  };
  const handleOnSave = () => {
    if (inputValue.length === 0) return
    addNewEntry(inputValue)
    setInputValue('')
    setTouched(false)
    toggleIsAddingEntry(false)
  };
  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder='Nueva entrada'
            autoFocus
            multiline
            label='Nueva entrada'
            helperText={inputValue.length <= 0 && touched && 'Ingresa un valor'}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={handleOnInputChange}
            onBlur={() => setTouched(true)}
          />
          <Box display='flex' justifyContent={'space-between'}>
            <Button
              variant="text"
              onClick={()=>toggleIsAddingEntry(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlined />}
              onClick={handleOnSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutline />}
          fullWidth
          variant="outlined"
          onClick={() => toggleIsAddingEntry(true)}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  )
}
