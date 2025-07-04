import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Modal, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { BsPencil, BsTrash, BsPlus } from 'react-icons/bs';
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '../../utils/api';

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  bio?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface TeamFormData {
  _id?: string;
  name: string;
  position: string;
  bio: string;
  image?: File | null;
  currentImage?: string;
}

const TeamManagement: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamFormData>({
    name: '',
    position: '',
    bio: '',
    image: null
  });
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTeamMembers();
      setTeamMembers(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMember = () => {
    setCurrentMember({
      name: '',
      position: '',
      bio: '',
      image: null
    });
    setFormMode('create');
    setFormError(null);
    setShowModal(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setCurrentMember({
      _id: member._id,
      name: member.name,
      position: member.position,
      bio: member.bio || '',
      currentImage: member.image
    });
    setFormMode('edit');
    setFormError(null);
    setShowModal(true);
  };

  const handleDeleteMember = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await deleteTeamMember(id);
        setTeamMembers(teamMembers.filter(member => member._id !== id));
        alert('Team member deleted successfully');
      } catch (err: any) {
        if (err.message.includes('Not authorized')) {
          alert('You are not authorized to delete team members. Please log in again.');
          // Optionally redirect to login page or refresh auth token
        } else if (err.message.includes('not found')) {
          alert('This team member no longer exists. The list will be refreshed.');
          // Refresh the team members list
          fetchTeamMembers();
        } else {
          alert(`Error deleting team member: ${err.message}`);
        }
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSubmitting(true);

    try {
      // Validate form
      if (!currentMember.name.trim()) {
        throw new Error('Name is required');
      }

      if (!currentMember.position.trim()) {
        throw new Error('Position is required');
      }

      const formData = new FormData();
      Object.entries(currentMember).forEach(([key, value]) => {
        if (key === 'image' && value instanceof File) {
          formData.append('image', value);
        } else if (value !== null && value !== undefined && key !== 'currentImage') {
          formData.append(key, String(value));
        }
      });
      
      const response = formMode === 'create' 
        ? await createTeamMember(formData)
        : await updateTeamMember(currentMember._id!, formData);

      if (formMode === 'create') {
        setTeamMembers([...teamMembers, response]);
      } else {
        setTeamMembers(teamMembers.map(member => 
          member._id === response._id ? response : member
        ));
      }

      setShowModal(false);
      alert(`Team member ${formMode === 'create' ? 'created' : 'updated'} successfully`);
    } catch (err: any) {
      if (err.message.includes('Not authorized') || err.message.includes('Invalid token')) {
        setFormError('You are not authorized. Please log in again.');
        // Optionally redirect to login page or refresh auth token
      } else {
        setFormError(err.message || `Failed to ${formMode} team member`);
      }
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentMember({ ...currentMember, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentMember({ ...currentMember, image: e.target.files[0] });
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading team members...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Team Management</h1>
        <Button variant="primary" onClick={handleCreateMember}>
          <BsPlus className="me-1" /> Add Team Member
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          {teamMembers.length === 0 ? (
            <div className="text-center p-4">
              <p className="mb-0">No team members found. Click "Add Team Member" to create your first team member.</p>
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>Image</th>
                  <th style={{ width: '25%' }}>Name</th>
                  <th style={{ width: '25%' }}>Position</th>
                  <th style={{ width: '20%' }}>Date Added</th>
                  <th style={{ width: '15%' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member._id}>
                    <td>
                      <img 
                        src={member.image || '/placeholder-image.jpg'} 
                        alt={member.name} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                        className="rounded-circle" 
                      />
                    </td>
                    <td>{member.name}</td>
                    <td>{member.position}</td>
                    <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm" onClick={() => handleEditMember(member)}>
                          <BsPencil />
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteMember(member._id)}>
                          <BsTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Team Member Form Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{formMode === 'create' ? 'Add New' : 'Edit'} Team Member</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            {formError && <Alert variant="danger">{formError}</Alert>}
            
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={currentMember.name} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control 
                type="text" 
                name="position" 
                value={currentMember.position} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                name="bio" 
                value={currentMember.bio} 
                onChange={handleInputChange} 
                placeholder="Brief biography (optional)" 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              {currentMember.currentImage && (
                <div className="mb-2">
                  <img 
                    src={currentMember.currentImage} 
                    alt="Current" 
                    style={{ height: '100px', width: '100px', objectFit: 'cover' }} 
                    className="border rounded-circle" 
                  />
                </div>
              )}
              <Form.Control 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={formSubmitting}>
              {formSubmitting ? (
                <>
                  <Spinner as="span" animation="border" size="sm" className="me-2" />
                  Saving...
                </>
              ) : (
                'Save Team Member'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamManagement;