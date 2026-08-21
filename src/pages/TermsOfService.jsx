import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms of Service | Dermat Clinic</title>
      </Helmet>
      <section className="py-20 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text-primary mb-8">Terms of Service</h1>
          <div className="prose prose-lg dark:prose-invert text-text-secondary max-w-none">
            <p><strong>Effective Date:</strong> January 1, 2026</p>
            <p>Welcome to Dermat Clinic. By accessing our website, booking an appointment, or utilizing our services, you expressly agree to comply with and be bound by the following Terms of Service. Please read them carefully.</p>
            
            <h2>1. Medical Disclaimer and Use of Website</h2>
            <p>The content provided on this website is intended solely for general informational and educational purposes.</p>
            <ul>
              <li><strong>Not Medical Advice:</strong> Information found on this site should never substitute for professional medical advice, diagnosis, or treatment by a qualified healthcare provider.</li>
              <li><strong>No Doctor-Patient Relationship:</strong> Browsing this website or submitting a contact form does not instantly establish a formal doctor-patient relationship.</li>
              <li><strong>Emergency Situations:</strong> If you are experiencing a severe allergic reaction, sudden skin infection, or medical emergency, do not rely on this website. Please call emergency services immediately.</li>
            </ul>

            <h2>2. Appointments and Cancellation Policy</h2>
            <p>We strive to provide efficient scheduling for all our patients. To help us maintain this standard, you agree to the following:</p>
            <ul>
              <li><strong>Accurate Information:</strong> You agree to provide true, accurate, and complete information when booking an appointment.</li>
              <li><strong>Arrival Time:</strong> Patients are expected to arrive at least 10 minutes prior to their scheduled consultation to complete any necessary paperwork.</li>
              <li><strong>24-Hour Notice:</strong> If you need to cancel or reschedule, you must provide at least 24 hours advance notice.</li>
              <li><strong>No-Show Policy:</strong> Failure to show up for an appointment without prior notice may result in a cancellation fee applied to your next visit.</li>
            </ul>

            <h2>3. Treatment Outcomes and Guarantees</h2>
            <p>Dermatology is a complex medical science, and human bodies react differently to treatments.</p>
            <ul>
              <li><strong>No Absolute Guarantees:</strong> While our dermatologists use evidence-based protocols, we cannot guarantee 100% success or specific outcomes for any treatment, procedure, or product.</li>
              <li><strong>Varying Results:</strong> Before-and-after photos displayed on this site represent specific individuals; your personal results may vary significantly based on genetics, lifestyle, and adherence to aftercare.</li>
              <li><strong>Side Effects:</strong> All medical and cosmetic procedures carry some level of risk. Your doctor will discuss potential side effects prior to any treatment, and you must sign an informed consent form.</li>
            </ul>

            <h2>4. Payment and Billing</h2>
            <p>Clear financial agreements are necessary for a smooth clinic experience:</p>
            <ul>
              <li><strong>Payment Due:</strong> Payment is expected in full at the time services are rendered unless prior financing arrangements have been made.</li>
              <li><strong>Insurance:</strong> We accept most major insurance plans. However, it is your responsibility to verify coverage and pay any co-pays, deductibles, or non-covered services out of pocket.</li>
              <li><strong>Estimates:</strong> We provide cost estimates for cosmetic procedures prior to treatment, but unforeseen medical complexities may alter the final cost.</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>All content on this website is the exclusive property of Dermat Clinic.</p>
            <ul>
              <li>You may not reproduce, distribute, or use our logos, text, or before-and-after photography without our explicit written consent.</li>
              <li>Any unauthorized use of our intellectual property may result in legal action.</li>
            </ul>

            <p className="mt-8 text-sm">We reserve the right to update or modify these Terms of Service at any time without prior notice. Continued use of our services constitutes acceptance of the revised terms.</p>
          </div>
        </div>
      </section>
    </>
  );
};
