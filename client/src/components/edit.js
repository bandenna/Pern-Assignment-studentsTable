import * as React from 'react';
import Button from '@mui/material/Button';


export default function BasicModal({id}) {
  const [setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      
    </div>
  );
}