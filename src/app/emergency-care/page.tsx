"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/common/form";
import { Modal } from "@/components/ui/modal";
import { Header } from "@/common/layout/header";
import { Footer } from "@/common/layout/footer";
import {
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  AmbulanceIcon,
  HeartIcon,
  ShieldCheckIcon,
  UsersIcon,
  AlertTriangleIcon,
  StethoscopeIcon,
  ActivityIcon,
  ZapIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PhoneCallIcon,
  NavigationIcon,
  CalendarIcon,
  FileTextIcon,
  UserCheckIcon,
  GlobeIcon,
  MicIcon,
} from "lucide-react";
import { createAICallFormSubmitHandler } from "@/lib/ai-call";

export default function EmergencyCarePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = createAICallFormSubmitHandler(
    () => setIsModalOpen(false),
    "Emergency form submitted",
  );

  const emergencyServices = [
    {
      icon: <HeartIcon className="w-6 h-6" />,
      title: "Cardiac Emergency",
      description:
        "24/7 heart attack and stroke treatment with advanced cardiac care unit",
      responseTime: "5-10 minutes",
      availability: "24/7",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: <AmbulanceIcon className="w-6 h-6" />,
      title: "Trauma Care",
      description:
        "Advanced trauma center for accidents, injuries, and critical emergencies",
      responseTime: "3-7 minutes",
      availability: "24/7",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: <ActivityIcon className="w-6 h-6" />,
      title: "Pediatric Emergency",
      description:
        "Specialized emergency care for children with pediatric specialists",
      responseTime: "5-8 minutes",
      availability: "24/7",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: <StethoscopeIcon className="w-6 h-6" />,
      title: "Respiratory Emergency",
      description:
        "Critical respiratory care, oxygen therapy, and ventilator support",
      responseTime: "2-5 minutes",
      availability: "24/7",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: <AlertTriangleIcon className="w-6 h-6" />,
      title: "Neurological Emergency",
      description:
        "Stroke treatment, seizure management, and neurological critical care",
      responseTime: "4-8 minutes",
      availability: "24/7",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      title: "Poison Control",
      description:
        "Immediate treatment for poisoning, drug overdose, and toxic exposure",
      responseTime: "1-3 minutes",
      availability: "24/7",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
  ];

  const emergencyNumbers = [
    {
      number: "108",
      service: "Emergency Ambulance",
      description: "Free emergency ambulance service",
    },
    {
      number: "102",
      service: "Medical Emergency",
      description: "Direct medical emergency line",
    },
    {
      number: "1098",
      service: "Women Helpline",
      description: "Emergency support for women",
    },
    {
      number: "1091",
      service: "Police Emergency",
      description: "Police assistance for emergencies",
    },
  ];

  const hospitalFacilities = [
    "Advanced Life Support (ALS) Ambulances",
    "24/7 Emergency Department",
    "Trauma Center with Level 1 Certification",
    "Cardiac Care Unit (CCU)",
    "Intensive Care Unit (ICU)",
    "Pediatric Emergency Ward",
    "Maternity Emergency Services",
    "Burn Care Unit",
    "Poison Control Center",
    "Emergency Surgery Theaters",
    "Advanced Diagnostic Imaging",
    "Blood Bank & Transfusion Services",
    "Pharmacy (24/7)",
    "Emergency Laboratory Services",
    "Helipad for Air Ambulance",
  ];

  const emergencySteps = [
    {
      step: "01",
      title: "Call Emergency",
      description: "Dial 108 or our emergency hotline immediately",
      icon: <PhoneCallIcon className="w-8 h-8" />,
    },
    {
      step: "02",
      title: "Provide Details",
      description: "Give clear information about the emergency and location",
      icon: <MicIcon className="w-8 h-8" />,
    },
    {
      step: "03",
      title: "Ambulance Dispatch",
      description: "Our advanced ambulance will reach you within minutes",
      icon: <AmbulanceIcon className="w-8 h-8" />,
    },
    {
      step: "04",
      title: "Emergency Treatment",
      description: "Immediate medical care at our emergency department",
      icon: <StethoscopeIcon className="w-8 h-8" />,
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                <AlertTriangleIcon className="w-4 h-4 mr-2" />
                Emergency Services
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Emergency Care
                <span className="block text-red-200">
                  When Every Second Counts
                </span>
              </h1>
              <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
                Our state-of-the-art emergency department provides immediate,
                life-saving care for critical medical situations. Available 24/7
                with the fastest response times in Kashmir.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-red-700 hover:bg-red-50 text-lg px-8 py-4"
                  onClick={() => setIsModalOpen(true)}
                >
                  <PhoneIcon className="mr-2 h-5 w-5" />
                  Call Emergency Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
                >
                  <MapPinIcon className="mr-2 h-5 w-5" />
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Numbers */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Emergency Hotlines
              </h2>
              <p className="text-lg text-white">
                Save these numbers for immediate emergency response
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {emergencyNumbers.map((item, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      {item.number}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.service}
                    </h3>
                    <p className="text-white">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Services */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                Emergency Services
              </h2>
              <p className="text-lg text-white max-w-3xl mx-auto">
                Our comprehensive emergency services cover all critical medical
                situations with specialized teams and advanced equipment.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {emergencyServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center mb-4`}
                    >
                      <div className={service.color}>{service.icon}</div>
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white">
                          Response Time:
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          {service.responseTime}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white">
                          Availability:
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          {service.availability}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Process */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                Emergency Response Process
              </h2>
              <p className="text-lg text-white">
                Our streamlined emergency process ensures the fastest possible
                response and treatment.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {emergencySteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-red-600 text-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold">{step.step}</span>
                    </div>
                    <div className="w-12 h-12 bg-black border-4 border-red-600 rounded-full flex items-center justify-center mx-auto">
                      <div className="text-red-600">{step.icon}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hospital Facilities */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                Emergency Facilities
              </h2>
              <p className="text-lg text-white max-w-3xl mx-auto">
                Our emergency department is equipped with state-of-the-art
                facilities and staffed by experienced medical professionals.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitalFacilities.map((facility, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-black rounded-lg shadow-sm"
                >
                  <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-white">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Team */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                Emergency Medical Team
              </h2>
              <p className="text-lg text-white max-w-3xl mx-auto">
                Our emergency team consists of highly trained specialists ready
                to handle any medical emergency with expertise and compassion.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Emergency Physicians",
                  count: "15+",
                  description: "Board-certified emergency medicine specialists",
                },
                {
                  title: "Trauma Surgeons",
                  count: "8+",
                  description: "Expert surgeons for critical trauma cases",
                },
                {
                  title: "Cardiologists",
                  count: "12+",
                  description: "Heart specialists for cardiac emergencies",
                },
                {
                  title: "Pediatricians",
                  count: "10+",
                  description: "Specialized care for children and infants",
                },
              ].map((team, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {team.count}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {team.title}
                    </h3>
                    <p className="text-white">{team.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Contact Form Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Emergency Contact Form"
          className="w-full max-w-4xl"
        >
          <ContactForm
            onFormSubmit={handleFormSubmit}
            title="Emergency Contact Information"
            description="Please provide your details for emergency response coordination"
            showTitle={false}
          />
        </Modal>
      </div>
      <Footer />
    </>
  );
}
