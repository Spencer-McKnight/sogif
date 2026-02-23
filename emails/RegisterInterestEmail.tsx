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

          <Text style={footer}>
            This is an automated notification from the SOGIF website.
            The submission has been saved to your database.
          </Text>
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

          <Heading style={heading}>Thank You for Your Interest</Heading>

          <Text style={paragraph}>
            We&apos;ve received your enquiry about the Strategic Opportunities (Growth &amp; Income) Fund.
          </Text>

          <Text style={paragraph}>
            Attached is our Product Disclosure Statement (PDS) which contains important information
            about the Fund, including investment objectives, risks, fees, and how to invest.
          </Text>

          <Section style={ctaSection}>
            <Heading as="h2" style={subheading}>Ready to Apply?</Heading>
            <Text style={paragraph}>
              You can complete your investment application online in just a few minutes.
            </Text>
            <Link href={applicationUrl} style={button}>
              Start Your Application
            </Link>
          </Section>

          <Hr style={hr} />

          <Section style={infoSection}>
            <Heading as="h3" style={infoHeading}>How to Apply</Heading>
            <Text style={listItem}>1. Review the attached PDS carefully</Text>
            <Text style={listItem}>2. Complete the online application form</Text>
            <Text style={listItem}>3. Transfer your investment amount</Text>
          </Section>

          <Hr style={hr} />

          <Text style={supportText}>
            Have questions? Reply to this email or call us on <strong>(03) 8592 0270</strong> between
            10am–4pm Melbourne time, business days.
          </Text>

          <Section style={footerSection}>
            <Text style={footerText}>
              Strategic Opportunities (Growth &amp; Income) Fund<br />
              ARSN 668 357 837 | Plantation Capital Limited AFSL 339481
            </Text>
            {pdsUrl && (
              <Link href={pdsUrl} style={footerLink}>
                View PDS Online
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

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  maxWidth: '580px',
  borderRadius: '8px',
  overflow: 'hidden' as const,
}

const header = {
  backgroundColor: brandColors.navy,
  padding: '24px 32px',
  display: 'flex' as const,
  alignItems: 'center' as const,
}

const logo = {
  marginRight: '12px',
}

const brandName = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: '600' as const,
  margin: '0',
  lineHeight: '40px',
}

const heading = {
  color: brandColors.navy,
  fontSize: '24px',
  fontWeight: '600' as const,
  lineHeight: '1.3',
  margin: '32px 32px 16px',
}

const subheading = {
  color: brandColors.navy,
  fontSize: '18px',
  fontWeight: '600' as const,
  lineHeight: '1.3',
  margin: '0 0 12px',
}

const paragraph = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 32px 16px',
}

const detailRow = {
  color: brandColors.navy,
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 32px 8px',
}

const detailLink = {
  color: brandColors.cyan,
  textDecoration: 'none',
}

const ctaSection = {
  padding: '24px 32px',
  margin: '24px 0',
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: brandColors.navy,
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600' as const,
  padding: '14px 32px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  marginTop: '8px',
}

const infoSection = {
  padding: '0 32px',
  margin: '24px 0',
}

const infoHeading = {
  color: brandColors.navy,
  fontSize: '16px',
  fontWeight: '600' as const,
  margin: '0 0 12px',
}

const listItem = {
  color: '#525f7f',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 8px',
  paddingLeft: '8px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '0 32px',
}

const supportText = {
  color: '#525f7f',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '24px 32px',
}

const footerSection = {
  padding: '24px 32px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e6ebf1',
}

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '0 0 8px',
}

const footerLink = {
  color: brandColors.cyan,
  fontSize: '12px',
  textDecoration: 'underline',
}

const footer = {
  color: '#8898aa',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '24px 32px',
}

export default RegisterInterestEmail
