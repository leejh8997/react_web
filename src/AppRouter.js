// AppRouter.js
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import ArticleIcon from '@mui/icons-material/Article';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SendIcon from '@mui/icons-material/Send';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CashedIcon from '@mui/icons-material/Autorenew';

import App from './menu/App';
import State from './menu/State';
import Effect from './menu/UseEffect1';
import Review from './menu/Review';
import ProductMain from './menu/ProductMain';
import Ref from './menu/Ref';
import ContextEx from './menu/ContextEx';
import Main from './menu/Main';
import Login from './menu/Login';
import ReducerEx from './menu/ReducerEx';
import ReducerEx2 from './menu/ReducerEx2';
import FeedList from './menu/FeedList';
import FeedAdd from './menu/FeedAdd';
import { LoginOutlined, LoginRounded } from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'FeedAdd.js', icon: <HomeIcon />, path: '/feedAdd' },
  { text: 'FeedList.js', icon: <HomeIcon />, path: '/feedList' },
  { text: 'ReducerEx2.js', icon: <CashedIcon />, path: '/reducerEx2' },
  { text: 'ReducerEx.js', icon: <CashedIcon />, path: '/reducerEx' },
  { text: 'Login.js', icon: <LoginOutlined />, path: '/login' },
  { text: 'App.js', icon: <AppsIcon />, path: '/app' },
  { text: 'State.js', icon: <ArticleIcon />, path: '/state' },
  { text: 'Effect.js', icon: <SendIcon />, path: '/effect' },
  { text: 'ProductMain.js', icon: <ShoppingCartIcon />, path: '/product' },
  { text: 'Review.js', icon: <RateReviewIcon />, path: '/review' },
  { text: 'Ref.js', icon: <DashboardIcon />, path: '/ref' },
  { text: 'Context.js', icon: <PeopleIcon />, path: '/context' },
  { text: 'Main.js', icon: <HomeIcon />, path: '/main' },
];

function AppRouter() {
  const location = useLocation(); // 현재 URL 확인

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 사이드바 */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5', // 배경 색
            paddingTop: 2,
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ textAlign: 'center', width: '100%' }}>
            메뉴 목록
          </Typography>
        </Toolbar>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path} // 현재 경로에 하이라이트
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: '#c5cae9',
                    color: '#3949ab',
                    fontWeight: 'bold',
                  },
                  '&:hover': {
                    backgroundColor: '#e8eaf6',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ fontSize: '18px' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* 메인 컨텐츠 영역 */}
      <Box component="main" id="main-content" sx={{ flexGrow: 1, bgcolor: '#fafafa', p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<App />} />
          <Route path="/state" element={<State />} />
          <Route path="/effect" element={<Effect />} />
          <Route path="/product" element={<ProductMain />} />
          <Route path="/review" element={<Review />} />
          <Route path="/ref" element={<Ref />} />
          <Route path="/context" element={<ContextEx />} />
          <Route path="/main" element={<Main />} />
          <Route path="/reducerEx" element={<ReducerEx />} />
          <Route path="/reducerEx2" element={<ReducerEx2 />} />
          <Route path="/feedList" element={<FeedList />} />
          <Route path="/feedAdd" element={<FeedAdd />} />
        </Routes>
      </Box>
    </Box>
  );
}

// BrowserRouter를 별도 분리
function RouterWrapper() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default RouterWrapper;