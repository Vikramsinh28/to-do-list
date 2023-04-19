import * as React from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { Snackbar, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function App() {

  const [fontWeight, setFontWeight] = React.useState('normal');
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [newTodo, setNewTodo] = useState('');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }else {
      setOpen(true);
    }
  };

  const handleAlertClose = () => {
    setOpen(false);
  };



  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
     <React.Fragment>
      <Container maxWidth = "lg" sx={{marginTop :4 }}>
          <Box >
            <AppBar position="static">
              <Toolbar variant="dense">
                <Typography align="center" variant="h6" color="inherit" component="div">
                   To Do App
                </Typography>
              </Toolbar>
            </AppBar>

            <Box sx={{ flexGrow: 1 , m : 2 }}>
                  
                   <Snackbar open={open} autoHideDuration={6000} onClose={handleAlertClose}  >
                        <Alert severity="error" sx={{ width: '100%' }}>
                           "Please enter a To Do"
                        </Alert>
                   </Snackbar>
                   <FormControl>
                        <TextField
                          placeholder="Type something here…"
                          minRows={3}
                          onChange={handleNewTodo}
                          sx={{
                            minWidth: 300,
                            fontWeight
                          }}
                          value={newTodo}
                        />
                        <Button variant="contained" color="primary" sx={{ m: 2 }} onClick={handleAddTodo}>Add To Do</Button>
                  </FormControl>
            </Box>

            <Box sx={{ flexGrow: 1 , m : 2 }}>
            <Box sx={{ width : '100%' , bgcolor : 'background.paper' }}>
              <List
                  sx={{ width: '100%' , bgcolor: 'background.paper' }}
              >
                  {todos.map((todo, index) => (
                    <ListItem key={index} sx = {{ bgcolor : "#f5f5f5" }}>
                      <ListItemText  primary={todo} >
                           {todo}
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(index)}>
                          <DeleteIcon color='error' />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
               <Typography align="right" color="inherit" component="div" sx = {{margin : 2}}>
                    {todos.length} To Do
                </Typography>
            </Box>  
            </Box>
          </Box>
      </Container>
     </React.Fragment>
  );
}

export default App;
