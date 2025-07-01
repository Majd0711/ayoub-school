import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { getSiteSettings, updateSiteSettings } from '../../utils/api';

interface SiteSettings {
  _id: string;
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  metaTags: {
    title: string;
    description: string;
    keywords: string;
  };
  logo?: string;
  favicon?: string;
}

const SettingsManagement: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSiteSettings();
      setSettings(data as SiteSettings);
    } catch (err: any) {
      setError(err.message || 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.') && settings) {
      const [parent, child] = name.split('.');
      setSettings({
        ...settings,
        [parent]: {
          ...settings[parent as keyof SiteSettings] as Record<string, any>,
          [child]: value
        }
      });
    } else if (settings) {
      setSettings({
        ...settings,
        [name]: value
      });
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFaviconFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      
      // Add all settings fields
      if (settings) {
        Object.entries(settings).forEach(([key, value]) => {
          if (key !== 'logo' && key !== 'favicon' && key !== '_id') {
            if (typeof value === 'object') {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, String(value));
            }
          }
        });
      }
      
      // Add files if selected
      if (logoFile) {
        formData.append('logo', logoFile);
      }
      
      if (faviconFile) {
        formData.append('favicon', faviconFile);
      }
      
      await updateSiteSettings(formData);
      
      setSuccess('Settings updated successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading settings...</p>
      </div>
    );
  }

  if (!settings) {
    return <Alert variant="danger">Failed to load settings</Alert>;
  }

  return (
    <div>
      <h1 className="mb-4">Site Settings</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">General Information</Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Site Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="siteName" 
                    value={settings.siteName} 
                    onChange={handleInputChange} 
                    required 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="contactEmail" 
                    value={settings.contactEmail} 
                    onChange={handleInputChange} 
                    required 
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Site Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="siteDescription" 
                value={settings.siteDescription} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Phone</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="contactPhone" 
                    value={settings.contactPhone} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="address" 
                    value={settings.address} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Social Media Links</Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Facebook</Form.Label>
                  <Form.Control 
                    type="url" 
                    name="socialLinks.facebook" 
                    value={settings.socialLinks.facebook || ''} 
                    onChange={handleInputChange} 
                    placeholder="https://facebook.com/yourpage" 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Instagram</Form.Label>
                  <Form.Control 
                    type="url" 
                    name="socialLinks.instagram" 
                    value={settings.socialLinks.instagram || ''} 
                    onChange={handleInputChange} 
                    placeholder="https://instagram.com/yourhandle" 
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Twitter</Form.Label>
                  <Form.Control 
                    type="url" 
                    name="socialLinks.twitter" 
                    value={settings.socialLinks.twitter || ''} 
                    onChange={handleInputChange} 
                    placeholder="https://twitter.com/yourhandle" 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>LinkedIn</Form.Label>
                  <Form.Control 
                    type="url" 
                    name="socialLinks.linkedin" 
                    value={settings.socialLinks.linkedin || ''} 
                    onChange={handleInputChange} 
                    placeholder="https://linkedin.com/company/yourcompany" 
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>YouTube</Form.Label>
              <Form.Control 
                type="url" 
                name="socialLinks.youtube" 
                value={settings.socialLinks.youtube || ''} 
                onChange={handleInputChange} 
                placeholder="https://youtube.com/c/yourchannel" 
              />
            </Form.Group>
          </Card.Body>
        </Card>
        
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">SEO Settings</Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Meta Title</Form.Label>
              <Form.Control 
                type="text" 
                name="metaTags.title" 
                value={settings.metaTags.title} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Meta Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={2} 
                name="metaTags.description" 
                value={settings.metaTags.description} 
                onChange={handleInputChange} 
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Meta Keywords</Form.Label>
              <Form.Control 
                type="text" 
                name="metaTags.keywords" 
                value={settings.metaTags.keywords} 
                onChange={handleInputChange} 
                placeholder="keyword1, keyword2, keyword3" 
              />
            </Form.Group>
          </Card.Body>
        </Card>
        
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Site Images</Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Logo</Form.Label>
                  {settings.logo && (
                    <div className="mb-2">
                      <img 
                        src={settings.logo} 
                        alt="Current Logo" 
                        style={{ maxHeight: '100px', maxWidth: '100%' }} 
                        className="border rounded p-2" 
                      />
                    </div>
                  )}
                  <Form.Control 
                    type="file" 
                    accept="image/*" 
                    onChange={handleLogoChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Favicon</Form.Label>
                  {settings.favicon && (
                    <div className="mb-2">
                      <img 
                        src={settings.favicon} 
                        alt="Current Favicon" 
                        style={{ maxHeight: '32px' }} 
                        className="border rounded p-1" 
                      />
                    </div>
                  )}
                  <Form.Control 
                    type="file" 
                    accept="image/x-icon,image/png" 
                    onChange={handleFaviconChange} 
                  />
                  <Form.Text className="text-muted">
                    Recommended: 32x32 PNG or ICO file
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
          <Button variant="secondary" onClick={fetchSettings} disabled={loading || saving}>
            Reset
          </Button>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? (
              <>
                <Spinner as="span" animation="border" size="sm" className="me-2" />
                Saving...
              </>
            ) : (
              'Save Settings'
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SettingsManagement;