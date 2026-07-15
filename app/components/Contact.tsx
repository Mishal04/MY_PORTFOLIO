'use client';

import { useState } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useReducedMotion } from '@/app/hooks/useReducedMotion';

const contactSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const prefersReducedMotion = useReducedMotion();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('idle');
    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setSubmitStatus('success');
      reset();
    } catch (err) {
      console.error('Contact form error:', err);
      setSubmitStatus('error');
    }
  };

  const fadeUp = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="pt-8 pb-16 md:pt-12 md:pb-24 relative bg-transparent"
      >
        <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center">

          <m.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-8 md:mb-10">
            <h2
              id="contact-heading"
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 md:mb-5 tracking-tight leading-tight"
            >
              Let&apos;s build <span className="text-indigo-400">something together.</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto font-light">
              I am currently available for new projects and collaborations. If you have an idea in mind, let&apos;s chat.
            </p>
          </m.div>

          <m.div
            {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } })}
            transition={{ duration: 0.8 }}
            className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-[1.5rem] shadow-2xl"
          >
            {/* Contact info */}
            <div className="flex flex-col gap-6 text-left">
              <div>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Email Me</p>
                <a
                  href="mailto:exoticmishaal9@gmail.com"
                  className="text-white text-base md:text-lg font-medium hover:text-indigo-400 transition-colors"
                >
                  exoticmishaal9@gmail.com
                </a>
              </div>
              <div>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Location</p>
                <p className="text-white text-base md:text-lg font-medium">Remote / Worldwide</p>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.linkedin.com/in/mishal-ashfaq-503237332/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect on LinkedIn"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-indigo-600 transition-all"
                >
                  <FaLinkedin size={18} aria-hidden="true" />
                </a>
                <a
                  href="https://www.instagram.com/_.mishal1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Instagram"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-purple-600 transition-all"
                >
                  <FaInstagram size={18} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
              aria-label="Contact form"
            >
              <div>
                <label htmlFor="contact-name" className="sr-only">Your Name</label>
                <input
                  id="contact-name"
                  {...register('name')}
                  placeholder="Your Name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-600"
                />
                {errors.name && (
                  <p id="contact-name-error" role="alert" className="text-red-400 text-[10px] mt-1 ml-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="sr-only">Your Email</label>
                <input
                  id="contact-email"
                  {...register('email')}
                  type="email"
                  placeholder="Your Email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-600"
                />
                {errors.email && (
                  <p id="contact-email-error" role="alert" className="text-red-400 text-[10px] mt-1 ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">Your Message</label>
                <textarea
                  id="contact-message"
                  {...register('message')}
                  placeholder="Tell me about your project"
                  rows={3}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-600 resize-none"
                />
                {errors.message && (
                  <p id="contact-message-error" role="alert" className="text-red-400 text-[10px] mt-1 ml-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {submitStatus === 'success' && (
                <p role="status" className="text-emerald-400 text-xs font-medium py-2 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  ✓ Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {submitStatus === 'error' && (
                <p role="alert" className="text-red-400 text-xs font-medium py-2 px-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  Could not send message. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 shadow-lg shadow-indigo-600/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default Contact;
