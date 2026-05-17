"use client";

import * as React from "react";

interface ProjectData {
  number: string;
  title: string;
  image: string;
  category: string;
  year: string;
  description: string;
}

const DATA_BY_ROLE: Record<string, ProjectData[]> = {
  Controladores: [
    { number: "01", title: "Controlador", image: "/agentes/controladores/brimstone.jpg",  category: "Brimstone", year: "07 ABR 2020", description: "Estados Unidos" },
    { number: "02", title: "Controlador", image: "/agentes/controladores/viper.jpeg",     category: "Viper",     year: "07 ABR 2020", description: "Estados Unidos" },
    { number: "03", title: "Controlador", image: "/agentes/controladores/omen.jpg",       category: "Omen",      year: "07 ABR 2020", description: "Desconhecido"   },
    { number: "16", title: "Controlador", image: "/agentes/controladores/astra.png",      category: "Astra",     year: "02 MAR 2021", description: "Gana"           },
    { number: "21", title: "Controlador", image: "/agentes/controladores/harbor.jpg",     category: "Harbor",    year: "18 OUT 2022", description: "Índia"          },
    { number: "25", title: "Controlador", image: "/agentes/controladores/clove.jpeg",     category: "Clove",     year: "26 MAR 2024", description: "Escócia"        },
    { number: "30", title: "Controlador", image: "/agentes/controladores/miks.webp",      category: "Miks",      year: "18 MAR 2026", description: "Croácia"        },
  ],
  Sentinelas: [
    { number: "05", title: "Sentinela", image: "/agentes/sentinelas/cypher.jpg",    category: "Cypher",   year: "07 ABR 2020", description: "Marrocos"     },
    { number: "07", title: "Sentinela", image: "/agentes/sentinelas/sage.jpg",      category: "Sage",     year: "07 ABR 2020", description: "China"        },
    { number: "04", title: "Sentinela", image: "/agentes/sentinelas/killjoy.webp",  category: "Killjoy",  year: "04 AGO 2020", description: "Alemanha"     },
    { number: "18", title: "Sentinela", image: "/agentes/sentinelas/chamber.png",   category: "Chamber",  year: "16 NOV 2021", description: "França"       },
    { number: "23", title: "Sentinela", image: "/agentes/sentinelas/deadlock.jpg",  category: "Deadlock", year: "27 JUN 2023", description: "Noruega"      },
    { number: "26", title: "Sentinela", image: "/agentes/sentinelas/vyse.png",      category: "Vyse",     year: "28 AGO 2024", description: "Desconhecido" },
    { number: "29", title: "Sentinela", image: "/agentes/sentinelas/veto.avif",     category: "Veto",     year: "07 OUT 2025", description: "Senegal"      },
  ],
  Iniciadores: [
    { number: "06", title: "Iniciador", image: "/agentes/iniciadores/sova.jpeg",   category: "Sova",   year: "07 ABR 2020", description: "Rússia"              },
    { number: "13", title: "Iniciador", image: "/agentes/iniciadores/breach.jpg",  category: "Breach", year: "07 ABR 2020", description: "Suécia"              },
    { number: "14", title: "Iniciador", image: "/agentes/iniciadores/skye.jpg",    category: "Skye",   year: "27 OUT 2020", description: "Austrália"           },
    { number: "17", title: "Iniciador", image: "/agentes/iniciadores/kayo.jpg",    category: "KAY/O",  year: "22 JUN 2021", description: "Futuro Alternativo"  },
    { number: "20", title: "Iniciador", image: "/agentes/iniciadores/fade.jpg",    category: "Fade",   year: "27 ABR 2022", description: "Turquia"             },
    { number: "22", title: "Iniciador", image: "/agentes/iniciadores/gekko.png",   category: "Gekko",  year: "07 MAR 2023", description: "Estados Unidos"      },
    { number: "27", title: "Iniciador", image: "/agentes/iniciadores/tejo.jpg",    category: "Tejo",   year: "08 JAN 2025", description: "Colômbia"            },
  ],
  Duelistas: [
    { number: "09", title: "Duelista", image: "/agentes/duelistas/phoenix.jpg",   category: "Phoenix", year: "07 ABR 2020", description: "Reino Unido"   },
    { number: "10", title: "Duelista", image: "/agentes/duelistas/jett.jpg",      category: "Jett",    year: "07 ABR 2020", description: "Coreia do Sul" },
    { number: "11", title: "Duelista", image: "/agentes/duelistas/reyna.png",     category: "Reyna",   year: "02 JUN 2020", description: "México"        },
    { number: "12", title: "Duelista", image: "/agentes/duelistas/raze.png",      category: "Raze",    year: "07 ABR 2020", description: "Brasil"        },
    { number: "15", title: "Duelista", image: "/agentes/duelistas/yoru.jpg",      category: "Yoru",    year: "12 JAN 2021", description: "Japão"         },
    { number: "19", title: "Duelista", image: "/agentes/duelistas/neon.jpeg",     category: "Neon",    year: "11 JAN 2022", description: "Filipinas"     },
    { number: "24", title: "Duelista", image: "/agentes/duelistas/iso.jpeg",      category: "Iso",     year: "31 OUT 2023", description: "China"         },
    { number: "28", title: "Duelista", image: "/agentes/duelistas/waylay.webp",   category: "Waylay",  year: "05 MAR 2025", description: "Tailândia"     },
  ],
};

