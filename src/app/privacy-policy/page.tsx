"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Users,
  FileText,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Header } from "@/common/layout/header";
import { Footer } from "@/common/layout/footer";
import { Card } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: <FileText className="w-6 h-6" />,
      content:
        "This Privacy Policy describes how JK Health Care AI ('we', 'our', or 'us') collects, uses, and protects your personal information when you use our AI-powered healthcare platform.",
    },
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: <Database className="w-6 h-6" />,
      content:
        "We collect information you provide directly to us, information we collect automatically, and information from third parties.",
    },
    {
      id: "data-usage",
      title: "How We Use Your Information",
      icon: <Eye className="w-6 h-6" />,
      content:
        "We use your information to provide, maintain, and improve our services, process transactions, and communicate with you.",
    },
    {
      id: "data-sharing",
      title: "Information Sharing",
      icon: <Users className="w-6 h-6" />,
      content:
        "We may share your information in certain circumstances, including with healthcare providers and service partners.",
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: <Lock className="w-6 h-6" />,
      content:
        "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: <Shield className="w-6 h-6" />,
      content:
        "You have certain rights regarding your personal information, including the right to access, update, or delete your data.",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">
                  Privacy Policy
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-foreground">Your Privacy</span>
                <br />
                <span className="text-primary">Matters to Us</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                We are committed to protecting your privacy and ensuring the
                security of your personal health information. This policy
                explains how we collect, use, and safeguard your data.
              </p>

              <div className="text-sm text-muted-foreground">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </motion.div>

            {/* Table of Contents */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {sections.map((section, index) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <span className="text-primary font-bold">
                        {index + 1}.
                      </span>
                      <span className="text-foreground">{section.title}</span>
                    </a>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Privacy Policy Content */}
            <div className="space-y-8">
              {/* Introduction */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                id="introduction"
                className="scroll-mt-24"
              >
                <Card className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <FileText className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl font-bold">1. Introduction</h2>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground mb-6">
                      JK Health Care AI is committed to protecting your privacy
                      and personal information. This Privacy Policy explains how
                      we collect, use, disclose, and safeguard your information
                      when you use our AI-powered healthcare platform, including
                      our website, mobile applications, and related services
                      (collectively, the "Service").
                    </p>

                    <p className="text-muted-foreground mb-6">
                      By using our Service, you agree to the collection and use
                      of information in accordance with this policy. If you do
                      not agree with the terms of this Privacy Policy, please do
                      not access or use the Service.
                    </p>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-3 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2 text-primary" />
                        Important Notice
                      </h3>
                      <p className="text-muted-foreground">
                        This Privacy Policy applies to all users of our Service,
                        including patients, healthcare providers, and visitors
                        to our website. We may update this policy from time to
                        time, and we will notify you of any material changes.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.section>

              {/* Information Collection */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                id="information-collection"
                className="scroll-mt-24"
              >
                <Card className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Database className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl font-bold">
                      2. Information We Collect
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        2.1 Personal Information
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        We collect information you provide directly to us,
                        including:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>
                          Name, email address, phone number, and date of birth
                        </li>
                        <li>
                          Medical history, symptoms, and health conditions
                        </li>
                        <li>Insurance information and payment details</li>
                        <li>Emergency contact information</li>
                        <li>Profile information and preferences</li>
                        <li>
                          Communications with our AI assistant and support team
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        2.2 Automatically Collected Information
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        We automatically collect certain information when you
                        use our Service:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>
                          Device information (IP address, browser type,
                          operating system)
                        </li>
                        <li>
                          Usage data (pages visited, features used, time spent)
                        </li>
                        <li>Location data (with your consent)</li>
                        <li>Cookies and similar tracking technologies</li>
                        <li>Log files and analytics data</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        2.3 Health Information
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        As a healthcare platform, we collect sensitive health
                        information, including:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Medical records and test results</li>
                        <li>Prescription medications and dosages</li>
                        <li>Allergies and adverse reactions</li>
                        <li>Vaccination records</li>
                        <li>
                          Mental health information (with explicit consent)
                        </li>
                        <li>Emergency medical information</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.section>

              {/* Data Usage */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                id="data-usage"
                className="scroll-mt-24"
              >
                <Card className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Eye className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl font-bold">
                      3. How We Use Your Information
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        3.1 Primary Uses
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>
                          Provide AI-powered healthcare recommendations and
                          consultations
                        </li>
                        <li>
                          Connect you with healthcare providers and specialists
                        </li>
                        <li>
                          Schedule appointments and manage your healthcare
                          journey
                        </li>
                        <li>Process payments and insurance claims</li>
                        <li>
                          Send appointment reminders and health notifications
                        </li>
                        <li>Provide emergency medical assistance</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        3.2 Service Improvement
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>
                          Improve our AI algorithms and diagnostic accuracy
                        </li>
                        <li>Develop new features and services</li>
                        <li>
                          Conduct research and analytics (anonymized data only)
                        </li>
                        <li>Personalize your healthcare experience</li>
                        <li>Monitor service quality and performance</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        3.3 Communication
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>
                          Send important service updates and notifications
                        </li>
                        <li>
                          Provide customer support and technical assistance
                        </li>
                        <li>Share health tips and educational content</li>
                        <li>
                          Send marketing communications (with your consent)
                        </li>
                        <li>Respond to your inquiries and feedback</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.section>

              {/* Data Sharing */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                id="data-sharing"
                className="scroll-mt-24"
              >
                <Card className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Users className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl font-bold">
                      4. Information Sharing
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        4.1 Healthcare Providers
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        We share your health information with healthcare
                        providers to:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Enable accurate diagnosis and treatment</li>
                        <li>Coordinate care between different specialists</li>
                        <li>Provide emergency medical services</li>
                        <li>Ensure continuity of care</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        4.2 Service Partners
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        We may share information with trusted third parties who
                        assist us in:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Payment processing and billing</li>
                        <li>Cloud storage and data management</li>
                        <li>Analytics and performance monitoring</li>
                        <li>Customer support services</li>
                        <li>Marketing and communication (with consent)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        4.3 Legal Requirements
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        We may disclose your information when required by law or
                        to:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Comply with legal obligations and court orders</li>
                        <li>Protect our rights and prevent fraud</li>
                        <li>Ensure public safety and health</li>
                        <li>Respond to government requests</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-3 flex items-center text-yellow-800">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        Important
                      </h3>
                      <p className="text-yellow-700">
                        We never sell your personal health information to third
                        parties for marketing purposes. All data sharing is done
                        in accordance with applicable privacy laws and
                        regulations.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.section>

              {/* Data Security */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                id="data-security"
                className="scroll-mt-24"
              >
                <Card className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Lock className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl font-bold">5. Data Security</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        5.1 Security Measures
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        We implement comprehensive security measures to protect
                        your information:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>End-to-end encryption for all data transmission</li>
                        <li>Advanced encryption at rest (AES-256)</li>
                        <li>Multi-factor authentication for all accounts</li>
                        <li>Regular security audits and penetration testing</li>
                        <li>
                          Secure cloud infrastructure with SOC 2 compliance
                        </li>
                        <li>
                          Employee training on data protection best practices
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        5.2 Access Controls
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Role-based access controls for all employees</li>
                        <li>Regular access reviews and updates</li>
                        <li>
                          Audit logs for all data access and modifications
                        </li>
                        <li>Secure authentication protocols</li>
                        <li>
                          Regular security training and awareness programs
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        5.3 Incident Response
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        In the event of a data breach, we will:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Immediately investigate and contain the breach</li>
                        <li>Notify affected users within 72 hours</li>
                        <li>
                          Report to relevant authorities as required by law
                        </li>
                        <li>Implement additional security measures</li>
                        <li>Provide credit monitoring services if necessary</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.section>

              {/* Your Rights */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                id="your-rights"
                className="scroll-mt-24"
              >
                <Card className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Shield className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl font-bold">6. Your Rights</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        6.1 Access and Portability
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Request a copy of your personal information</li>
                        <li>Export your health data in a portable format</li>
                        <li>View your data processing activities</li>
                        <li>Access your account information at any time</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        6.2 Correction and Updates
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Update or correct inaccurate information</li>
                        <li>Add additional information to your profile</li>
                        <li>Modify your communication preferences</li>
                        <li>Update your emergency contact information</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        6.3 Deletion and Restriction
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Request deletion of your personal information</li>
                        <li>Restrict processing of your data</li>
                        <li>Object to certain data processing activities</li>
                        <li>Withdraw consent for data processing</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-3 flex items-center text-green-800">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        How to Exercise Your Rights
                      </h3>
                      <p className="text-green-700 mb-4">
                        To exercise any of these rights, please contact us at:
                      </p>
                      <ul className="text-green-700 space-y-1">
                        <li>Email: privacy@jkhealthcare.org</li>
                        <li>Phone: +1-800-AI-HEALTH</li>
                        <li>
                          Address: JK Health Care AI, Privacy Office, Kashmir,
                          India
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.section>

              {/* Additional Sections */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="scroll-mt-24"
              >
                <Card className="p-8">
                  <h2 className="text-3xl font-bold mb-6">
                    7. Additional Information
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        7.1 Cookies and Tracking
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        We use cookies and similar technologies to enhance your
                        experience, analyze usage patterns, and provide
                        personalized content. You can control cookie settings
                        through your browser preferences.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        7.2 International Transfers
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Your information may be transferred to and processed in
                        countries other than your own. We ensure appropriate
                        safeguards are in place to protect your data during such
                        transfers.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        7.3 Children's Privacy
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Our Service is not intended for children under 13. We do
                        not knowingly collect personal information from children
                        under 13. If you are a parent and believe your child has
                        provided us with personal information, please contact us
                        immediately.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        7.4 Changes to This Policy
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        We may update this Privacy Policy from time to time. We
                        will notify you of any material changes by posting the
                        new Privacy Policy on this page and updating the "Last
                        updated" date. Your continued use of the Service after
                        such changes constitutes acceptance of the updated
                        policy.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.section>

              {/* Contact Information */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="scroll-mt-24"
              >
                <Card className="p-8 bg-primary/5 border-primary/20">
                  <h2 className="text-3xl font-bold mb-6">8. Contact Us</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Privacy Questions
                      </h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p>Email: privacy@jkhealthcare.org</p>
                        <p>Phone: +1-800-AI-HEALTH</p>
                        <p>Response time: Within 24 hours</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Data Protection Officer
                      </h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p>Email: dpo@jkhealthcare.org</p>
                        <p>Phone: +1-800-AI-HEALTH ext. 2</p>
                        <p>
                          Address: JK Health Care AI, DPO Office, Kashmir, India
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-background rounded-lg border">
                    <p className="text-muted-foreground text-center">
                      This Privacy Policy is effective as of{" "}
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      and will remain in effect except with respect to any
                      changes in its provisions in the future.
                    </p>
                  </div>
                </Card>
              </motion.section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
