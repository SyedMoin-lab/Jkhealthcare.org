import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { route } from "@/common/config/route";

export function Footer() {
  const whatsappMessage = encodeURIComponent(
    "Hello JKHealthcare team! I'm interested in speaking with the AI health assistant."
  );
  const whatsappHref = `https://wa.me/919682577299?text=${whatsappMessage}`;

  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-xl text-foreground">jkhealthcare.org</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner in finding the best healthcare services
              across Kashmir Valley. We connect you with top-rated doctors,
              diagnostic centers, and labs for better health outcomes.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1PtoZ4GHS1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <a
                href="https://www.instagram.com/jkhealthcare.org2025?igsh=MW0xM29hb3F5Nm1ndA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-5 h-5"
                >
                  <path
                    fill="currentColor"
                    d="M4.868 43.303 7.562 33.468C5.9 30.59 5.026 27.324 5.027 23.979 5.032 13.514 13.548 5 24.014 5c5.079.002 9.845 1.979 13.43 5.566 3.584 3.588 5.558 8.356 5.556 13.428-.004 10.465-8.522 18.98-18.986 18.98h-.008c-3.177-.001-6.3-.798-9.073-2.311l-10.065 2.64z"
                  />
                  <path
                    fill="currentColor"
                    d="M35.176 12.832c-2.98-2.982-6.941-4.625-11.157-4.626-8.704 0-15.783 7.076-15.787 15.774-.001 2.981.833 5.883 2.413 8.396l.376.597-1.595 5.821 5.973-1.566.577.342c2.422 1.438 5.2 2.198 8.032 2.199h.006c8.698 0 15.777-7.077 15.78-15.776-.002-4.215-1.641-8.179-4.618-11.161z"
                  />
                  <path
                    fill="#fff"
                    d="m19.268 16.045-.328-.762-.018-.017c-.225-.23-.481-.251-.777-.262-.277-.012-.594-.011-.91-.011-.316 0-.83.119-1.265.594-.435.475-1.661 1.622-1.661 3.956 0 2.334 1.7 4.59 1.937 4.906.237.316 3.282 5.259 8.104 7.161 4.007 1.58 4.823 1.266 5.693 1.187.87-.079 2.807-1.147 3.202-2.255.395-1.108.395-2.057.277-2.255-.119-.198-.435-.316-.909-.554s-2.807-1.385-3.242-1.543c-.435-.158-.751-.237-1.068.238-.316.474-1.225 1.543-1.502 1.859-.277.316-.554.357-1.028.119-.474-.238-2.002-.738-3.815-2.354-1.41-1.257-2.362-2.81-2.639-3.285-.277-.474-.03-.731.208-.968.213-.213.474-.554.712-.831.237-.277.316-.475.474-.791.158-.317.079-.594-.04-.831-.241-.484-1.163-2.83-1.585-3.768z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg text-foreground">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={route.findCenters.path}
                  className="hover:text-primary transition-colors"
                >
                  Find Centers
                </a>
              </li>
              <li>
                <a
                  href={route.doctors.path}
                  className="hover:text-primary transition-colors"
                >
                  Doctors
                </a>
              </li>
              <li>
                <a
                  href={route.labTests.path}
                  className="hover:text-primary transition-colors"
                >
                  Lab Tests
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  AI Features
                </a>
              </li>
              <li>
                <a
                  href={route.emergencyCare.path}
                  className="hover:text-primary transition-colors"
                >
                  Emergency Care
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Health Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={route.about.path}
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href={route.privacyPolicy.path}
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href={route.termsOfService.path}
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg text-foreground">Contact Us</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 9682577299</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@jkhealthcare.org</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>
                  Down town, sopore opposite Hassan Motors,petrol pump -193201
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-foreground font-semibold">
              jkhealthcare.org
            </span>
            . All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a
              href={route.privacyPolicy.path}
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href={route.termsOfService.path}
              className="hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
