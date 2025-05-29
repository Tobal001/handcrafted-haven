
// src/app/contact/page.tsx

// src/app/contact/page.tsx
'use client';

import { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-serif text-amber-900 mb-8 border-b border-amber-200 pb-4">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-serif text-amber-800 mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-amber-800 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-amber-200 py-2 px-3 focus:border-amber-500 focus:ring-amber-500 bg-amber-50"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-amber-200 py-2 px-3 focus:border-amber-500 focus:ring-amber-500 bg-amber-50"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-amber-800 mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-amber-200 py-2 px-3 focus:border-amber-500 focus:ring-amber-500 bg-amber-50"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-amber-50 rounded-lg p-6">
          <h2 className="text-2xl font-serif text-amber-800 mb-6">Contact Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <EnvelopeIcon className="h-6 w-6 text-amber-600 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-amber-900">Email</h3>
                <p className="text-amber-700">contact@handcraftedhaven.com</p>
                <p className="text-amber-700">support@handcraftedhaven.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <PhoneIcon className="h-6 w-6 text-amber-600 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-amber-900">Phone</h3>
                <p className="text-amber-700">+1 (555) 123-4567</p>
                <p className="text-amber-700">Mon-Fri: 9am-5pm EST</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPinIcon className="h-6 w-6 text-amber-600 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-amber-900">Studio Location</h3>
                <p className="text-amber-700">123 Artisan Way</p>
                <p className="text-amber-700">Craftsville, CV 12345</p>
                <p className="text-amber-700">United States</p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-medium text-amber-900 mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'Pinterest'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="text-amber-600 hover:text-amber-800 transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-serif text-amber-800 mb-4">Visit Our Studio</h2>
        <div className="aspect-w-16 aspect-h-9 bg-amber-200 rounded-md">
          {/* Map placeholder - replace with actual map component */}
          <div className="h-64 w-full flex items-center justify-center text-amber-700">
            Map would display here
          </div>
        </div>
        <p className="text-amber-700 mt-4">
          Our studio is open to visitors by appointment. Please contact us to schedule a visit.
        </p>
      </div>
    </div>
  );
}