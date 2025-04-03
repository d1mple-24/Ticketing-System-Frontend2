import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  useTheme,
  Grid
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Add as AddIcon
} from '@mui/icons-material';

const TicketPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 5 : 10);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event, ticket) => {
    setAnchorEl(event.currentTarget);
    setSelectedTicket(ticket);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTicket(null);
  };

  // Sample ticket data
  const tickets = [
    { id: 1, title: 'Cannot access email', category: 'Email', priority: 'High', status: 'Pending', date: '2024-03-15', assignedTo: 'John Doe' },
    { id: 2, title: 'Printer not working', category: 'Hardware', priority: 'Medium', status: 'In Progress', date: '2024-03-14', assignedTo: 'Jane Smith' },
    { id: 3, title: 'Software installation needed', category: 'Software', priority: 'Low', status: 'Resolved', date: '2024-03-13', assignedTo: 'Mike Johnson' },
    // Add more sample tickets as needed
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#ed6c02';
      case 'In Progress': return '#0288d1';
      case 'Resolved': return '#2e7d32';
      default: return '#64748b';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#d32f2f';
      case 'Medium': return '#ed6c02';
      case 'Low': return '#2e7d32';
      default: return '#64748b';
    }
  };

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      p: { xs: 1, sm: 2, md: 3 }
    }}>
      <Box sx={{ 
        mb: { xs: 1.5, sm: 2 }, 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 1, sm: 2 },
        alignItems: { xs: 'stretch', sm: 'center' }
      }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 600, 
          color: '#2d3436',
          fontSize: { xs: '1.25rem', sm: '1.5rem' }
        }}>
          Ticket Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: '#1976d2',
            '&:hover': { bgcolor: '#1565c0' },
            textTransform: 'none',
            px: 2,
            py: 1,
            width: { xs: '100%', sm: 'auto' }
          }}
        >
          Create Ticket
        </Button>
      </Box>

      <Box sx={{ 
        mb: { xs: 1.5, sm: 2 }, 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 1, sm: 2 }
      }}>
        <TextField
          placeholder="Search tickets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flex: 1 }}
          size={isMobile ? 'small' : 'medium'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#64748b' }} />
              </InputAdornment>
            ),
          }}
        />
        <IconButton 
          sx={{ 
            color: '#64748b',
            alignSelf: { xs: 'flex-end', sm: 'center' }
          }}
        >
          <FilterIcon />
        </IconButton>
      </Box>

      <TableContainer 
        component={Paper} 
        elevation={0} 
        sx={{ 
          border: '1px solid #e0e0e0',
          borderRadius: 1,
          flex: 1,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
            '&:hover': {
              background: '#555',
            },
          },
        }}
      >
        <Table 
          sx={{ 
            minWidth: 650,
            '& .MuiTableCell-root': {
              py: { xs: 1, sm: 1.5 },
              px: { xs: 1, sm: 2 },
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }
          }} 
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              {!isMobile && <TableCell>Category</TableCell>}
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              {!isMobile && <TableCell>Date</TableCell>}
              {!isMobile && <TableCell>Assigned To</TableCell>}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((ticket) => (
                <TableRow key={ticket.id} hover>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.title}</TableCell>
                  {!isMobile && <TableCell>{ticket.category}</TableCell>}
                  <TableCell>
                    <Chip
                      label={ticket.priority}
                      size="small"
                      sx={{
                        bgcolor: `${getPriorityColor(ticket.priority)}12`,
                        color: getPriorityColor(ticket.priority),
                        fontWeight: 500,
                        fontSize: { xs: '0.625rem', sm: '0.75rem' }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={ticket.status}
                      size="small"
                      sx={{
                        bgcolor: `${getStatusColor(ticket.status)}12`,
                        color: getStatusColor(ticket.status),
                        fontWeight: 500,
                        fontSize: { xs: '0.625rem', sm: '0.75rem' }
                      }}
                    />
                  </TableCell>
                  {!isMobile && <TableCell>{ticket.date}</TableCell>}
                  {!isMobile && <TableCell>{ticket.assignedTo}</TableCell>}
                  <TableCell align="right">
                    <IconButton
                      size={isMobile ? "small" : "medium"}
                      onClick={(e) => handleMenuClick(e, ticket)}
                    >
                      <MoreVertIcon fontSize={isMobile ? "small" : "medium"} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tickets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ 
          mt: 1,
          '& .MuiTablePagination-select': {
            mr: { xs: 0, sm: 2 }
          }
        }}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: 180,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1
            }
          }
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ViewIcon fontSize="small" sx={{ mr: 1.5, color: '#64748b' }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <EditIcon fontSize="small" sx={{ mr: 1.5, color: '#64748b' }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <DeleteIcon fontSize="small" sx={{ mr: 1.5, color: '#64748b' }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TicketPage; 