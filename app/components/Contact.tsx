import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data); // Replace with API call (e.g., /api/contact)
  };

  return (
    <section className="py-24 bg-background-light">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-blue to-accent-blue bg-clip-text text-transparent mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-text-gray max-w-xl mx-auto">
            Have questions? Our team is ready to assist you
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            {[
              { icon: 'fas fa-phone-alt', title: 'Phone', content: '+250 788 989 873' },
              { icon: 'fas fa-envelope', title: 'Email', content: 'support@shieldsync.rw' },
              { icon: 'fas fa-map-marker-alt', title: 'Office', content: 'KG 7 Ave, Kigali Heights<br>Kigali, Rwanda' },
              { icon: 'fas fa-clock', title: 'Working Hours', content: 'Monday - Friday: 8AM - 6PM<br>Saturday: 9AM - 1PM' },
            ].map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-light-blue rounded-full flex items-center justify-center text-white text-xl">
                  <i className={item.icon}></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-blue mb-1">{item.title}</h3>
                  <p className="text-text-gray" dangerouslySetInnerHTML={{ __html: item.content }}></p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 bg-white border border-border-light rounded-lg text-text-dark focus:outline-none focus:border-light-blue focus:ring-2 focus:ring-light-blue/20"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 bg-white border border-border-light rounded-lg text-text-dark focus:outline-none focus:border-light-blue focus:ring-2 focus:ring-light-blue/20"
                  {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full p-4 bg-white border border-border-light rounded-lg text-text-dark focus:outline-none focus:border-light-blue focus:ring-2 focus:ring-light-blue/20"
                  {...register('subject')}
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  className="w-full p-4 bg-white border border-border-light rounded-lg text-text-dark focus:outline-none focus:border-light-blue focus:ring-2 focus:ring-light-blue/20 resize-y h-36"
                  {...register('message', { required: 'Message is required' })}
                ></textarea>
                {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
              </div>
              <button
                type="submit"
                className="bg-gradient text-white font-semibold py-3 px-8 rounded-full hover:bg-gradient-to-r hover:from-highlight hover:to-accent-blue hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(74,154,249,0.3)] transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}