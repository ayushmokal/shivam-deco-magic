import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Flower, LeafyGreen, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();
  
  const { data: heroImages } = useQuery({
    queryKey: ['hero-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_images')
        .select('*')
        .order('position');
      
      if (error) throw error;
      return data;
    }
  });

  const mainImage = heroImages?.find(img => img.position === 'main')?.url;
  const leftImage = heroImages?.find(img => img.position === 'left')?.url;
  const rightImage = heroImages?.find(img => img.position === 'right')?.url;

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-accent-cream px-4 py-12 md:py-0">
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: 0.2, rotate: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-20 left-10 hidden md:block"
      >
        <LeafyGreen className="w-12 md:w-16 h-12 md:h-16 text-primary/30" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: 45 }}
        animate={{ opacity: 0.2, rotate: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute bottom-20 right-10 hidden md:block"
      >
        <Flower className="w-12 md:w-16 h-12 md:h-16 text-primary/30" />
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 1,
            type: "spring",
            bounce: 0.4
          }}
          className="text-center md:text-left z-10 md:w-1/2"
        >
          <motion.h1 
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-dark mb-4 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We create
            <br />
            <motion.span 
              className="text-primary"
              initial={{ scale: 1 }}
              animate={{ 
                scale: [1, 1.1, 1],
                color: ["#8B7355", "#A89078", "#8B7355"]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              Beautiful
            </motion.span>
            <br />
            moments for
            <br />
            you
          </motion.h1>
          
          <motion.p 
            className="font-sans text-base md:text-lg lg:text-xl text-primary/70 mb-8 font-light max-w-lg mx-auto md:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Floral Designer, Wedding Planner, and Event Enthusiast who creates memorable moments for special occasions.
          </motion.p>
          
          <motion.button 
            className="bg-primary hover:bg-primary-dark text-white px-6 md:px-8 py-3 rounded-md transition-all font-sans text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            onClick={() => navigate('/contact')}
          >
            Get in touch
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 1,
            type: "spring",
            bounce: 0.4,
            delay: 0.2 
          }}
          className="relative w-full md:w-1/2 h-[400px] md:h-[600px]"
        >
          {/* Main large image */}
          {mainImage && (
            <motion.img
              src={mainImage}
              alt="Floral Designer with Bouquet"
              className="absolute right-0 top-0 w-[80%] sm:w-[90%] h-[300px] md:h-auto rounded-lg shadow-xl z-10 object-cover"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          )}
          
          {/* Left overlapping smaller image */}
          {leftImage && (
            <motion.img
              src={leftImage}
              alt="Floral Decoration"
              className="absolute left-0 top-[40%] w-[35%] h-[150px] md:h-auto rounded-lg shadow-xl z-20 object-cover"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          )}
          
          {/* Right overlapping medium image */}
          {rightImage && (
            <motion.img
              src={rightImage}
              alt="Wedding Venue Setup"
              className="absolute right-0 bottom-[5%] w-[45%] h-[150px] md:h-auto rounded-lg shadow-xl z-30 object-cover"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          )}
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent-cream/50 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
    </div>
  );
};