const CONFIG = {
  SCROLL_SPEED: 0.75,
  LERP_FACTOR: 0.05,
  BUFFER_SIZE: 5,
  MAX_VELOCITY: 150,
  SNAP_DURATION: 500,
};

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

export function Component({ role = "Controladores" }: { role?: string }) {
  const data = DATA_BY_ROLE[role] ?? DATA_BY_ROLE["Controladores"];

  const getProjectData = (index: number) => {
    const i = ((Math.abs(index) % data.length) + data.length) % data.length;
    return data[i];
  };

  const [visibleRange, setVisibleRange] = React.useState({
    min: -CONFIG.BUFFER_SIZE,
    max: CONFIG.BUFFER_SIZE,
  });

  const state = React.useRef({
    currentY: 0,
    targetY: 0,
    isDragging: false,
    isSnapping: false,
    snapStart: { time: 0, y: 0, target: 0 },
    lastScrollTime: Date.now(),
    dragStart: { y: 0, scrollY: 0 },
    projectHeight: 0,
    minimapHeight: 210,
  });

  const projectsRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const minimapRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const requestRef = React.useRef<number>();
  const renderedRange = React.useRef({ min: -CONFIG.BUFFER_SIZE, max: CONFIG.BUFFER_SIZE });

  React.useEffect(() => {
    const s = state.current;
    s.currentY = 0;
    s.targetY = 0;
    s.isSnapping = false;
    renderedRange.current = { min: -CONFIG.BUFFER_SIZE, max: CONFIG.BUFFER_SIZE };
    setVisibleRange({ min: -CONFIG.BUFFER_SIZE, max: CONFIG.BUFFER_SIZE });
  }, [role]);

  const updateParallax = (
    img: HTMLImageElement | null,
    scroll: number,
    index: number,
    height: number
  ) => {
    if (!img) return;
    if (!img.dataset.parallaxCurrent) img.dataset.parallaxCurrent = "0";
    let current = parseFloat(img.dataset.parallaxCurrent);
    const target = (-scroll - index * height) * 0.2;
    current = lerp(current, target, 0.1);
    if (Math.abs(current - target) > 0.01) {
      img.style.transform = `translateY(${current}px) scale(1.5)`;
      img.dataset.parallaxCurrent = current.toString();
    }
  };

  const updateSnap = () => {
    const s = state.current;
    const progress = Math.min(
      (Date.now() - s.snapStart.time) / CONFIG.SNAP_DURATION,
      1
    );
    const eased = 1 - Math.pow(1 - progress, 3);
    s.targetY = s.snapStart.y + (s.snapStart.target - s.snapStart.y) * eased;
    if (progress >= 1) s.isSnapping = false;
  };

  const snapToProject = () => {
    const s = state.current;
    const current = Math.round(-s.targetY / s.projectHeight);
    const target = -current * s.projectHeight;
    s.isSnapping = true;
    s.snapStart = { time: Date.now(), y: s.targetY, target };
  };

  const updatePositions = () => {
    const s = state.current;
    const minimapY = (s.currentY * s.minimapHeight) / s.projectHeight;

    projectsRef.current.forEach((el, index) => {
      const y = index * s.projectHeight + s.currentY;
      el.style.transform = `translateY(${y}px)`;
      const img = el.querySelector("img");
      updateParallax(img, s.currentY, index, s.projectHeight);
    });

    minimapRef.current.forEach((el, index) => {
      const y = index * s.minimapHeight + minimapY;
      el.style.transform = `translateY(${y}px)`;
      const img = el.querySelector("img");
      if (img) updateParallax(img, minimapY, index, s.minimapHeight);
    });
  };

  const animate = () => {
    const s = state.current;
    const now = Date.now();

    if (!s.isSnapping && !s.isDragging && now - s.lastScrollTime > 100) {
      const snapPoint =
        -Math.round(-s.targetY / s.projectHeight) * s.projectHeight;
      if (Math.abs(s.targetY - snapPoint) > 1) snapToProject();
    }

    if (s.isSnapping) updateSnap();
    if (!s.isDragging) {
      s.currentY += (s.targetY - s.currentY) * CONFIG.LERP_FACTOR;
    }

    updatePositions();
  };

  const animationLoop = () => {
    animate();

    const s = state.current;
    const currentIndex = Math.round(-s.targetY / s.projectHeight);
    const min = currentIndex - CONFIG.BUFFER_SIZE;
    const max = currentIndex + CONFIG.BUFFER_SIZE;

    if (
      min !== renderedRange.current.min ||
      max !== renderedRange.current.max
    ) {
      renderedRange.current = { min, max };
      setVisibleRange({ min, max });
    }

    requestRef.current = requestAnimationFrame(animationLoop);
  };

  React.useEffect(() => {
    state.current.projectHeight = window.innerHeight;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const s = state.current;
      s.isSnapping = false;
      s.lastScrollTime = Date.now();
      const delta = Math.max(
        Math.min(e.deltaY * CONFIG.SCROLL_SPEED, CONFIG.MAX_VELOCITY),
        -CONFIG.MAX_VELOCITY
      );
      s.targetY -= delta;
    };

    const onTouchStart = (e: TouchEvent) => {
      const s = state.current;
      s.isDragging = true;
      s.isSnapping = false;
      s.dragStart = { y: e.touches[0].clientY, scrollY: s.targetY };
      s.lastScrollTime = Date.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      const s = state.current;
      if (!s.isDragging) return;
      s.targetY =
        s.dragStart.scrollY + (e.touches[0].clientY - s.dragStart.y) * 1.5;
      s.lastScrollTime = Date.now();
    };

    const onTouchEnd = () => {
      state.current.isDragging = false;
    };

    const onResize = () => {
      state.current.projectHeight = window.innerHeight;
      const container = document.querySelector(
        ".parallax-container"
      ) as HTMLElement;
      if (container) container.style.height = `${window.innerHeight}px`;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);
    onResize();
    requestRef.current = requestAnimationFrame(animationLoop);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const goTo = (dir: 1 | -1) => {
    const s = state.current;
    const currentIdx = Math.round(-s.targetY / s.projectHeight);
    const target = -(currentIdx + dir) * s.projectHeight;
    s.isSnapping = true;
    s.snapStart = { time: Date.now(), y: s.currentY, target };
    s.targetY = target;
    s.lastScrollTime = Date.now();
  };

  const indices: number[] = [];
  for (let i = visibleRange.min; i <= visibleRange.max; i++) {
    indices.push(i);
  }

  return (
    <div className="parallax-container">
      <ul className="project-list">
        {indices.map((i) => {
          const data = getProjectData(i);
          return (
            <div
              key={i}
              className="project"
              ref={(el) => {
                if (el) projectsRef.current.set(i, el);
                else projectsRef.current.delete(i);
              }}
            >
              <img src={data.image} alt={data.title} />
            </div>
          );
        })}
      </ul>

      <div className="minimap">
        <div className="minimap-wrapper">
          {indices.map((i) => {
            const data = getProjectData(i);
            return (
              <div
                key={i}
                className="minimap-item"
                ref={(el) => {
                  if (el) minimapRef.current.set(i, el);
                  else minimapRef.current.delete(i);
                }}
              >
                <div className="minimap-item-left">
                  <p className="minimap-num">{data.number}</p>
                  <p className="minimap-category">{data.category}</p>
                  <p className="minimap-desc">{data.description}</p>
                </div>
                <div className="minimap-item-img">
                  <img src={data.image} alt={data.title} />
                </div>
                <div className="minimap-item-right">
                  <p className="minimap-title">{data.title}</p>
                  <p className="minimap-year">{data.year}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile prev/next buttons */}
      <div className="mobile-nav-buttons">
        <button className="mobile-nav-btn" onClick={() => goTo(-1)} aria-label="Anterior">
          ‹
        </button>
        <button className="mobile-nav-btn" onClick={() => goTo(1)} aria-label="Próximo">
          ›
        </button>
      </div>
    </div>
  );
}
