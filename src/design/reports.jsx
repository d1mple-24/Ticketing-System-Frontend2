import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  Paper,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Button,
  Box,
  Divider,
  AppBar,
  Toolbar,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon,
  FileDownload as FileDownloadIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  ThumbUp as ThumbUpIcon,
  Timer as TimerIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { Line, Bar } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReportsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [timeRange, setTimeRange] = useState('week');
  const [searchQuery, setSearchQuery] = useState('');

  const ticketTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'New Tickets',
        data: [12, 19, 15, 25, 22, 8, 10],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Resolved Tickets',
        data: [8, 12, 10, 18, 15, 5, 7],
        borderColor: '#2e7d32',
        backgroundColor: 'rgba(46, 125, 50, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const statsData = [
    {
      title: 'Average Response Time',
      value: '2.5 hours',
      icon: <TimerIcon sx={{ color: '#1976d2' }} />,
      trend: '+0.2h',
      color: '#1976d2'
    },
    {
      title: 'Resolution Rate',
      value: '85%',
      icon: <CheckCircleIcon sx={{ color: '#2e7d32' }} />,
      trend: '+5%',
      color: '#2e7d32'
    },
    {
      title: 'Customer Satisfaction',
      value: '92%',
      icon: <ThumbUpIcon sx={{ color: '#ed6c02' }} />,
      trend: '+3%',
      color: '#ed6c02'
    },
    {
      title: 'First Contact Resolution',
      value: '78%',
      icon: <TrendingUpIcon sx={{ color: '#0288d1' }} />,
      trend: '+2%',
      color: '#0288d1'
    }
  ];

  const handleExportExcel = () => {
    // Prepare data for Excel
    const ticketData = ticketTrendData.labels.map((day, index) => ({
      'Day': day,
      'New Tickets': ticketTrendData.datasets[0].data[index],
      'Resolved Tickets': ticketTrendData.datasets[1].data[index]
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(ticketData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Ticket Report');

    // Generate Excel file
    XLSX.writeFile(wb, `ticket_report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      bgcolor: '#f8f9fa'
    }}>
      {/* Fixed Header */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          bgcolor: 'white',
          borderBottom: '1px solid',
          borderColor: 'divider',
          height: { xs: 'auto', sm: 64 },
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        <Toolbar sx={{ 
          minHeight: { xs: 'auto', sm: 64 },
          py: { xs: 1, sm: 0 },
          px: { xs: 1, sm: 2, md: 3 }
        }}>
          <Container fluid className="px-0">
            <Row className="align-items-center g-2">
              <Col xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h5" className="fw-bold text-dark mb-0">
                    📊 Reports & Analytics
                  </Typography>
                  <Tooltip title="Refresh Data">
                    <IconButton 
                      size="small" 
                      sx={{ 
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'primary.light' }
                      }}
                    >
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Col>
              <Col xs={12} md={6}>
                <Box className="d-flex gap-2 flex-wrap justify-content-md-end align-items-center">
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: { xs: '100%', md: 'auto' }
                  }}>
                    <TextField
                      select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      size={isMobile ? "small" : "medium"}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarIcon className="text-muted" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ 
                        minWidth: 120,
                        flex: { xs: 1, md: 'none' },
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    >
                      <MenuItem value="day">Today</MenuItem>
                      <MenuItem value="week">This Week</MenuItem>
                      <MenuItem value="month">This Month</MenuItem>
                      <MenuItem value="year">This Year</MenuItem>
                    </TextField>
                    <TextField
                      placeholder="Search reports..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      size={isMobile ? "small" : "medium"}
                      variant="outlined"
                      sx={{ 
                        minWidth: 200,
                        flex: { xs: 2, md: 'none' },
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon className="text-muted" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Export to Excel">
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<FileDownloadIcon />}
                          onClick={handleExportExcel}
                          size={isMobile ? "small" : "medium"}
                          sx={{ 
                            minWidth: { xs: 'auto', sm: 120 },
                            whiteSpace: 'nowrap',
                            boxShadow: 'none',
                            '&:hover': {
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }
                          }}
                        >
                          Export
                        </Button>
                      </Tooltip>
                      <Tooltip title="Filter Reports">
                        <IconButton 
                          color="primary"
                          sx={{ 
                            border: '1px solid',
                            borderColor: 'primary.main',
                            '&:hover': {
                              backgroundColor: 'primary.light',
                              color: 'white'
                            }
                          }}
                        >
                          <FilterIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </Col>
            </Row>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Scrollable Content */}
      <Container fluid className="flex-grow-1 overflow-auto py-4" style={{ minHeight: 0 }}>
        {/* Stats Cards */}
        <Row className="g-3 mb-4">
          {statsData.map((stat, index) => (
            <Col xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={0}
                className="p-3 rounded-3 border h-100"
                sx={{
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box className="d-flex align-items-center mb-2">
                  <Box 
                    sx={{ 
                      p: 1, 
                      borderRadius: 1, 
                      bgcolor: `${stat.color}12`,
                      mr: 2
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </Box>
                <Box className="d-flex align-items-baseline">
                  <Typography variant="h4" sx={{ color: stat.color, fontWeight: 600, mr: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#2e7d32' }}>
                    {stat.trend}
                  </Typography>
                </Box>
              </Paper>
            </Col>
          ))}
        </Row>

        {/* Charts Section */}
        <Row className="g-3">
          {/* Ticket Trends Chart */}
          <Col xs={12} md={8}>
            <Paper 
              elevation={0} 
              className="p-4 rounded-3 border h-100"
              sx={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Typography variant="h6" className="fw-bold text-dark mb-3">
                📈 Ticket Count by Status
              </Typography>
              <Divider className="mb-3" />
              <div style={{ height: isMobile ? 280 : 400 }}>
                <Line
                  data={ticketTrendData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          padding: 20,
                          font: { size: isMobile ? 10 : 12 }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)'
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        }
                      }
                    }
                  }}
                />
              </div>
            </Paper>
          </Col>

          {/* Resolution Time Chart */}
          <Col xs={12} md={4}>
            <Paper 
              elevation={0} 
              className="p-4 rounded-3 border h-100"
              sx={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Typography variant="h6" className="fw-bold text-dark mb-3">
                ⏳ Resolution Time
              </Typography>
              <Divider className="mb-3" />
              <div style={{ height: isMobile ? 280 : 400 }}>
                <Bar
                  data={ticketTrendData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)'
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        }
                      }
                    }
                  }}
                />
              </div>
            </Paper>
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default ReportsPage;
