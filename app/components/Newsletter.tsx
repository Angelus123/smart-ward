import { useForm } from 'react-hook-form';

type NewsletterData = {
  email: string;
};

export default function Newsletter() {
  const { register, handleSubmit, formState: { errors } } = useForm<NewsletterData>();

  const onSubmit = (data: NewsletterData) => {
    console.log(data); // Replace with API call (e.g., Mailchimp)
  };

  return (
    <section className="py-16 bg-gradient text-center">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-3xl font-bold text-white mb-5">Stay Updated</h2>
        <p className="text-white/80 max-w-md mx-auto mb-8">
          Subscribe to our newsletter for the latest security insights and product updates
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 p-4 border-none rounded-l-full font-poppins"
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
          />
          <button
            type="submit"
            className="bg-white text-light-blue font-semibold px-8 rounded-r-full hover:bg-background-light-secondary transition-all"
          >
            Subscribe
          </button>
        </form>
        {errors.email && <span className="text-red-500 text-sm mt-2">{errors.email.message}</span>}
      </div>
    </section>
  );
}