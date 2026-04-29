'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            const { db } = await import("@/lib/firebase");
            const { collection, addDoc } = await import("firebase/firestore");
            
            // Save to Firestore (Free Plan)
            await addDoc(collection(db, "messages"), data);

            alert("Message received! I'll see it in my dashboard database.");
            reset();
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Could not send message. Please try again.");
        }
    };

    return (
        <section id="contact" className="pt-8 pb-16 md:pt-12 md:pb-24 relative bg-transparent">
            <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 md:mb-10"
                >
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight leading-tight">
                        Let's build <span className="text-indigo-400">something together.</span>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto font-light">
                        I am currently available for new projects and collaborations. If you have an idea in mind, let's chat.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-[1.5rem] shadow-2xl"
                >
                    {/* INFO */}
                    <div className="flex flex-col gap-6 text-left">
                        <div>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Email Me</p>
                            <a href="mailto:exoticmishaal9@gmail.com" className="text-white text-base md:text-lg font-medium hover:text-indigo-400 transition-colors">
                                exoticmishaal9@gmail.com
                            </a>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Location</p>
                            <p className="text-white text-base md:text-lg font-medium">Remote / Worldwide</p>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <a href="https://www.linkedin.com/in/mishal-ashfaq-503237332/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-indigo-600 transition-all cursor-pointer"><FaLinkedin size={18} /></a>
                            <a href="https://www.instagram.com/_mishal1/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-purple-600 transition-all cursor-pointer"><FaInstagram size={18} /></a>
                        </div>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <input
                                {...register('name')}
                                placeholder="Your Name"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-600"
                            />
                            {errors.name && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <input
                                {...register('email')}
                                placeholder="Your Email"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-600"
                            />
                            {errors.email && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <textarea
                                {...register('message')}
                                placeholder="Tell me about your project"
                                rows={3}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-600 resize-none"
                            />
                            {errors.message && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.message.message}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 shadow-lg shadow-indigo-600/20"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
