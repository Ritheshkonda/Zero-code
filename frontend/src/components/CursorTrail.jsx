import { useState, useEffect, useRef } from 'react';

export default function CursorTrail() {
  const [trail, setTrail] = useState([]);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y);
      
      // Only add a point if the mouse moved significantly to prevent "stuck dots" clusters
      if (dist > 10) {
        const newPoint = { x: e.clientX, y: e.clientY, id: Math.random() };
        setTrail((prev) => [...prev.slice(-10), newPoint]);
        lastPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const cleanup = setInterval(() => {
      setTrail((prev) => prev.length > 0 ? prev.slice(1) : prev);
    }, 80); // Slowly fade out the trail even if mouse stops

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanup);
    };
  }, []);

  return (
    <div className="cursor-trail-container">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="cursor-trail-particle"
          style={{
            left: point.x,
            top: point.y,
            opacity: (index + 1) / (trail.length + 1),
            transform: `scale(${(index + 1) / (trail.length + 1)}) translate(-50%, -50%)`,
          }}
        />
      ))}
    </div>
  );
}
