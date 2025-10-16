import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  email?: string;
  message?: string;
}

export function EmailTemplate({ firstName, email, message }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #3b82f6', paddingBottom: '10px' }}>
        New Contact Form Submission
      </h1>
      
      <div style={{ marginTop: '20px' }}>
        <h2 style={{ color: '#555', fontSize: '18px' }}>Contact Details:</h2>
        <p><strong>Name:</strong> {firstName}</p>
        {email && <p><strong>Email:</strong> {email}</p>}
      </div>

      {message && (
        <div style={{ marginTop: '20px' }}>
          <h2 style={{ color: '#555', fontSize: '18px' }}>Message:</h2>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '8px', 
            border: '1px solid #e9ecef',
            whiteSpace: 'pre-wrap'
          }}>
            {message}
          </div>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
        <p style={{ margin: '0', color: '#0369a1', fontSize: '14px' }}>
          This message was sent from the Noto waitlist contact form.
        </p>
      </div>
    </div>
  );
}