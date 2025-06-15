import { useEffect, useRef } from "preact/hooks";

/**
 * Background component with optimized blurred circle effects
 * Creates a stunning visual background with performance-optimized animations
 */
export default function Background() {
  const backCircleRef = useRef<HTMLDivElement>(null);
  const midCircleRef = useRef<HTMLDivElement>(null);
  const frontCircleRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Performance-optimized animation using requestAnimationFrame
  useEffect(() => {
    const animate = () => {
      const time = Date.now() * 0.001; // Convert to seconds
      
      // Back circle animation - slowest, largest movement (background layer)
      if (backCircleRef.current) {
        const x = Math.sin(time * 0.15) * 50;
        const y = Math.cos(time * 0.2) * 40;
        const scale = 1 + Math.sin(time * 0.25) * 0.08;
        const opacity = 0.2 + Math.sin(time * 0.3) * 0.05;
        
        backCircleRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        backCircleRef.current.style.opacity = opacity.toString();
      }
      
      // Middle circle animation - medium speed (middle layer)
      if (midCircleRef.current) {
        const x = Math.cos(time * 0.3) * 35;
        const y = Math.sin(time * 0.35) * 25;
        const scale = 1 + Math.cos(time * 0.4) * 0.15;
        const opacity = 0.3 + Math.sin(time * 0.5) * 0.1;
        
        midCircleRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        midCircleRef.current.style.opacity = opacity.toString();
      }
      
      // Front circle animation - fastest, smallest movement (foreground layer)
      if (frontCircleRef.current) {
        const x = Math.cos(time * 0.5) * 25;
        const y = Math.sin(time * 0.4) * 30;
        const scale = 1 + Math.cos(time * 0.6) * 0.2;
        const opacity = 0.35 + Math.cos(time * 0.7) * 0.15;
        
        frontCircleRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        frontCircleRef.current.style.opacity = opacity.toString();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Background layer - largest purple circle */}
      <div
        ref={backCircleRef}
        className="absolute rounded-full pointer-events-none will-change-transform"
        style={{
          width: "min(700px, 80vw)",
          height: "min(700px, 80vw)",
          background: "linear-gradient(135deg, #8b5cf6, #a855f7, #c084fc)",
          top: "0%",
          left: "-18%",
          opacity: 0.4,
          zIndex: -3,
        }}
      />
      
      {/* Middle layer - medium teal circle */}
      <div
        ref={midCircleRef}
        className="absolute rounded-full pointer-events-none will-change-transform"
        style={{
          width: "min(520px, 60vw)",
          height: "min(520px, 60vw)",
          background: "linear-gradient(135deg, #06b6d4, #0891b2, #67e8f9)",
          top: "30%",
          right: "15%",
          opacity: 0.5,
          zIndex: -2,
        }}
      />
      
      {/* Foreground layer - medium blue circle */}
      <div
        ref={frontCircleRef}
        className="absolute rounded-full pointer-events-none will-change-transform"
        style={{
          width: "min(450px, 40vw)",
          height: "min(450px, 40vw)",
          background: "linear-gradient(135deg, #3b82f6, #1d4ed8, #60a5fa)",
          bottom: "5%",
          right: "-10%",
          opacity: 0.55,
          zIndex: -1,
        }}
      />
      
      {/* Blur overlay - applies backdrop-filter to blur all circles behind it */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          backdropFilter: "blur(100px)",
          WebkitBackdropFilter: "blur(100px)",
          zIndex: 0,
        }}
      />
    </div>
  );
}
