import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 20,
          duration: 15 + Math.random() * 15,
          size: 2 + Math.random() * 4,
          opacity: 0.1 + Math.random() * 0.4,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
            animation: `particle-float ${particle.duration}s linear ${particle.delay}s infinite`,
            boxShadow: `0 0 ${particle.size * 3}px hsl(var(--primary) / 0.5)`,
          }}
        />
      ))}
      {/* Larger glowing orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full animate-float-slow"
        style={{
          background: `radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />
      <div 
        className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full animate-float-delayed"
        style={{
          background: `radial-gradient(circle, hsl(var(--secondary) / 0.1) 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
      <div 
        className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full animate-float"
        style={{
          background: `radial-gradient(circle, hsl(var(--accent) / 0.12) 0%, transparent 70%)`,
          filter: 'blur(30px)',
        }}
      />
    </div>
  );
};

export default FloatingParticles;
