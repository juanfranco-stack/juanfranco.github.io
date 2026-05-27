const projects = {
  plinng: {
    type: "Contenido",
    title: "Ecosistema de contenidos para Plinng",
    description:
      "Gestión de contenidos para redes sociales, páginas web y Google Business Profile, con foco en claridad, tono de marca y rendimiento mensual.",
    points: [
      "Producción de activos digitales para una cartera superior a 1.000 clientes.",
      "Reportes mensuales con lectura de desempeño y oportunidades accionables.",
      "Comunicación directa con clientes para integrar feedback y sostener consistencia de marca.",
    ],
  },
  orbidi: {
    type: "Operación",
    title: "Optimización de procesos en Orbidi",
    description:
      "Mejora de flujos de marketing y coordinación interna para convertir problemas detectados en planes de acción medibles.",
    points: [
      "Contribución al crecimiento de 2.000 a 5.000 clientes.",
      "Desbloqueo de más de 200 proyectos con problemas técnicos.",
      "Participación en un nuevo modelo de negocio orientado a SaaS.",
    ],
  },
  cri: {
    type: "Marketing",
    title: "Crecimiento comercial en Central de Riesgo Inmobiliario",
    description:
      "Creación y fortalecimiento del área de mercadeo y servicio al cliente para mejorar captación, fidelización y posicionamiento.",
    points: [
      "Aumento de clientes fijos de 15 a 25.",
      "Crecimiento del 40% en ventas totales entre 2021 y 2022.",
      "Apertura de canales digitales como página web y YouTube para reforzar la presencia comercial.",
    ],
  },
  pastelpan: {
    type: "Ventas",
    title: "Activación comercial en Grupo Pastelpan",
    description:
      "Atención presencial y digital, seguimiento oportuno y propuestas de merchandising para mejorar la experiencia de compra.",
    points: [
      "Incremento de ventas promedio mensuales de $60M a $90M entre 2017 y 2018.",
      "Ideas de merchandising aplicadas al punto físico.",
      "Reconocimiento interno por desempeño y servicio al cliente.",
    ],
  },
  analytics: {
    type: "Analítica",
    title: "Reporting de desempeño digital",
    description:
      "Análisis de pauta, contenidos y redes sociales para traducir métricas en decisiones claras de comunicación y operación.",
    points: [
      "Uso de Google Analytics, Google Trends, Meta Ads y Google Ads para evaluar impacto.",
      "Lectura de retorno de inversión y efectividad de contenidos publicados.",
      "Identificación de oportunidades de mejora para campañas, piezas y flujos de atención.",
    ],
  },
  strategy: {
    type: "Estrategia",
    title: "Comunicación estratégica aplicada",
    description:
      "Construcción de propuestas que combinan investigación, contenidos, experiencia del cliente y objetivos comerciales.",
    points: [
      "Base académica en Mercadeo, Marketing Digital y Comunicación Estratégica.",
      "Diseño de campañas orientadas a público objetivo y necesidades de negocio.",
      "Enfoque en convertir oportunidades de mejora en resultados medibles.",
    ],
  },
};

const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const modal = document.querySelector("[data-modal]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalType = document.querySelector("[data-modal-type]");
const modalDescription = document.querySelector("[data-modal-description]");
const modalList = document.querySelector("[data-modal-list]");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function closeNav() {
  nav?.classList.remove("open");
  navToggle?.setAttribute("aria-expanded", "false");
}

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeNav);
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));

function openModal(projectKey) {
  const project = projects[projectKey];
  if (!project || !modal) return;

  modalType.textContent = project.type;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalList.innerHTML = project.points.map((point) => `<div>${point}</div>`).join("");
  modal.hidden = false;
  document.body.classList.add("modal-open");
  refreshIcons();
}

function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-project]").forEach((card) => {
  card.addEventListener("click", () => openModal(card.dataset.project));
});

document.querySelectorAll("[data-modal-close]").forEach((control) => {
  control.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeNav();
  }
});

window.addEventListener("load", refreshIcons);
