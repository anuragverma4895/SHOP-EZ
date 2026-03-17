import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Jennings',
        role: 'Verified Buyer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        content: 'ShopEZ completely transformed my online shopping experience. The delivery was lightning fast and the product quality exceeded my expectations. Highly recommended!',
        rating: 5,
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Tech Enthusiast',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        content: 'I was looking for a specific laptop and ShopEZ had the best price by far. Their customer service is responsive and the checkout process is seamless.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Emily Davis',
        role: 'Fashion Blogger',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        content: 'The variety of fashion items available here is astonishing. I love the AI recommendations, they always suggest exactly what I am looking for.',
        rating: 4,
    }
];

const CustomerReviews = () => {
    return (
        <section className="py-20 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Don't just take our word for it. Read honest reviews from our verified buyers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-900/5 relative"
                        >
                            <Quote className="absolute top-6 right-6 w-10 h-10 text-blue-100" />
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700 italic mb-8 relative z-10">"{testimonial.content}"</p>

                            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerReviews;
