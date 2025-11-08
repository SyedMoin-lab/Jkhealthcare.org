"use client";

import { motion } from "framer-motion";
import { FileText, Scale, AlertTriangle, Shield, Users, CreditCard, Phone, CheckCircle, XCircle } from "lucide-react";
import { Header } from "@/common/layout/header";
import { Footer } from "@/common/layout/footer";
import { Card } from "@/components/ui/card";

export default function TermsOfServicePage() {
  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: <FileText className="w-6 h-6" />,
      content: "By accessing and using JK Health Care AI, you accept and agree to be bound by these Terms of Service."
    },
    {
      id: "description",
      title: "Service Description",
      icon: <Scale className="w-6 h-6" />,
      content: "Our AI-powered healthcare platform provides medical consultations, appointment booking, and health management services."
    },
    {
      id: "user-responsibilities",
      title: "User Responsibilities",
      icon: <Users className="w-6 h-6" />,
      content: "Users must provide accurate information, use the service responsibly, and comply with all applicable laws."
    },
    {
      id: "medical-disclaimer",
      title: "Medical Disclaimer",
      icon: <AlertTriangle className="w-6 h-6" />,
      content: "Our AI provides health information and recommendations but does not replace professional medical advice."
    },
    {
      id: "payment-terms",
      title: "Payment Terms",
      icon: <CreditCard className="w-6 h-6" />,
      content: "Payment terms, billing policies, and refund procedures for our healthcare services."
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: <Shield className="w-6 h-6" />,
      content: "Limitations on our liability and disclaimers regarding the use of our AI healthcare services."
    }
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
                <Scale className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">Terms of Service</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-foreground">Terms of</span>
                <br />
                <span className="text-primary">Service</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Please read these Terms of Service carefully before using our AI-powered healthcare platform. 
                These terms govern your use of our services and outline your rights and responsibilities.
              </p>

              <div className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
                      <span className="text-primary font-bold">{index + 1}.</span>
                      <span className="text-foreground">{section.title}</span>
                    </a>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Terms of Service Content */}
            <div className="space-y-8">
              {/* Acceptance of Terms */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                id="acceptance"
                className="scroll-mt-24"
              >
                <Card className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <FileText className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl font-bold">1. Acceptance of Terms</h2>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground mb-6">
                      Welcome to JK Health Care AI. These Terms of Service ("Terms") govern your use of our 
                      AI-powered healthcare platform, including our website, mobile applications, and related 
                      services (collectively, the "Service") operated by JK Health Care AI ("we", "us", or "our").
                    </p>
                    
                    <p className="text-muted-foreground mb-6">
                      By accessing or using our Service, you agree to be bound by these Terms. If you disagree 
                      with any part of these terms, then you may not access the Service.
                    </p>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-3 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
                        Important Notice
                      </h3>
                      <p className="text-muted-foreground">
                        These Terms constitute a legally binding agreement between you and JK Health Care AI. 
                        Please read them carefully and contact us if you have any questions.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.section>

              {/* Service Description */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                id="description"
                className="scroll-mt-24"
              >
                <Card className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Scale className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl font-bold">2. Service Description</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">2.1 Our Services</h3>
                      <p className="text-muted-foreground mb-4">
                        JK Health Care AI provides the following services:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>AI-powered health consultations and symptom analysis</li>
                        <li>Appointment booking with healthcare providers</li>
                        <li>Health record management and storage</li>
                        <li>Medication reminders and tracking</li>
                        <li>Emergency medical assistance</li>
                        <li>Health education and wellness tips</li>
                        <li>Integration with healthcare providers and labs</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">2.2 AI Technology</h3>
                      <p className="text-muted-foreground mb-4">
                        Our platform uses advanced artificial intelligence to:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Analyze symptoms and provide preliminary assessments</li>
                        <li>Recommend appropriate healthcare providers</li>
                        <li>Personalize health recommendations</li>
                        <li>Monitor health trends and patterns</li>
                        <li>Provide 24/7 health assistance</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">2.3 Service Availability</h3>
                      <p className="text-muted-foreground mb-4">
                        We strive to provide continuous service availability, but we do not guarantee:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Uninterrupted access to the Service</li>
                        <li>Error-free operation of all features</li>
                        <li>Compatibility with all devices and browsers</li>
                        <li>Availability during maintenance periods</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.section>

              {/* User Responsibilities */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                id="user-responsibilities"
                className="scroll-mt-24"
              >
                <Card className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Users className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl font-bold">3. User Responsibilities</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">3.1 Account Requirements</h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Provide accurate and complete information during registration</li>
                        <li>Maintain the security of your account credentials</li>
                        <li>Notify us immediately of any unauthorized use</li>
                        <li>Update your information when it changes</li>
                        <li>Use only one account per person</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">3.2 Prohibited Activities</h3>
                      <p className="text-muted-foreground mb-4">
                        You agree not to:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Use the Service for any illegal or unauthorized purpose</li>
                        <li>Provide false or misleading health information</li>
                        <li>Attempt to gain unauthorized access to our systems</li>
                        <li>Interfere with or disrupt the Service</li>
                        <li>Use automated systems to access the Service</li>
                        <li>Share your account with others</li>
                        <li>Violate any applicable laws or regulations</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">3.3 Health Information Accuracy</h3>
                      <p className="text-muted-foreground mb-4">
                        You are responsible for:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Providing accurate and complete health information</li>
                        <li>Updating your health records as needed</li>
                        <li>Informing us of any changes in your medical condition</li>
                        <li>Ensuring emergency contact information is current</li>
                        <li>Following up with healthcare providers as recommended</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.section>

              {/* Medical Disclaimer */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                id="medical-disclaimer"
                className="scroll-mt-24"
              >
                <Card className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl font-bold">4. Medical Disclaimer</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-3 flex items-center text-red-800">
                        <XCircle className="w-5 h-5 mr-2" />
                        Important Medical Disclaimer
                      </h3>
                      <p className="text-red-700 mb-4">
                        Our AI-powered platform provides health information and recommendations but does NOT replace 
                        professional medical advice, diagnosis, or treatment.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">4.1 AI Limitations</h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>AI recommendations are based on general patterns and may not apply to your specific situation</li>
                        <li>Our AI cannot diagnose medical conditions or prescribe medications</li>
                        <li>AI responses should not be used as the sole basis for medical decisions</li>
                        <li>Always consult with qualified healthcare professionals for medical advice</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">4.2 Emergency Situations</h3>
                      <p className="text-muted-foreground mb-4">
                        In case of medical emergencies:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Call emergency services immediately (911 or local emergency number)</li>
                        <li>Do not rely on our AI for emergency medical situations</li>
                        <li>Seek immediate professional medical attention</li>
                        <li>Our platform is not a substitute for emergency medical care</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">4.3 Professional Medical Care</h3>
                      <p className="text-muted-foreground mb-4">
                        You should always:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Consult with licensed healthcare providers for medical advice</li>
                        <li>Follow the recommendations of your healthcare team</li>
                        <li>Seek second opinions when appropriate</li>
                        <li>Use our platform as a supplement, not a replacement, for professional care</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.section>

              {/* Payment Terms */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                id="payment-terms"
                className="scroll-mt-24"
              >
                <Card className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <CreditCard className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl font-bold">5. Payment Terms</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">5.1 Service Fees</h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Consultation fees are charged per session or on a subscription basis</li>
                        <li>Appointment booking may incur additional charges</li>
                        <li>Premium features may require separate payment</li>
                        <li>Emergency services may have different pricing structures</li>
                        <li>All fees are clearly displayed before service provision</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">5.2 Payment Methods</h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>We accept major credit cards, debit cards, and digital wallets</li>
                        <li>Insurance payments may be accepted for eligible services</li>
                        <li>Payment information is securely processed and encrypted</li>
                        <li>We do not store complete payment card information</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">5.3 Billing and Invoicing</h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Invoices are generated automatically for services rendered</li>
                        <li>Payment is due immediately unless otherwise specified</li>
                        <li>Late payment fees may apply for overdue accounts</li>
                        <li>Billing disputes must be reported within 30 days</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">5.4 Refunds and Cancellations</h3>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Refunds are provided according to our refund policy</li>
                        <li>Service cancellations must be made within specified timeframes</li>
                        <li>Emergency services are generally non-refundable</li>
                        <li>Refund requests are processed within 5-10 business days</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.section>

              {/* Limitation of Liability */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                id="liability"
                className="scroll-mt-24"
              >
                <Card className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Shield className="w-6 h-6 text-primary" />
                    <h2 className="text-3xl font-bold">6. Limitation of Liability</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">6.1 Service Limitations</h3>
                      <p className="text-muted-foreground mb-4">
                        Our Service is provided "as is" and "as available" without warranties of any kind. 
                        We disclaim all warranties, express or implied, including:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Warranties of merchantability and fitness for a particular purpose</li>
                        <li>Warranties regarding accuracy, reliability, or completeness of information</li>
                        <li>Warranties that the Service will be uninterrupted or error-free</li>
                        <li>Warranties regarding the security of data transmission</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">6.2 Limitation of Damages</h3>
                      <p className="text-muted-foreground mb-4">
                        To the maximum extent permitted by law, we shall not be liable for:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Indirect, incidental, special, or consequential damages</li>
                        <li>Loss of profits, data, or business opportunities</li>
                        <li>Damages resulting from use or inability to use the Service</li>
                        <li>Damages resulting from unauthorized access to your account</li>
                        <li>Damages resulting from third-party actions or content</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">6.3 Medical Liability</h3>
                      <p className="text-muted-foreground mb-4">
                        We are not responsible for:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Medical decisions made based on AI recommendations</li>
                        <li>Outcomes of treatments or procedures</li>
                        <li>Delays in medical care or treatment</li>
                        <li>Medical errors or misdiagnoses by healthcare providers</li>
                        <li>Adverse reactions to medications or treatments</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-3 flex items-center text-yellow-800">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Important Notice
                      </h3>
                      <p className="text-yellow-700">
                        Our total liability to you for any claims arising from or related to these Terms or 
                        the Service shall not exceed the amount you paid us for the Service in the 12 months 
                        preceding the claim.
                      </p>
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
                  <h2 className="text-3xl font-bold mb-6">7. Additional Terms</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">7.1 Intellectual Property</h3>
                      <p className="text-muted-foreground mb-4">
                        The Service and its original content, features, and functionality are owned by JK Health Care AI 
                        and are protected by international copyright, trademark, patent, trade secret, and other 
                        intellectual property laws.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">7.2 Termination</h3>
                      <p className="text-muted-foreground mb-4">
                        We may terminate or suspend your account immediately, without prior notice or liability, 
                        for any reason whatsoever, including without limitation if you breach the Terms.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">7.3 Governing Law</h3>
                      <p className="text-muted-foreground mb-4">
                        These Terms shall be interpreted and governed by the laws of India, without regard to 
                        its conflict of law provisions. Any disputes shall be resolved in the courts of Kashmir, India.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">7.4 Changes to Terms</h3>
                      <p className="text-muted-foreground mb-4">
                        We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                        we will try to provide at least 30 days notice prior to any new terms taking effect.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">7.5 Severability</h3>
                      <p className="text-muted-foreground mb-4">
                        If any provision of these Terms is held to be invalid or unenforceable by a court, 
                        the remaining provisions of these Terms will remain in effect.
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
                  <h2 className="text-3xl font-bold mb-6">8. Contact Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">General Inquiries</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p>Email: support@jkhealthcare.org</p>
                        <p>Phone: +1-800-AI-HEALTH</p>
                        <p>Hours: 24/7 Support</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Legal Department</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p>Email: legal@jkhealthcare.org</p>
                        <p>Phone: +1-800-AI-HEALTH ext. 3</p>
                        <p>Address: JK Health Care AI, Legal Department, Kashmir, India</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-background rounded-lg border">
                    <p className="text-muted-foreground text-center">
                      These Terms of Service are effective as of {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} 
                      and will remain in effect except with respect to any changes in its provisions in the future.
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
