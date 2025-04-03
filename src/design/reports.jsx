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
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { Line, Bar } from 'react-chartjs-2';
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
        fill: true
      },
      {
        label: 'Resolved Tickets',
        data: [8, 12, 10, 18, 15, 5, 7],
        borderColor: '#2e7d32',
        backgroundColor: 'rgba(46, 125, 50, 0.2)',
        fill: true
      }
    ]
  };

  return (
    <Container fluid className="py-4">
      {/* Page Title */}
      <Row className="mb-4 px-2 border-bottom pb-2">
        <Col xs={12} md={6}>
          <Typography variant="h5" className="fw-bold text-dark">
            📊 Reports & Analytics
          </Typography>
        </Col>
        <Col xs={12} md={6} className="d-flex gap-2 flex-wrap justify-content-md-end mt-2 mt-md-0">
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
            className="flex-grow-1"
            sx={{ minWidth: 140 }}
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
            className="flex-grow-1"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-muted" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 160 }}
          />
          <IconButton color="primary">
            <FilterIcon />
          </IconButton>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row>
        {/* Ticket Trends Chart */}
        <Col xs={12} md={8} className="mb-4">
          <Paper elevation={3} className="p-4 rounded shadow-sm">
            <Typography variant="h6" className="fw-bold text-dark mb-3">
              📈 Ticket Category
            </Typography>
            <div style={{ height: isMobile ? 280 : 400 }}>
              <Line
                data={ticketTrendData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </Paper>
        </Col>

        {/* Resolution Time Chart */}
        <Col xs={12} md={4} className="mb-4">
          <Paper elevation={3} className="p-4 rounded shadow-sm">
            <Typography variant="h6" className="fw-bold text-dark mb-3">
              ⏳ Resolution Time
            </Typography>
            <div style={{ height: isMobile ? 280 : 400 }}>
              <Bar
                data={ticketTrendData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </Paper>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportsPage;
