import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Category } from '@/data/products';

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export const CategoryCard = ({ category, index = 0 }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/category/${category.id}`}>
        <div className="group relative overflow-hidden rounded-2xl bg-card shadow-card card-hover border aspect-square">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          </div>

          {/* Icon Badge */}
          {/* <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
            {category.icon}
          </div> */}

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-bold text-background mb-1">{category.name}</h3>
            <p className="text-sm text-background/80">{category.subcategories.length} subcategories</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
