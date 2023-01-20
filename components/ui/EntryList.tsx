import { List, Paper } from "@mui/material"
import { DragEvent, FC, useContext, useMemo } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { EntryStatus } from "../../interfaces"
import { EntryCard } from "./EntryCard"
import styles from "./EntryList.module.css"

interface Props {
  status: EntryStatus;
}

const paperStyle = {
  height: 'calc(100vh - 165px)', overflowY: 'scroll', overflowX: 'auto',
  backgroundColor: "transparent", padding: '1px 7px 1px 7px',
  "&::-webkit-scrollbar": { width: "3px", bgcolor: "#454545", },
  "&::-webkit-scrollbar-thumb": {
    background: "#4a148c", borderRadius: "10px",
  },
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, toggleDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])
  const allowDrop = (event: DragEvent) => {
    event.preventDefault();
  };
  const onDropEntry = (event: DragEvent) => {
    const id = event.dataTransfer.getData('text');
    const entry = entries.find(e => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
    toggleDragging(false);
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper sx={paperStyle}>
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all 0.3s' }}>
          {entriesByStatus.map(entry => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  )
}
