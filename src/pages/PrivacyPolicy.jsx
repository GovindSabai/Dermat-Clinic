import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Dermat Clinic</title>
      </Helmet>
      <section className="py-20 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-text-primary mb-8">Privacy Policy</h1>
          <div className="prose prose-lg dark:prose-invert text-text-secondary max-w-none">
            <p><strong>Effective Date:</strong> January 1, 2026</p>
            <p>At Dermat Clinic, we take your privacy and the security of your medical and personal information very seriously. This Privacy Policy outlines exactly how we collect, use, protect, and disclose your data when you use our website or visit our clinic.</p>
            
            <h2>1. Information We Collect</h2>
            <p>We only collect the information absolutely necessary to provide you with exceptional dermatological care. This includes:</p>
            <ul>
              <li><strong>Personal Identification Data:</strong> Full name, date of birth, gender, and government-issued ID for verification.</li>
              <li><strong>Contact Information:</strong> Email address, phone number, residential address, and emergency contact details.</li>
              <li><strong>Medical History:</strong> Past skin conditions, current medications, allergies, family medical history, and previous treatments.</li>
              <li><strong>Digital Interaction Data:</strong> IP address, browser type, and cookies collected when you browse our website to improve user experience.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>Your data is used strictly for the purpose of providing and improving our healthcare services:</p>
            <ul>
              <li>To accurately diagnose skin conditions and formulate personalized treatment plans.</li>
              <li>To schedule, confirm, or modify your appointments via SMS and Email.</li>
              <li>To process billing, insurance claims, and internal accounting.</li>
              <li>To send you critical post-treatment care instructions and follow-up reminders.</li>
              <li>To comply with local, state, and federal healthcare regulations and legal obligations.</li>
            </ul>

            <h2>3. Data Protection and Security</h2>
            <p>We implement robust, state-of-the-art security measures to ensure your data remains completely confidential:</p>
            <ul>
              <li>All digital patient records are stored on encrypted, HIPAA-compliant servers.</li>
              <li>Access to your medical data is strictly restricted to your attending dermatologist and essential medical staff.</li>
              <li>We use SSL (Secure Socket Layer) encryption for all online appointment requests and form submissions.</li>
              <li>Regular security audits and vulnerability assessments are conducted on our internal networks.</li>
            </ul>

            <h2>4. Third-Party Sharing</h2>
            <p>We will <strong>never</strong> sell or rent your personal data to third-party marketers. We may only share your information with:</p>
            <ul>
              <li>Specialized medical laboratories (for biopsies or blood tests) directly related to your care.</li>
              <li>Your health insurance provider for the sole purpose of processing claims.</li>
              <li>Legal authorities, only if strictly required by a court order or law enforcement request.</li>
            </ul>

            <h2>5. Your Rights and Choices</h2>
            <p>As a patient, you retain full control over your personal data:</p>
            <ul>
              <li><strong>Right to Access:</strong> You may request a full copy of your medical records at any time.</li>
              <li><strong>Right to Correction:</strong> You can ask us to update or fix any inaccurate information in your file.</li>
              <li><strong>Right to Deletion:</strong> You may request the deletion of your non-essential digital footprint from our servers (subject to medical retention laws).</li>
              <li><strong>Opt-Out:</strong> You can easily opt out of any promotional clinic newsletters or non-critical communications.</li>
            </ul>
            
            <p className="mt-8 text-sm">If you have any questions regarding this Privacy Policy, please contact our Data Protection Officer at <strong>privacy@dermatclinic.demo</strong>.</p>
          </div>
        </div>
      </section>
    </>
  );
};
