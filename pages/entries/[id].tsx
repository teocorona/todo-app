import { ChangeEvent, FC, useContext, useMemo, useState } from "react"
import { GetServerSideProps } from 'next'
import { DeleteOutline, SaveOutlined } from "@mui/icons-material"
import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material"
import { Layout } from "../../components/layouts"
import { Entry, EntryStatus } from "../../interfaces"
import { dbEntries } from "../../database"
import { EntriesContext } from "../../context/entries"
import { dateFunctions } from "../../utils"

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
  entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext)
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(event.target.value)
  };
  const handleOnStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };
  const handleOnSave = () => {
    if(inputValue.trim().length === 0) return
    const updatedEntry:Entry = {
      ...entry,
      status,
      description: inputValue
    }
    updateEntry(updatedEntry, true)
  };
  const handleOnDelete = () => {

  };
  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue.substring(0, 20) + '...'}`}
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva Entrada"
                autoFocus
                multiline
                label='Nueva Entrada'
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={handleOnInputChange}
                helperText={isNotValid && 'Ingrese un valor'}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={handleOnStatusChange}
                >
                  {validStatus.map(option => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlined />}
                variant='contained'
                fullWidth
                onClick={handleOnSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        onClick={handleOnDelete}
        sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'red' }}
      >
        <DeleteOutline />
      </IconButton>
    </Layout>
  )
};




export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string };
  const entry = await dbEntries.getEntryById(id);
  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  return {
    props: {
      entry
    }
  }
}

export default EntryPage
