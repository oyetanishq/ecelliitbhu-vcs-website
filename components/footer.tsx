"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Linkedin, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-8">
          
          {/* Contact Us Section */}
          <div className="space-y-4">
            <h5 className="text-xl font-bold text-white mb-6">Contact Us</h5>
            
            <div className="space-y-3 text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <p className="text-sm leading-relaxed">
                  Indian Institute of Technology<br />
                  (Banaras Hindu University)<br />
                  Varanasi, India<br />
                  PIN: 221005
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <a 
                  href="mailto:ecell@iitbhu.ac.in" 
                  className="text-sm hover:text-orange-400 transition-colors"
                >
                  ecell@iitbhu.ac.in
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <p className="text-sm">+91 9120787959</p>
              </div>
            </div>
          </div>

          {/* Important Links Section */}
          <div className="space-y-4">
            <h5 className="text-xl font-bold text-white mb-6">Important</h5>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/" 
                    className="text-sm text-white/70 hover:text-orange-400 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/events" 
                    className="text-sm text-white/70 hover:text-orange-400 transition-colors"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://medium.com/ecelliitbhu/feature/home" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-orange-400 transition-colors"
                  >
                    Blogs
                  </a>
                </li>
                <li>
                  <a 
                    href="https://bit.ly/build-with-us-ecell"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-orange-400 transition-colors"
                  >
                    Initiatives
                  </a>
                </li>
                <li>
                  <Link 
                    href="/gallery" 
                    className="text-sm text-white/70 hover:text-orange-400 transition-colors"
                  >
                    Gallery
                  </Link>
                </li>
              </ul>

              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/who_we_are" 
                    className="text-sm text-white/70 hover:text-orange-400 transition-colors"
                  >
                    Who we are?
                  </Link>
                </li>
                <li>
                  <Link 
                    href="" 
                    className="text-sm text-white/70 hover:text-orange-400 transition-colors"
                  >
                    How E-Cell works
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/team" 
                    className="text-sm text-white/70 hover:text-orange-400 transition-colors"
                  >
                    Meet the team
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://tiiciitbhu.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-orange-400 transition-colors"
                  >
                    I-3 F
                  </a>
                </li>
                <li>
                  <Link 
                    href="/contacts" 
                    className="text-sm text-white/70 hover:text-orange-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h5 className="text-xl font-bold text-white mb-6">Stay Updated</h5>
            <iframe
              src="https://ecelliitbhu.substack.com/embed"
              className="w-full h-[190px] rounded-lg border border-white/10 bg-card/50"
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
              scrolling="no"
            ></iframe>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-8 border-t border-white/10">
          <a
            href="https://www.linkedin.com/company/ecelliitbhu/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 group"
          >
            <Linkedin className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </a>
          
          <a
            href="https://www.instagram.com/ecelliitbhu/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 group"
          >
            <Instagram className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </a>
          
          <a
            href="https://www.facebook.com/ecelliitvaranasi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 group"
          >
            <Facebook className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </a>
          
          <a
            href="https://twitter.com/ecelliitbhu"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 group"
          >
            <Twitter className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </a>
          
          <a
            href="https://www.youtube.com/channel/UCUme5nNmSKY1GiUBUhlAnOQ"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 group"
          >
            <Youtube className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </a>
          
          <a
            href="https://discord.com/invite/EPm5mfbCKP"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 group"
          >
            <FaDiscord className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-6 border-t border-white/10">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} E-Cell IIT BHU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
