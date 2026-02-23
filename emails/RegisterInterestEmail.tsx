import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface RegisterInterestEmailProps {
  email: string
  phone?: string
  investmentRange: string
  submittedAt: string
}

export function RegisterInterestEmail({
  email,
  phone,
  investmentRange,
  submittedAt,
}: RegisterInterestEmailProps) {
  const formattedDate = new Date(submittedAt).toLocaleString('en-AU', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Australia/Melbourne',
  })

  return (
    <Html>
      <Head />
      <Preview>New register interest submission from {email}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src="https://www.datocms-assets.com/192130/1768821769-logo.webp?w=80&fit=max&auto=format"
              width="40"
              height="40"
              alt="SOGIF"
              style={logo}
            />
            <Text style={brandName}>SOGIF</Text>
          </Section>
          <Section style={headerAccent} />

          <Section style={body}>
            <Heading style={heading}>New Interest Registration</Heading>
            <Text style={detailRow}>
              <strong>Email:</strong>{' '}
              <Link href={`mailto:${email}`} style={detailLink}>{email}</Link>
            </Text>
            {phone && (
              <Text style={detailRow}>
                <strong>Phone:</strong> {phone}
              </Text>
            )}
            <Text style={detailRow}>
              <strong>Investment Range:</strong> {investmentRange}
            </Text>
            <Text style={detailRow}>
              <strong>Submitted:</strong> {formattedDate}
            </Text>

            <Hr style={hr} />

            <Text style={mutedText}>
              This is an automated notification from the SOGIF website.
              The submission has been saved to your database.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

interface LeadConfirmationEmailProps {
  applicationUrl: string
  pdsUrl: string
}

export function LeadConfirmationEmail({
  applicationUrl,
  pdsUrl,
}: LeadConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for your interest in SOGIF</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src="https://www.datocms-assets.com/192130/1768821769-logo.webp?w=80&fit=max&auto=format"
              width="40"
              height="40"
              alt="SOGIF"
              style={logo}
            />
            <Text style={brandName}>SOGIF</Text>
          </Section>
          <Section style={headerAccent} />

          <Section style={body}>
            <Heading style={heading}>Thank You for Your Interest</Heading>

            <Text style={paragraph}>
              We&apos;ve received your enquiry about the Strategic Opportunities (Growth &amp; Income) Fund.
            </Text>

            <Text style={paragraph}>
              Attached is our Product Disclosure Statement (PDS) which contains important information
              about the Fund, including investment objectives, risks, fees, and how to invest.
            </Text>

            <Section style={ctaBox}>
              <Heading as="h2" style={subheading}>Ready to Apply?</Heading>
              <Text style={ctaParagraph}>
                You can complete your investment application online in just a few minutes.
              </Text>
              <Link href={applicationUrl} style={button}>
                Start Your Application
              </Link>
            </Section>

            <Hr style={hr} />

            <Heading as="h3" style={sectionLabel}>How to Apply</Heading>
            <Text style={listItem}>1.&nbsp;&nbsp;Review the attached PDS carefully</Text>
            <Text style={listItem}>2.&nbsp;&nbsp;Complete the online application form</Text>
            <Text style={listItem}>3.&nbsp;&nbsp;Transfer your investment amount</Text>

            <Hr style={hr} />

            <Text style={paragraph}>
              Have questions? Reply to this email or call us on{' '}
              <Link href="tel:+61385920270" style={detailLink}><strong>(03) 8592 0270</strong></Link>{' '}
              between 10am–4pm Melbourne time, business days.
            </Text>
          </Section>

          <Section style={footerSection}>
            <Text style={footerText}>
              Strategic Opportunities (Growth &amp; Income) Fund
            </Text>
            <Text style={footerText}>
              ARSN 668 357 837 | Plantation Capital Limited AFSL 339481
            </Text>
            {pdsUrl && (
              <Link href={pdsUrl} style={footerLink}>
                View PDS Online →
              </Link>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const brandColors = {
  navy: '#0A2540',
  cyan: '#00A3B4',
  gold: '#C9A962',
}

const fontFamily =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'

const main = {
  backgroundColor: '#f0f4f8',
  fontFamily,
}

const container = {
  backgroundColor: '#ffffff',
  margin: '32px auto',
  padding: '0',
  maxWidth: '560px',
  borderRadius: '8px',
  overflow: 'hidden' as const,
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
}

const header = {
  backgroundColor: brandColors.navy,
  padding: '24px 32px',
  display: 'flex' as const,
  alignItems: 'center' as const,
}

const headerAccent = {
  backgroundColor: brandColors.gold,
  height: '3px',
  lineHeight: '3px',
  fontSize: '1px',
}

const logo = {
  marginRight: '12px',
}

const brandName = {
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: '600' as const,
  letterSpacing: '0.04em',
  margin: '0',
  lineHeight: '40px',
  fontFamily,
}

const body = {
  padding: '32px',
}

const heading = {
  color: brandColors.navy,
  fontSize: '22px',
  fontWeight: '600' as const,
  lineHeight: '1.3',
  margin: '0 0 20px',
  fontFamily,
}

const subheading = {
  color: brandColors.navy,
  fontSize: '16px',
  fontWeight: '600' as const,
  lineHeight: '1.4',
  margin: '0 0 8px',
  fontFamily,
}

const sectionLabel = {
  color: brandColors.navy,
  fontSize: '14px',
  fontWeight: '600' as const,
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  margin: '24px 0 12px',
  fontFamily,
}

const paragraph = {
  color: '#4a5568',
  fontSize: '15px',
  lineHeight: '1.65',
  margin: '0 0 16px',
  fontFamily,
}

const ctaParagraph = {
  color: '#4a5568',
  fontSize: '15px',
  lineHeight: '1.65',
  margin: '0 0 16px',
  fontFamily,
}

const detailRow = {
  color: brandColors.navy,
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 10px',
  fontFamily,
}

const detailLink = {
  color: brandColors.cyan,
  textDecoration: 'none',
}

const ctaBox = {
  backgroundColor: '#f8fafc',
  borderLeft: `3px solid ${brandColors.gold}`,
  borderRadius: '0 6px 6px 0',
  padding: '20px 24px',
  margin: '24px 0',
}

const button = {
  backgroundColor: brandColors.navy,
  borderRadius: '6px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: '600' as const,
  letterSpacing: '0.02em',
  padding: '12px 24px',
  textDecoration: 'none',
  fontFamily,
}

const listItem = {
  color: '#4a5568',
  fontSize: '15px',
  lineHeight: '1.65',
  margin: '0 0 6px',
  fontFamily,
}

const hr = {
  borderColor: '#e8edf2',
  margin: '24px 0',
}

const mutedText = {
  color: '#94a3b8',
  fontSize: '13px',
  lineHeight: '1.6',
  margin: '24px 0 0',
  fontFamily,
}

const footerSection = {
  padding: '20px 32px',
  borderTop: '1px solid #e8edf2',
  backgroundColor: '#f8fafc',
}

const footerText = {
  color: '#94a3b8',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '0 0 4px',
  fontFamily,
}

const footerLink = {
  color: brandColors.cyan,
  fontSize: '12px',
  textDecoration: 'none',
  fontFamily,
}

export default RegisterInterestEmail
