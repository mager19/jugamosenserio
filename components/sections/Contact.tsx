"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, EnvelopeSimple, MapPin, Target } from "@phosphor-icons/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { staggerContainer, fadeUp } from "@/lib/animations";
import content from "@/data/content.json";

export function Contact() {
  const { contact, site } = content;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ nombre: "", empresa: "", email: "", mensaje: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${contact.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ nombre: "", empresa: "", email: "", mensaje: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="min-h-[80dvh] overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid md:grid-cols-[55fr_45fr] min-h-[80dvh]">
        {/* Left: copy */}
        <div className="bg-primary flex flex-col justify-center px-8 md:px-16 md:pl-20 py-16 md:py-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            style={{ position: "relative" }}
          >
            {/* Decoración: target — naranja paleta */}
            <div className="hidden md:block pointer-events-none absolute -right-8 -top-8 opacity-[0.18] select-none" style={{ color: "#E8694A" }}>
              <Target size={240} weight="fill" />
            </div>
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center bg-white/10 text-tertiary text-xs font-semibold px-3 py-1.5 rounded-full tracking-widest uppercase mb-6"
            >
              {contact.eyebrow}
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-extrabold text-[clamp(2.5rem,5vw,4rem)] tracking-tighter leading-tight text-white mb-6"
            >
              {contact.headline}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-blue-200/80 text-lg leading-relaxed mb-10">
              {contact.body}
            </motion.p>

            {/* Trust items */}
            <motion.div variants={staggerContainer} className="flex flex-col gap-4 mb-10">
              {contact.trust.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-3">
                  <CheckCircle size={22} weight="fill" className="text-tertiary shrink-0" />
                  <span className="text-white text-sm">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-2 text-sm text-blue-300">
              <div className="flex items-center gap-2">
                <EnvelopeSimple size={16} />
                <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">
                  {site.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{site.cities}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: formulario */}
        <div className="bg-white flex flex-col justify-center px-8 md:px-14 py-16 md:py-24">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-12"
              >
                <CheckCircle size={64} weight="fill" className="text-primary mb-6" />
                <p className="text-xl font-bold text-[#1A1A18] mb-3">¡Mensaje recibido!</p>
                <p className="text-neutral-500 leading-relaxed max-w-sm">
                  {contact.form.success}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                {contact.form.fields.map((field) => (
                  <div key={field.name} className="flex flex-col gap-1.5">
                    <label
                      htmlFor={field.name}
                      className="text-xs font-semibold uppercase tracking-wider text-[#1A1A18]"
                    >
                      {field.label}
                      {field.required && <span className="text-secondary ml-1">*</span>}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows={field.rows || 4}
                        placeholder={field.placeholder}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleChange}
                        required={field.required}
                        className="border-0 border-b-2 border-neutral-200 focus:border-primary bg-transparent py-3 text-base outline-none transition-colors resize-none text-[#1A1A18] placeholder:text-neutral-400"
                      />
                    ) : (
                      <input
                        id={field.name}
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleChange}
                        required={field.required}
                        className="border-0 border-b-2 border-neutral-200 focus:border-primary bg-transparent py-3 text-base outline-none transition-colors text-[#1A1A18] placeholder:text-neutral-400"
                      />
                    )}
                  </div>
                ))}

                {status === "error" && (
                  <p className="text-secondary text-sm">
                    Hubo un error. Intenta de nuevo o escríbenos directamente.
                  </p>
                )}

                <MagneticButton
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-secondary text-white font-bold py-4 rounded-lg hover:bg-secondary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
                >
                  {status === "loading" ? "Enviando..." : contact.form.cta}
                  {status !== "loading" && <ArrowRight size={18} weight="bold" />}
                </MagneticButton>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
