import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Badge, Modal, Form, Row, Col, Alert, Spinner, Pagination } from 'react-bootstrap';
import { BsEye, BsTrash, BsArchive, BsReply } from 'react-icons/bs';
import { getContacts, getContact, updateContact, deleteContact } from '../../utils/api';
import { Contact } from '../../utils/api';

interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  filters: {
    status: string;
    search: string;
    isArchived: boolean;
  };
}

const ContactsManagement: React.FC = () => {
  const [state, setState] = useState<ContactsState>({
    contacts: [],
    loading: true,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0
    },
    filters: {
      status: '',
      search: '',
      isArchived: false
    }
  });

  const [showViewModal, setShowViewModal] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [noteText, setNoteText] = useState('');
  const [statusUpdate, setStatusUpdate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, [state.pagination.page, state.filters]);

  const fetchContacts = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const params: Record<string, string> = {
        page: state.pagination.page.toString(),
        limit: state.pagination.limit.toString()
      };

      if (state.filters.status) {
        params.status = state.filters.status;
      }

      if (state.filters.search) {
        params.search = state.filters.search;
      }

      if (state.filters.isArchived) {
        params.isArchived = 'true';
      }

      const response = await getContacts(params);
      
      setState(prev => ({
        ...prev,
        contacts: response.data || [],
        pagination: response.pagination || prev.pagination,
        loading: false
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        error: err.message || 'Failed to load contacts',
        loading: false
      }));
    }
  };

  const handleViewContact = async (id: string) => {
    try {
      const contact = await getContact(id);
      if (contact) {
        setCurrentContact(contact);
        setShowViewModal(true);
        setStatusUpdate(contact.status || 'new');
      }
    } catch (err: any) {
      alert(`Error loading contact: ${err.message}`);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
      try {
        await deleteContact(id);
        setState(prev => ({
          ...prev,
          contacts: prev.contacts.filter(contact => contact._id !== id)
        }));
        alert('Contact deleted successfully');
      } catch (err: any) {
        alert(`Error deleting contact: ${err.message}`);
      }
    }
  };

  const handleArchiveContact = async (id: string, isArchived: boolean) => {
    try {
      await updateContact(id, { isArchived: !isArchived });
      setState(prev => ({
        ...prev,
        contacts: prev.contacts.map(contact => 
          contact._id === id ? { ...contact, isArchived: !isArchived } : contact
        )
      }));
      alert(`Contact ${!isArchived ? 'archived' : 'unarchived'} successfully`);
    } catch (err: any) {
      alert(`Error updating contact: ${err.message}`);
    }
  };

  const handleAddNote = async () => {
    if (!currentContact || !noteText.trim()) return;

    setSubmitting(true);
    try {
      const updatedContact = await updateContact(currentContact._id, {
        note: noteText,
        status: statusUpdate
      });

      if (updatedContact) {
        setCurrentContact(updatedContact);
        setNoteText('');
        
        // Update contact in the list
        setState(prev => ({
          ...prev,
          contacts: prev.contacts.map(contact => 
            contact._id === currentContact._id ? updatedContact : contact
          )
        }));
      }
    } catch (err: any) {
      alert(`Error adding note: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePageChange = (page: number) => {
    setState(prev => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        page
      }
    }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setState(prev => ({
        ...prev,
        filters: {
          ...prev.filters,
          [name]: target.checked
        },
        pagination: {
          ...prev.pagination,
          page: 1 // Reset to first page on filter change
        }
      }));
    } else {
      setState(prev => ({
        ...prev,
        filters: {
          ...prev.filters,
          [name]: value
        },
        pagination: {
          ...prev.pagination,
          page: 1 // Reset to first page on filter change
        }
      }));
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchContacts();
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'new':
        return <Badge bg="primary">New</Badge>;
      case 'in-progress':
        return <Badge bg="warning">In Progress</Badge>;
      case 'responded':
        return <Badge bg="success">Responded</Badge>;
      case 'closed':
        return <Badge bg="secondary">Closed</Badge>;
      default:
        return <Badge bg="primary">New</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Generate pagination items
  const paginationItems = [];
  const totalPages = Math.ceil(state.pagination.total / state.pagination.limit);
  
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item 
        key={i} 
        active={i === state.pagination.page}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Contact Messages</h1>
      </div>

      {/* Filters */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSearchSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search by name or email"
                    name="search"
                    value={state.filters.search}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={state.filters.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Statuses</option>
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="responded">Responded</option>
                    <option value="closed">Closed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Archived</Form.Label>
                  <div>
                    <Form.Check
                      type="checkbox"
                      label="Show archived"
                      name="isArchived"
                      checked={state.filters.isArchived}
                      onChange={handleFilterChange}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button type="submit" variant="primary" className="w-100 mb-3">
                  Filter
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {state.error && <Alert variant="danger">{state.error}</Alert>}

      {/* Contacts Table */}
      <Card className="shadow-sm">
        <Card.Body>
          {state.loading ? (
            <div className="text-center p-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading contacts...</p>
            </div>
          ) : state.contacts.length === 0 ? (
            <div className="text-center p-5">
              <p className="mb-0">No contacts found.</p>
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.contacts.map(contact => (
                  <tr key={contact._id} className={contact.isArchived ? 'table-secondary' : ''}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.subject}</td>
                    <td>{getStatusBadge(contact.status)}</td>
                    <td>{formatDate(contact.createdAt)}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleViewContact(contact._id)}
                      >
                        <BsEye /> View
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleArchiveContact(contact._id, contact.isArchived || false)}
                      >
                        <BsArchive /> {contact.isArchived ? 'Unarchive' : 'Archive'}
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteContact(contact._id)}
                      >
                        <BsTrash /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* Pagination */}
          {!state.loading && state.contacts.length > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                Showing {state.contacts.length} of {state.pagination.total} contacts
              </div>
              <Pagination>
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={state.pagination.page === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(Math.max(1, state.pagination.page - 1))}
                  disabled={state.pagination.page === 1}
                />
                {paginationItems}
                <Pagination.Next
                  onClick={() => handlePageChange(Math.min(totalPages, state.pagination.page + 1))}
                  disabled={state.pagination.page === totalPages}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(totalPages)}
                  disabled={state.pagination.page === totalPages}
                />
              </Pagination>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* View Contact Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentContact && (
            <>
              <Row className="mb-4">
                <Col md={6}>
                  <p><strong>Name:</strong> {currentContact.name}</p>
                  <p><strong>Email:</strong> {currentContact.email}</p>
                  <p><strong>Phone:</strong> {currentContact.phone}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Date:</strong> {formatDate(currentContact.createdAt)}</p>
                  <p><strong>Status:</strong> {getStatusBadge(currentContact.status)}</p>
                  <p>
                    <strong>Archived:</strong>{' '}
                    {currentContact.isArchived ? 'Yes' : 'No'}
                  </p>
                </Col>
              </Row>

              <Card className="mb-4">
                <Card.Header>Subject</Card.Header>
                <Card.Body>{currentContact.subject}</Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Header>Message</Card.Header>
                <Card.Body>
                  <div style={{ whiteSpace: 'pre-wrap' }}>{currentContact.message}</div>
                </Card.Body>
              </Card>

              {currentContact.notes && currentContact.notes.length > 0 && (
                <Card className="mb-4">
                  <Card.Header>Notes</Card.Header>
                  <Card.Body>
                    {currentContact.notes.map((note, index) => (
                      <div key={index} className="mb-3 pb-3 border-bottom">
                        <div className="d-flex justify-content-between">
                          <small className="text-muted">
                            {formatDate(note.addedAt)}
                          </small>
                        </div>
                        <p className="mb-0">{note.note}</p>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              )}

              <Card>
                <Card.Header>Add Note & Update Status</Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={statusUpdate}
                      onChange={(e) => setStatusUpdate(e.target.value)}
                    >
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="responded">Responded</option>
                      <option value="closed">Closed</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Note</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Add a note about this contact..."
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={handleAddNote}
                    disabled={submitting || !noteText.trim()}
                  >
                    {submitting ? 'Saving...' : 'Save Note & Update Status'}
                  </Button>
                </Card.Body>
              </Card>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            href={`mailto:${currentContact?.email}`}
            target="_blank"
          >
            <BsReply /> Reply via Email
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactsManagement;
