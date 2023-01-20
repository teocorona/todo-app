import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { DragEvent, FC, useContext } from "react"
import { UIContext } from "../../context/ui"
import { Entry } from "../../interfaces"

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({entry}) => {
  const {toggleDragging} = useContext(UIContext)
  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text',entry._id);
    toggleDragging(true)
  };
  const onDragEnd = (event: DragEvent) => {
    toggleDragging(false)
  };
  
  return (
    <Card
      sx={{marginBottom: 1}}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{whiteSpace: 'pre-line'}}>{entry.description}</Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent:'end', paddingRight:2}}>
          <Typography variant="body2">hace 30 min</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
