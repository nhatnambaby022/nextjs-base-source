import * as React from 'react';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ReactNode } from 'react';
import style from './layout.module.scss';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import FlagIcon from '@mui/icons-material/Flag';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete, { AutocompleteChangeReason } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Link from "next/link";
import searchFilm from '@/api/searchFilm';
import { Tag } from '@/pages/index';
import { useRouter } from 'next/router';



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

interface myprops {
  child : ReactNode,
  currentRoute: String
}



export default function LayOutDefault(props: myprops) {
  const router = useRouter()
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const initFilm:Tag[] = []
  const [Films,setFilms] = React.useState(initFilm)
  const [key,setKey] = React.useState("")
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const goToFilm = (e:React.SyntheticEvent<Element>,value:string) =>{
    const filmSelect:Tag[] = Films.filter((el:Tag) => el.name == value)
    router.push(`/sound/${filmSelect[0].slug}`)
  }

  const searchFilmHandle = async (e:React.ChangeEvent<HTMLInputElement>)=>{
    const key = e.target.value
    setKey(key)
    if (!key) return;
    const response = await searchFilm(key);
    if (response.status == 200){
      setFilms(response.data)
    }
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <AppBar position="fixed" open={open}>
          <Toolbar style={{
            display:"flex",
            justifyContent:"space-between",
            backgroundColor:style.BGColorBody,
            height:"100px"
          }}>
            <div style={{
              display:"flex",
              width:"80%",
              minWidth:"88px"
            }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Stack  sx={{ width: "100%", borderRadius:"30px",maxWidth:350 }}>
                <Autocomplete 
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={Films.map((option) => option.name)}
                  
                  onChange={goToFilm}
                  renderInput={(params) => (
                    <TextField
                      onChange={searchFilmHandle}
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        placeholder:"Search name movie, artist...",
                        style:{
                          borderRadius:"25px",
                          height:"50px",
                          display:"flex",
                          alignContent:"center",
                          marginLeft:"px"
                        },
                        startAdornment: <img src='/find.svg' style={{marginLeft:"6px"}}/>
                      }}
                    />
                  )}
                />
              </Stack>
            </div>
            <div>
              <Button style={{borderRadius:"50%"}}>
                <img src='/setting.svg' style={{marginLeft:"6px"}}/>
              </Button>
              
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor:style.BGColor,
            color:style.textColor
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader theme={darkTheme} style={{
          display:"flex",
          justifyContent:"space-between",
          margin:"16px 0px 0px 10px"
        }}>
          <img style={{height:"24px"}} src={open ? "/logotext.svg" : ""}/>
          <IconButton onClick={handleDrawerClose} style={{color:style.textColor}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List >
          <Link href={"/"}>
            <ListItem disablePadding className={props.currentRoute == "Home" ? style.selected : ""}>
              <ListItemButton style={{
                color: props.currentRoute == "Home" ? style.textSelectedColor : style.textColor
              }}>
                <ListItemIcon>
                  <HomeOutlinedIcon style={{color: props.currentRoute == "Home" ? style.textSelectedColor : style.textColor}}/>
                </ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItemButton>
            </ListItem>
          </Link>
          

          <ListItem disablePadding className={props.currentRoute == "New" ? style.selected : ""}>
            <ListItemButton style={{
              color: props.currentRoute == "New" ? style.textSelectedColor : style.textColor
            }}>
              <ListItemIcon>
                <NewReleasesIcon style={{
                  color: props.currentRoute == "New" ? style.textSelectedColor : style.textColor
                }}/>
              </ListItemIcon>
              <ListItemText primary={'New'} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding className={props.currentRoute == "Trending" ? style.selected : ""}>
            <ListItemButton style={{
              color: props.currentRoute == "Trending" ? style.textSelectedColor : style.textColor
            }}>
              <ListItemIcon>
                <TrendingUpOutlinedIcon style={{
              color: props.currentRoute == "Trending" ? style.textSelectedColor : style.textColor
            }} />
              </ListItemIcon>
              <ListItemText primary={'Trending'} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding className={props.currentRoute == "Popular" ? style.selected : ""}>
            <ListItemButton style={{
              color: props.currentRoute == "Popular" ? style.textSelectedColor : style.textColor
            }}>
              <ListItemIcon>
                <Diversity1Icon style={{
                    color: props.currentRoute == "Popular" ? style.textSelectedColor : style.textColor
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={'Popular'} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider style={{backgroundColor:style.textColor}} />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={'FIND BY'} style={{
                fontSize:"10px"
              }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className={props.currentRoute == "Year" ? style.selected : ""}>
            <ListItemButton style={{
              color: props.currentRoute == "Year" ? style.textSelectedColor : style.textColor
            }}>
              <ListItemIcon>
                <PendingActionsIcon style={{
                  color: props.currentRoute == "Year" ? style.textSelectedColor : style.textColor
                }}/>
              </ListItemIcon>
              <ListItemText primary={'Year'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className={props.currentRoute == "Movie genres" ? style.selected : ""}>
            <ListItemButton style={{
              color: props.currentRoute == "Movie genres" ? style.textSelectedColor : style.textColor
            }}>
              <ListItemIcon>
                <MovieFilterIcon style={{
                  color: props.currentRoute == "Movie genres" ? style.textSelectedColor : style.textColor
                }}/>
              </ListItemIcon>
              <ListItemText primary={'Movie genres'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className={props.currentRoute == "Nation" ? style.selected : ""}>
            <ListItemButton style={{
              color: props.currentRoute == "Nation" ? style.textSelectedColor : style.textColor
            }}>
              <ListItemIcon>
                <FlagIcon style={{
                  color: props.currentRoute == "Nation" ? style.textSelectedColor : style.textColor
                }}/>
              </ListItemIcon>
              <ListItemText primary={'Nation'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open} style={{
        backgroundColor: style.BGColorBody,
      }}>
        <DrawerHeader style={{height:"80px"}}/>
        {props.child}
      </Main>
    </Box>
  );
}