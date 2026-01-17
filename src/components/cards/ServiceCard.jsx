import Link from 'next/link';

const ServiceCard = ({ service, featured = false }) => {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`border border-white/40 bg-black/50 p-6 hover:bg-white hover:text-black hover:border-black hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 group flex flex-col justify-between ${
        featured ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
    >
      <div className="mb-4">
        <div className="text-sm group-hover:opacity-70 mb-2 tracking-wider transition-colors">
          {service.category.toUpperCase()}
        </div>
        <h3 className={`font-bold mb-3 group-hover:text-black transition-colors ${
          featured ? 'text-2xl' : 'text-xl'
        }`}>
          {service.name}
        </h3>
        <p className={`group-hover:opacity-70 leading-relaxed transition-colors ${
          featured ? 'line-clamp-3' : 'line-clamp-2'
        }`}>
          {service.description}
        </p>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-white/20 group-hover:border-white/40 transition-colors">
        <span className={`font-bold group-hover:text-black transition-colors ${
          featured ? 'text-3xl' : 'text-2xl'
        }`}>
          ${service.price.toLocaleString()}
        </span>
        <span className="group-hover:opacity-70 text-sm transition-all group-hover:translate-x-1">
          {'>'} LEARN_MORE
        </span>
      </div>
    </Link>
  );
};

export default ServiceCard;
