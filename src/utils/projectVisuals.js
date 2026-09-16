/**
 * Vector illustrations for project previews
 * Pure SVG, zero HTTP network latency, crisp on all DPIs
 */

export const getProjectVisualSvg = (projectId) => {
  switch (projectId) {
    case 'fintrack-pro':
      return `
        <svg viewBox="0 0 400 200" class="w-full h-full object-cover rounded-t-lg select-none" aria-hidden="true" role="img">
          <defs>
            <linearGradient id="fin-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#e28413" stop-opacity="0.35" />
              <stop offset="100%" stop-color="#1e1e24" stop-opacity="0.0" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="#141418" />
          <!-- Grid lines -->
          <line x1="20" y1="40" x2="380" y2="40" stroke="#7f7b82" stroke-opacity="0.2" stroke-dasharray="3,3" />
          <line x1="20" y1="80" x2="380" y2="80" stroke="#7f7b82" stroke-opacity="0.2" stroke-dasharray="3,3" />
          <line x1="20" y1="120" x2="380" y2="120" stroke="#7f7b82" stroke-opacity="0.2" stroke-dasharray="3,3" />
          <line x1="20" y1="160" x2="380" y2="160" stroke="#7f7b82" stroke-opacity="0.2" stroke-dasharray="3,3" />
          <!-- Area chart -->
          <polygon points="30,160 30,130 80,110 130,140 180,95 230,105 280,60 330,75 370,45 370,160" fill="url(#fin-grad)" />
          <polyline points="30,130 80,110 130,140 180,95 230,105 280,60 330,75 370,45" fill="none" stroke="#e28413" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Data points -->
          <circle cx="180" cy="95" r="4" fill="#fffaff" stroke="#e28413" stroke-width="2" />
          <circle cx="280" cy="60" r="4" fill="#fffaff" stroke="#e28413" stroke-width="2" />
          <circle cx="370" cy="45" r="5" fill="#f45b69" stroke="#fffaff" stroke-width="1.5" />
          <!-- UI Header pill -->
          <rect x="25" y="15" width="110" height="18" rx="4" fill="#7f7b82" fill-opacity="0.25" />
          <text x="32" y="27" fill="#fffaff" font-size="9" font-family="'Fira Code', monospace">TICK: REALTIME</text>
          <rect x="280" y="15" width="95" height="18" rx="4" fill="#e28413" fill-opacity="0.2" />
          <text x="288" y="27" fill="#e28413" font-size="9" font-family="'Fira Code', monospace">+42.8% VOL</text>
        </svg>
      `;
    case 'aegis-design-system':
      return `
        <svg viewBox="0 0 400 200" class="w-full h-full object-cover rounded-t-lg select-none" aria-hidden="true" role="img">
          <rect width="400" height="200" fill="#15151a" />
          <!-- Component wireframe blocks -->
          <rect x="30" y="25" width="160" height="36" rx="6" fill="#7f7b82" fill-opacity="0.15" stroke="#f45b69" stroke-width="1.5" />
          <text x="45" y="48" fill="#f45b69" font-size="11" font-family="'Fira Code', monospace">&lt;Button variant="primary"/&gt;</text>

          <rect x="210" y="25" width="160" height="36" rx="6" fill="#7f7b82" fill-opacity="0.1" stroke="#7f7b82" stroke-width="1" />
          <text x="225" y="48" fill="#fffaff" font-size="11" font-family="'Fira Code', monospace">&lt;Input aria-label="..."/&gt;</text>

          <rect x="30" y="75" width="340" height="50" rx="8" fill="#1e1e24" stroke="#7f7b82" stroke-opacity="0.3" stroke-width="1" />
          <circle cx="55" cy="100" r="12" fill="#e28413" fill-opacity="0.3" />
          <rect x="80" y="92" width="120" height="8" rx="4" fill="#fffaff" fill-opacity="0.8" />
          <rect x="80" y="106" width="70" height="6" rx="3" fill="#7f7b82" fill-opacity="0.6" />
          <rect x="290" y="90" width="60" height="20" rx="4" fill="#f45b69" fill-opacity="0.2" />
          <text x="298" y="104" fill="#f45b69" font-size="9" font-family="'Fira Code', monospace">WCAG AAA</text>

          <rect x="30" y="140" width="100" height="35" rx="6" fill="#e28413" fill-opacity="0.15" stroke="#e28413" stroke-width="1" />
          <rect x="145" y="140" width="110" height="35" rx="6" fill="#7f7b82" fill-opacity="0.15" stroke="#7f7b82" stroke-width="1" />
          <rect x="270" y="140" width="100" height="35" rx="6" fill="#f45b69" fill-opacity="0.15" stroke="#f45b69" stroke-width="1" />
        </svg>
      `;
    case 'nexus-commerce':
      return `
        <svg viewBox="0 0 400 200" class="w-full h-full object-cover rounded-t-lg select-none" aria-hidden="true" role="img">
          <rect width="400" height="200" fill="#131317" />
          <!-- E-commerce layout mockup -->
          <rect x="30" y="20" width="160" height="150" rx="8" fill="#1e1e24" stroke="#7f7b82" stroke-opacity="0.2" stroke-width="1" />
          <rect x="45" y="35" width="130" height="70" rx="4" fill="#7f7b82" fill-opacity="0.15" />
          <circle cx="110" cy="70" r="20" fill="#e28413" fill-opacity="0.4" />
          <rect x="45" y="115" width="80" height="8" rx="4" fill="#fffaff" fill-opacity="0.9" />
          <rect x="45" y="130" width="40" height="14" rx="3" fill="#e28413" />
          <text x="52" y="141" fill="#fffaff" font-size="9" font-family="'Fira Code', monospace">$149</text>
          
          <!-- Checkout Drawer Mockup -->
          <rect x="210" y="20" width="160" height="150" rx="8" fill="#1b1a21" stroke="#f45b69" stroke-opacity="0.4" stroke-width="1" />
          <rect x="225" y="32" width="90" height="8" rx="4" fill="#fffaff" />
          <line x1="225" y1="52" x2="355" y2="52" stroke="#7f7b82" stroke-opacity="0.2" />
          <rect x="225" y="65" width="130" height="12" rx="3" fill="#7f7b82" fill-opacity="0.15" />
          <rect x="225" y="85" width="130" height="12" rx="3" fill="#7f7b82" fill-opacity="0.15" />
          <rect x="225" y="125" width="130" height="28" rx="6" fill="#f45b69" />
          <text x="245" y="143" fill="#fffaff" font-size="10" font-weight="bold" font-family="'Fira Sans', sans-serif">1-CLICK CHECKOUT</text>
        </svg>
      `;
    case 'pulse-health-os':
      return `
        <svg viewBox="0 0 400 200" class="w-full h-full object-cover rounded-t-lg select-none" aria-hidden="true" role="img">
          <rect width="400" height="200" fill="#121316" />
          <!-- ECG Pulse line -->
          <path d="M20,100 L120,100 L135,50 L150,150 L165,70 L180,120 L195,100 L380,100" fill="none" stroke="#f45b69" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Telemedicine Grid indicators -->
          <rect x="30" y="20" width="100" height="40" rx="6" fill="#1e1e24" stroke="#7f7b82" stroke-opacity="0.3" />
          <text x="40" y="36" fill="#7f7b82" font-size="8" font-family="'Fira Code', monospace">HEART RATE</text>
          <text x="40" y="52" fill="#fffaff" font-size="14" font-weight="bold" font-family="'Fira Sans', sans-serif">72 BPM</text>

          <rect x="145" y="20" width="105" height="40" rx="6" fill="#1e1e24" stroke="#7f7b82" stroke-opacity="0.3" />
          <text x="155" y="36" fill="#7f7b82" font-size="8" font-family="'Fira Code', monospace">O2 SATURATION</text>
          <text x="155" y="52" fill="#e28413" font-size="14" font-weight="bold" font-family="'Fira Sans', sans-serif">99.2%</text>

          <!-- Status badge -->
          <rect x="265" y="20" width="105" height="40" rx="6" fill="#f45b69" fill-opacity="0.15" stroke="#f45b69" stroke-opacity="0.5" />
          <circle cx="280" cy="40" r="4" fill="#f45b69" />
          <text x="290" y="43" fill="#fffaff" font-size="9" font-family="'Fira Code', monospace">SYNC: SECURE</text>

          <rect x="30" y="145" width="340" height="28" rx="6" fill="#1e1e24" stroke="#7f7b82" stroke-opacity="0.2" />
          <text x="42" y="163" fill="#7f7b82" font-size="9" font-family="'Fira Code', monospace">OFFLINE BUFFER: 0 PACKETS DROPPED (INDEXEDDB)</text>
        </svg>
      `;
    case 'omni-docs-platform':
      return `
        <svg viewBox="0 0 400 200" class="w-full h-full object-cover rounded-t-lg select-none" aria-hidden="true" role="img">
          <rect width="400" height="200" fill="#151419" />
          <!-- Code & Markdown AST nodes -->
          <rect x="30" y="25" width="110" height="150" rx="6" fill="#1b1a20" stroke="#7f7b82" stroke-opacity="0.3" />
          <rect x="42" y="40" width="70" height="8" rx="3" fill="#e28413" />
          <rect x="42" y="55" width="85" height="6" rx="3" fill="#7f7b82" fill-opacity="0.5" />
          <rect x="42" y="68" width="75" height="6" rx="3" fill="#7f7b82" fill-opacity="0.5" />
          <rect x="42" y="81" width="80" height="6" rx="3" fill="#7f7b82" fill-opacity="0.5" />
          <rect x="42" y="105" width="60" height="8" rx="3" fill="#f45b69" />
          <rect x="42" y="120" width="75" height="6" rx="3" fill="#7f7b82" fill-opacity="0.5" />

          <!-- Editor preview & terminal -->
          <rect x="155" y="25" width="215" height="150" rx="6" fill="#101014" stroke="#7f7b82" stroke-opacity="0.3" />
          <rect x="155" y="25" width="215" height="24" rx="6" fill="#1e1e24" />
          <circle cx="170" cy="37" r="3.5" fill="#f45b69" />
          <circle cx="182" cy="37" r="3.5" fill="#e28413" />
          <circle cx="194" cy="37" r="3.5" fill="#7f7b82" />
          <text x="215" y="41" fill="#7f7b82" font-size="8" font-family="'Fira Code', monospace">spec.md — 3ms AST Parse</text>
          
          <text x="170" y="70" fill="#e28413" font-size="10" font-family="'Fira Code', monospace"># Architecture Spec</text>
          <text x="170" y="90" fill="#fffaff" font-size="9" font-family="'Fira Code', monospace">const parser = new Worker();</text>
          <text x="170" y="110" fill="#f45b69" font-size="9" font-family="'Fira Code', monospace">parser.postMessage({ crdt: true });</text>
          <rect x="170" y="130" width="180" height="24" rx="4" fill="#7f7b82" fill-opacity="0.15" />
          <text x="180" y="146" fill="#fffaff" font-size="9" font-family="'Fira Code', monospace">Lighthouse: 100/100 Perf</text>
        </svg>
      `;
    case 'veloce-cloud-console':
      return `
        <svg viewBox="0 0 400 200" class="w-full h-full object-cover rounded-t-lg select-none" aria-hidden="true" role="img">
          <rect width="400" height="200" fill="#131418" />
          <!-- Topology network nodes -->
          <circle cx="80" cy="100" r="18" fill="#1e1e24" stroke="#e28413" stroke-width="2" />
          <text x="73" y="104" fill="#e28413" font-size="9" font-family="'Fira Code', monospace">LB</text>

          <line x1="98" y1="100" x2="170" y2="60" stroke="#7f7b82" stroke-opacity="0.4" stroke-width="1.5" stroke-dasharray="4,4" />
          <line x1="98" y1="100" x2="170" y2="140" stroke="#7f7b82" stroke-opacity="0.4" stroke-width="1.5" stroke-dasharray="4,4" />

          <circle cx="185" cy="60" r="16" fill="#1e1e24" stroke="#f45b69" stroke-width="2" />
          <text x="175" y="64" fill="#f45b69" font-size="8" font-family="'Fira Code', monospace">API-1</text>

          <circle cx="185" cy="140" r="16" fill="#1e1e24" stroke="#f45b69" stroke-width="2" />
          <text x="175" y="144" fill="#f45b69" font-size="8" font-family="'Fira Code', monospace">API-2</text>

          <line x1="201" y1="60" x2="280" y2="100" stroke="#7f7b82" stroke-opacity="0.4" stroke-width="1.5" />
          <line x1="201" y1="140" x2="280" y2="100" stroke="#7f7b82" stroke-opacity="0.4" stroke-width="1.5" />

          <circle cx="295" cy="100" r="18" fill="#1e1e24" stroke="#fffaff" stroke-width="2" />
          <text x="288" y="104" fill="#fffaff" font-size="9" font-family="'Fira Code', monospace">DB</text>

          <rect x="25" y="20" width="130" height="20" rx="4" fill="#7f7b82" fill-opacity="0.15" />
          <text x="32" y="34" fill="#fffaff" font-size="8" font-family="'Fira Code', monospace">LATENCY: 12ms P99</text>
        </svg>
      `;
    default:
      return `
        <svg viewBox="0 0 400 200" class="w-full h-full object-cover rounded-t-lg select-none" aria-hidden="true">
          <rect width="400" height="200" fill="#1a1a20" />
          <circle cx="200" cy="100" r="30" fill="#7f7b82" fill-opacity="0.2" />
        </svg>
      `;
  }
};
