
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, BarChart3, Database, Trophy, Swords, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/predict", label: "Predictor", icon: BarChart3 },
    { path: "/live", label: "Live", icon: Radio },
    { path: "/fantasy", label: "Fantasy", icon: Trophy },
    { path: "/matchups", label: "Matchups", icon: Swords },
    { path: "/dataset", label: "Data", icon: Database },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            >
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <span className="text-xl font-bold gradient-text hidden md:inline-block">Cricket Pro</span>
          </Link>

          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar mask-gradient">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "px-3 md:px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors relative whitespace-nowrap",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                    <span className="text-sm font-medium relative z-10">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
