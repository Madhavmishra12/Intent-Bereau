import { useState } from 'react';
import type { FormEvent } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2, Mail } from 'lucide-react';
import { BrandGlyph } from './BrandGlyph';

interface FormValues {
  name: string;
  email: string;
  business: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  business?: string;
  message?: string;
  general?: string;
}

const INITIAL_VALUES: FormValues = { name: '', email: '', business: '', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const CONTACT_EMAIL = 'info@intentbureau.club';

export function Contact() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState<{ name: string; email: string } | null>(null);

  function validate(current: FormValues): FormErrors {
    const nextErrors: FormErrors = {};
    if (current.name.trim().length < 2) nextErrors.name = 'Please enter your name.';
    if (!EMAIL_PATTERN.test(current.email.trim())) nextErrors.email = 'Please enter a valid email address.';
    if (current.business.trim().length < 2) nextErrors.business = 'Please share your business name or website.';
    if (current.message.trim().length < 10) nextErrors.message = 'Please add a little more detail (at least 10 characters).';
    return nextErrors;
  }

  function handleChange(field: keyof FormValues, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    if (errors[field] || errors.general) {
      setErrors((previous) => {
        const updated = { ...previous };
        delete updated[field];
        delete updated.general;
        return updated;
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clientErrors = validate(values);
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      const firstInvalid = (['name', 'email', 'business', 'message'] as const).find((key) => clientErrors[key]);
      if (firstInvalid) document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    try {
      const submission = {
        name: values.name.trim(),
        email: values.email.trim(),
        business: values.business.trim(),
        message: values.message.trim(),
      };

      if (import.meta.env.VITE_CONTACT_PROVIDER === 'netlify') {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ 'form-name': 'discovery-call', 'bot-field': '', ...submission }).toString(),
        });
        if (!response.ok) throw new Error('Netlify Forms submission failed.');
      } else {
        const response = await fetch('/api/discovery-call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(submission),
        });
        const data = (await response.json().catch(() => null)) as { ok?: boolean; error?: string; fieldErrors?: FormErrors } | null;
        if (!response.ok || !data?.ok) {
          setErrors({ ...(data?.fieldErrors ?? {}), general: data?.error ?? `Your request could not be delivered. Email ${CONTACT_EMAIL} directly.` });
          return;
        }
      }
      setSubmittedDetails({ name: values.name.trim(), email: values.email.trim() });
      setValues(INITIAL_VALUES);
    } catch {
      setErrors({ general: `Your request could not be sent. Please try again or email ${CONTACT_EMAIL} directly.` });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="contact-section section-pad">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:items-start lg:gap-20 lg:px-12">
        <div className="contact-copy">
          <div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Your next chapter starts here</div>
          <h2 className="section-title section-title-light mt-5">Let’s make<br /><span>something matter.</span></h2>
          <p className="mt-6 max-w-md text-base leading-7 text-white/65 sm:text-lg">Tell us what you have in mind. Whether it’s an app, an AI idea, or a whole new digital experience, we’d love to hear about it.</p>
          <div className="contact-direct mt-9">
            <span className="contact-direct-icon"><Mail size={18} aria-hidden="true" /></span>
            <div><small>Prefer email?</small><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
            <ArrowUpRight size={16} className="ml-auto text-white/40" aria-hidden="true" />
          </div>
          <div className="contact-location mt-8"><span className="status-dot" /> New Delhi, India <span className="contact-dot-sep">·</span> Working everywhere</div>
        </div>

        <div className="contact-form-card">
          {submittedDetails ? (
            <div role="status" aria-live="polite" className="success-state">
              <span className="success-icon"><CheckCircle2 size={26} aria-hidden="true" /></span>
              <h3>We’ve got your note, {submittedDetails.name}.</h3>
              <p>Thanks for reaching out. We’ll follow up at <b>{submittedDetails.email}</b> to talk through your idea and next steps.</p>
              <button type="button" onClick={() => setSubmittedDetails(null)} className="text-link mt-6">Send another message <ArrowUpRight size={15} /></button>
            </div>
          ) : (
            <form name="discovery-call" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit} noValidate className="contact-form">
              <input type="hidden" name="form-name" value="discovery-call" />
              <p className="sr-only" aria-hidden="true"><label>Leave this field empty: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
              <div className="form-heading"><div><span className="form-kicker">PROJECT ENQUIRY</span><h3>Tell us a little about it.</h3></div><span className="form-step">01 <i>/ 01</i></span></div>

              {errors.general && <div role="alert" className="form-alert"><AlertCircle size={18} aria-hidden="true" /><div><p>{errors.general}</p><a href={`mailto:${CONTACT_EMAIL}`}>Email us directly</a></div></div>}

              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="contact-name">Your name</label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" required value={values.name} onChange={(event) => handleChange('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} placeholder="Jane Smith" />
                  {errors.name && <p id="contact-name-error" className="field-error"><AlertCircle size={14} />{errors.name}</p>}
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email">Work email</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required value={values.email} onChange={(event) => handleChange('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} placeholder="jane@company.com" />
                  {errors.email && <p id="contact-email-error" className="field-error"><AlertCircle size={14} />{errors.email}</p>}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="contact-business">Company or project</label>
                <input id="contact-business" name="business" type="text" autoComplete="organization" required value={values.business} onChange={(event) => handleChange('business', event.target.value)} aria-invalid={Boolean(errors.business)} aria-describedby={errors.business ? 'contact-business-error' : undefined} placeholder="Your company or idea" />
                {errors.business && <p id="contact-business-error" className="field-error"><AlertCircle size={14} />{errors.business}</p>}
              </div>

              <div className="form-field">
                <label htmlFor="contact-message">What would you like to build?</label>
                <textarea id="contact-message" name="message" rows={4} required value={values.message} onChange={(event) => handleChange('message', event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} placeholder="A mobile app, a voice agent, a fresh website… Tell us what you’re imagining." />
                {errors.message && <p id="contact-message-error" className="field-error"><AlertCircle size={14} />{errors.message}</p>}
              </div>

              <div className="form-submit-row"><p>We’ll reply personally within two business days.</p><button type="submit" disabled={isSubmitting} className="button button-dark"><BrandGlyph variant="button" /> {isSubmitting ? 'Sending…' : 'Send your brief'} <ArrowUpRight size={17} aria-hidden="true" /></button></div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
