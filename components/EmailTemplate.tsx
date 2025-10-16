import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
} from '@react-email/components';

interface EmailTemplateProps {
  name: string;
  email: string;
  content: string;
}

export function EmailTemplate({ name, email, content }: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <Heading style={{ color: '#333333', fontSize: '24px', marginBottom: '20px' }}>
            New Contact Form Submission
          </Heading>
          
          <Hr style={{ borderColor: '#3b82f6', marginBottom: '20px' }} />
          
          <Section style={{ marginBottom: '20px' }}>
            <Heading as="h2" style={{ color: '#555555', fontSize: '18px', marginBottom: '10px' }}>
              Contact Details:
            </Heading>
            <Text style={{ margin: '5px 0' }}>
              <strong>Name:</strong> {name}
            </Text>
            {email && (
              <Text style={{ margin: '5px 0' }}>
                <strong>Email:</strong> {email}
              </Text>
            )}
          </Section>

          {content && (
            <Section style={{ marginBottom: '20px' }}>
              <Heading as="h2" style={{ color: '#555555', fontSize: '18px', marginBottom: '10px' }}>
                Message:
              </Heading>
              <Section style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '15px', 
                borderRadius: '8px', 
                border: '1px solid #e9ecef'
              }}>
                <Text style={{ whiteSpace: 'pre-wrap', margin: '0' }}>
                  {content}
                </Text>
              </Section>
            </Section>
          )}

          <Section style={{ 
            marginTop: '30px', 
            padding: '15px', 
            backgroundColor: '#f0f9ff', 
            borderRadius: '8px' 
          }}>
            <Text style={{ margin: '0', color: '#0369a1', fontSize: '14px' }}>
              This message was sent from the Noto waitlist contact form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}