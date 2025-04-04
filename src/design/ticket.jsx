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
  Grid,
  Divider,
  Avatar,
  Stack,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  AccessTime as AccessTimeIcon,
  Category as CategoryIcon,
  PriorityHigh as PriorityIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
  PauseCircle as PauseCircleIcon
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
  const [showDetails, setShowDetails] = useState(false);

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
  };

  const handleViewDetails = () => {
    setShowDetails(true);
    setAnchorEl(null);
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedTicket(null);
  };

  // Sample ticket data
  const tickets = [
    { 
      id: 1, 
      title: 'Cannot access email', 
      category: 'Email', 
      priority: 'High', 
      status: 'Pending', 
      date: '2024-03-15', 
      assignedTo: 'John Doe',
      description: 'User is unable to access their email account. Multiple login attempts have failed.',
      requester: 'Sarah Wilson',
      requesterEmail: 'sarah.wilson@example.com',
      updates: [
        { date: '2024-03-15 09:00', user: 'Sarah Wilson', message: 'Created ticket' },
        { date: '2024-03-15 09:30', user: 'John Doe', message: 'Investigating the issue' },
        { date: '2024-03-15 10:15', user: 'John Doe', message: 'Password reset initiated' }
      ]
    },
    { id: 2, title: 'Printer not working', category: 'Hardware', priority: 'Medium', status: 'In Progress', date: '2024-03-14', assignedTo: 'Jane Smith' },
    { id: 3, title: 'Software installation needed', category: 'Software', priority: 'Low', status: 'Resolved', date: '2024-03-13', assignedTo: 'Mike Johnson' },
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

  const TicketDetails = ({ ticket }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTicket, setEditedTicket] = useState({ ...ticket });
    const [actionAnchorEl, setActionAnchorEl] = useState(null);

    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleCancel = () => {
      setIsEditing(false);
      setEditedTicket({ ...ticket });
    };

    const handleSave = () => {
      // Here you would typically make an API call to update the ticket
      setIsEditing(false);
      // Update the ticket in the parent component's state
      // For now, we'll just log the changes
      console.log('Saved changes:', editedTicket);
    };

    const handleChange = (field) => (event) => {
      setEditedTicket({
        ...editedTicket,
        [field]: event.target.value
      });
    };

    const handleActionClick = (event) => {
      setActionAnchorEl(event.currentTarget);
    };

    const handleActionClose = () => {
      setActionAnchorEl(null);
    };

    const handleStatusChange = (newStatus) => {
      // Here you would typically make an API call to update the ticket status
      console.log('Updating status to:', newStatus);
      handleActionClose();
    };

    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ 
          mb: 3, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={handleBackToList} sx={{ color: 'primary.main' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#2d3436' }}>
              Ticket Details
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayArrowIcon />}
              onClick={handleActionClick}
              sx={{ textTransform: 'none' }}
            >
              Take Action
            </Button>
            <Menu
              anchorEl={actionAnchorEl}
              open={Boolean(actionAnchorEl)}
              onClose={handleActionClose}
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
              <MenuItem onClick={() => handleStatusChange('In Progress')}>
                <PlayArrowIcon fontSize="small" sx={{ mr: 1.5, color: '#0288d1' }} />
                Start Working
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange('Resolved')}>
                <CheckCircleIcon fontSize="small" sx={{ mr: 1.5, color: '#2e7d32' }} />
                Mark as Resolved
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange('On Hold')}>
                <PauseCircleIcon fontSize="small" sx={{ mr: 1.5, color: '#ed6c02' }} />
                Put on Hold
              </MenuItem>
              <MenuItem onClick={() => handleStatusChange('Escalated')}>
                <PriorityIcon fontSize="small" sx={{ mr: 1.5, color: '#d32f2f' }} />
                Escalate
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 1, mb: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Title"
                  value={editedTicket.title}
                  onChange={handleChange('title')}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              ) : (
                <Typography variant="h6" sx={{ mb: 2, color: '#2d3436' }}>
                  {ticket.title}
                </Typography>
              )}
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Description"
                  value={editedTicket.description}
                  onChange={handleChange('description')}
                  variant="outlined"
                  multiline
                  rows={3}
                  sx={{ mb: 3 }}
                />
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {ticket.description}
                </Typography>
              )}
              <Divider sx={{ my: 2 }} />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon sx={{ color: '#64748b' }} />
                  <Typography variant="body2" color="text.secondary">
                    Created: {ticket.date}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CategoryIcon sx={{ color: '#64748b' }} />
                  {isEditing ? (
                    <FormControl fullWidth size="small">
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={editedTicket.category}
                        onChange={handleChange('category')}
                        label="Category"
                      >
                        <MenuItem value="Email">Email</MenuItem>
                        <MenuItem value="Hardware">Hardware</MenuItem>
                        <MenuItem value="Software">Software</MenuItem>
                        <MenuItem value="Network">Network</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Category: {ticket.category}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PriorityIcon sx={{ color: getPriorityColor(ticket.priority) }} />
                  {isEditing ? (
                    <FormControl fullWidth size="small">
                      <InputLabel>Priority</InputLabel>
                      <Select
                        value={editedTicket.priority}
                        onChange={handleChange('priority')}
                        label="Priority"
                      >
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Priority: {ticket.priority}
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {isEditing ? (
                    <FormControl fullWidth size="small">
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={editedTicket.status}
                        onChange={handleChange('status')}
                        label="Status"
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Resolved">Resolved</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <Chip
                      label={ticket.status}
                      size="small"
                      sx={{
                        bgcolor: `${getStatusColor(ticket.status)}12`,
                        color: getStatusColor(ticket.status),
                        fontWeight: 500
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon sx={{ color: '#64748b' }} />
                  {isEditing ? (
                    <TextField
                      fullWidth
                      size="small"
                      label="Assigned To"
                      value={editedTicket.assignedTo}
                      onChange={handleChange('assignedTo')}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Assigned to: {ticket.assignedTo}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ color: '#64748b' }} />
                  <Typography variant="body2" color="text.secondary">
                    Requester: {ticket.requester}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 1, flex: 1, overflow: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#2d3436' }}>
              Updates
            </Typography>
            {isEditing && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                sx={{ textTransform: 'none' }}
              >
                Add Update
              </Button>
            )}
          </Box>
          <Stack spacing={2}>
            {ticket.updates?.map((update, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  {update.user.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ color: '#2d3436' }}>
                      {update.user}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {update.date}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {update.message}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>
    );
  };

  // Show ticket details or ticket list
  if (showDetails && selectedTicket) {
    return <TicketDetails ticket={selectedTicket} />;
  }

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column'
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
      </Box>

      <Box sx={{ 
        mb: { xs: 1.5, sm: 2 }, 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 1, sm: 2 }
      }}>
        <TextField
          placeholder="Search tickets..."
          variant="outlined"
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#64748b' }} />
              </InputAdornment>
            )
          }}
          sx={{ 
            flex: 1,
            bgcolor: 'white'
          }}
        />
        <Button
          variant="outlined"
          size="small"
          startIcon={<FilterIcon />}
          sx={{
            borderColor: '#e0e0e0',
            color: '#64748b',
            width: { xs: '100%', sm: 'auto' }
          }}
        >
          Filter
        </Button>
      </Box>

      <Paper elevation={0} sx={{ 
        flex: 1,
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        overflow: 'hidden'
      }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell sx={{ fontWeight: 600, color: '#2d3436' }}>Ticket ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#2d3436' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#2d3436' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#2d3436' }}>Priority</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#2d3436' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#2d3436' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#2d3436' }}>Assigned To</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#2d3436' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow
                  key={ticket.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell sx={{ color: '#1e293b' }}>{ticket.id}</TableCell>
                  <TableCell sx={{ color: '#1e293b' }}>{ticket.title}</TableCell>
                  <TableCell sx={{ color: '#1e293b' }}>{ticket.category}</TableCell>
                  <TableCell>
                    <Chip
                      label={ticket.priority}
                      size="small"
                      sx={{
                        bgcolor: `${getPriorityColor(ticket.priority)}12`,
                        color: getPriorityColor(ticket.priority),
                        fontWeight: 500
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
                        fontWeight: 500
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#1e293b' }}>{ticket.date}</TableCell>
                  <TableCell sx={{ color: '#1e293b' }}>{ticket.assignedTo}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(event) => handleMenuClick(event, ticket)}
                      size="small"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: '1px solid #e0e0e0',
            bgcolor: '#f8f9fa'
          }}
        />
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            border: '1px solid #e0e0e0',
            minWidth: 120
          }
        }}
      >
        <MenuItem onClick={handleViewDetails}>
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