import React, { useState } from "react";
import { 
  Typography, 
  Paper, 
  Box,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Container,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Grid
} from "@mui/material";
import { 
  Dashboard as DashboardIcon,
  ConfirmationNumber as TicketIcon,
  Assessment as ReportIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  CheckCircleOutline as ResolvedIcon,
  HourglassEmpty as PendingIcon,
  Timeline as ProgressIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
  NotificationsActive as NotificationsActiveIcon,
  Email as EmailIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon
} from "@mui/icons-material";
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import TicketPage from './ticket';
import ReportsPage from './reports';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Add Settings component
const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC+8');

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography variant="h5" sx={{ mb: 1.5, fontWeight: 600, color: '#2d3436' }}>
        Settings
      </Typography>
      
      <Box sx={{ 
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Grid container spacing={1.5}>
          {/* Notification Settings */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 1, border: '1px solid #e0e0e0' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#2d3436' }}>
                <NotificationsActiveIcon sx={{ mr: 1, color: '#1976d2' }} />
                Notifications
        </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon sx={{ color: '#64748b' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Push Notifications" 
                    secondary="Receive notifications for new tickets and updates"
                  />
                  <Switch
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    color="primary"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon sx={{ color: '#64748b' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email Alerts" 
                    secondary="Get email notifications for important updates"
                  />
                  <Switch
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    color="primary"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Appearance Settings */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 1, border: '1px solid #e0e0e0' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#2d3436' }}>
                <PaletteIcon sx={{ mr: 1, color: '#1976d2' }} />
                Appearance
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <PaletteIcon sx={{ color: '#64748b' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Dark Mode" 
                    secondary="Switch between light and dark theme"
                  />
                  <Switch
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    color="primary"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LanguageIcon sx={{ color: '#64748b' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Language" 
                    secondary="Select your preferred language"
                  />
                  <TextField
                    select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    size="small"
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                  </TextField>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* System Settings */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 1, border: '1px solid #e0e0e0' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#2d3436' }}>
                <SecurityIcon sx={{ mr: 1, color: '#1976d2' }} />
                System Settings
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LanguageIcon sx={{ color: '#64748b' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Timezone" 
                    secondary="Set your local timezone"
                  />
                  <TextField
                    select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    size="small"
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="UTC+8">UTC+8</MenuItem>
                    <MenuItem value="UTC+0">UTC+0</MenuItem>
                    <MenuItem value="UTC-5">UTC-5</MenuItem>
                  </TextField>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          color="primary"
          sx={{ 
            px: 2,
            py: 1,
            borderRadius: 1,
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          Save Changes
          </Button>
      </Box>
    </Box>
  );
};

const AdminPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const ticketStats = [
    { title: 'Total Tickets', count: '112', icon: <TicketIcon />, color: '#1976d2', trend: '+12%', trendUp: true },
    { title: 'Pending', count: '92', icon: <PendingIcon />, color: '#ed6c02', trend: '+8%', trendUp: true },
    { title: 'Resolved', count: '2', icon: <ResolvedIcon />, color: '#2e7d32', trend: '-5%', trendUp: false },
    { title: 'In Progress', count: '18', icon: <ProgressIcon />, color: '#0288d1', trend: '+15%', trendUp: true }
  ];

  const pieChartData = {
    labels: ['Pending', 'Resolved', 'In Progress'],
    datasets: [{
      data: [92, 2, 18],
      backgroundColor: ['#ed6c02', '#2e7d32', '#0288d1'],
      borderWidth: 0,
    }]
  };

  const barChartData = {
    labels: ['Document Upload', 'Troubleshooting'],
    datasets: [{
      data: [30, 60],
      backgroundColor: '#1976d2',
      borderRadius: 4,
      maxBarThickness: 28
    }]
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            <Box sx={{ mb: 1.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#2d3436' }}>Dashboard Overview</Typography>
            </Box>

            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
              gap: 1.5, 
              mb: 1.5,
              flexShrink: 0
            }}>
              {ticketStats.map((stat, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    bgcolor: 'white',
                    border: '1px solid #e0e0e0',
                    borderLeft: `4px solid ${stat.color}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.813rem', fontWeight: 500 }}>
                      {stat.title}
                    </Typography>
                    {stat.trend && (
                      <Typography variant="caption" sx={{ 
                        color: stat.trendUp ? '#2e7d32' : '#d32f2f',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}>
                        {stat.trend} {stat.trendUp ? '↑' : '↓'}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ 
                      width: 38,
                      height: 38,
                      borderRadius: 1,
                      bgcolor: `${stat.color}12`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 1.5
                    }}>
                      {React.cloneElement(stat.icon, { sx: { fontSize: 20, color: stat.color } })}
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: '#1e293b', fontSize: '1.5rem', lineHeight: 1 }}>
                      {stat.count}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>

            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
              gap: 1.5,
              flex: 1,
              minHeight: 0
            }}>
              <Paper elevation={0} sx={{ 
                p: 2.5,
                borderRadius: 1,
                border: '1px solid #e0e0e0',
                height: 340,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'white',
                transition: 'box-shadow 0.2s ease-in-out',
                '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }
              }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#2d3436', fontSize: '0.875rem' }}>
                  Tickets by Category
                </Typography>
                <Box sx={{ flex: 1, position: 'relative' }}>
                  <Bar data={barChartData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: { color: '#f1f5f9', drawBorder: false },
                        ticks: {
                          stepSize: 15,
                          padding: 6,
                          font: { size: 11, weight: 500 },
                          color: '#64748b'
                        },
                        border: { display: false }
                      },
                      x: {
                        grid: { display: false, drawBorder: false },
                        ticks: {
                          padding: 6,
                          font: { size: 11, weight: 500 },
                          color: '#64748b'
                        },
                        border: { display: false }
                      }
                    }
                  }} />
                </Box>
              </Paper>

              <Paper elevation={0} sx={{ 
                p: 2.5,
                borderRadius: 1,
                border: '1px solid #e0e0e0',
                height: 340,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'white',
                transition: 'box-shadow 0.2s ease-in-out',
                '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }
              }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#2d3436', fontSize: '0.875rem' }}>
                  Ticket Status Distribution
                </Typography>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Pie data={pieChartData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          padding: 12,
                          usePointStyle: true,
                          boxWidth: 6,
                          boxHeight: 6,
                          font: { size: 11, weight: 500 },
                          color: '#64748b',
                          generateLabels: (chart) => {
                            const datasets = chart.data.datasets;
                            return chart.data.labels.map((label, i) => {
                              const value = datasets[0].data[i];
                              const total = datasets[0].data.reduce((a, b) => a + b, 0);
                              const percentage = Math.round((value / total) * 100);
                              return {
                                text: `${label} (${percentage}%)`,
                                fillStyle: datasets[0].backgroundColor[i],
                                strokeStyle: datasets[0].backgroundColor[i],
                                lineWidth: 0,
                                hidden: false,
                                index: i
                              };
                            });
                          }
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: ${value} (${percentage}%)`;
                          }
                        }
                      }
                    }
                  }} />
                </Box>
      </Paper>
            </Box>
          </>
        );
      case 1:
        return <TicketPage />;
      case 2:
        return <ReportsPage />;
      case 3:
        return (
          <Box sx={{ height: '100%' }}>
            <SettingsPage />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', bgcolor: '#f8f9fa' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: '#2d3436', borderBottom: '1px solid #e0e0e0', height: 56 }}>
        <Toolbar sx={{ px: { xs: 2, md: 3 }, minHeight: '56px !important', height: 56 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <DashboardIcon sx={{ color: '#1976d2', mr: 1.5, fontSize: 24 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#2d3436', fontSize: '1.125rem', mr: 4 }}>
              ICT Help Desk
            </Typography>
            
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ 
              display: { xs: 'none', md: 'flex' },
              '& .MuiTabs-indicator': { backgroundColor: '#1976d2', height: 3 }
            }}>
              {['Dashboard', 'Tickets', 'Reports', 'Settings'].map((label) => (
                <Tab 
                  key={label}
                  label={label}
                  sx={{ 
                    color: '#64748b',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    textTransform: 'none',
                    minWidth: 100,
                    '&.Mui-selected': {
                      color: '#1976d2',
                      fontWeight: 600
                    }
                  }}
                />
              ))}
            </Tabs>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ color: '#64748b', mr: 1, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}>
              <NotificationsIcon />
            </IconButton>
            <IconButton onClick={handleMenuClick} sx={{ color: '#64748b', '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' } }}>
              <AccountIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                  mt: 1.5,
                  '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleMenuClose}>
                <SettingsIcon fontSize="small" sx={{ mr: 1.5, color: '#64748b' }} />Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose}>
                <LogoutIcon fontSize="small" sx={{ mr: 1.5, color: '#64748b' }} />Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth="xl" sx={{ height: '100%', display: 'flex', flexDirection: 'column', py: 1.5, px: { xs: 2, md: 3 } }}>
          <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {renderContent()}
          </Box>
    </Container>
      </Box>
    </Box>
  );
};

export default AdminPage;