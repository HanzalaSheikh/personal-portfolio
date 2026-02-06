'use client';

import React from 'react';
import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px 48px',
      background: '#fff',
      borderBottom: '1px solid #eee',
      position: 'relative',
      zIndex: 100
    }}>
      <div style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-1px' }}>
        Wildish<span style={{ color: '#000', opacity: 0.6 }}>&Co</span>
      </div>
      <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {['WORK', 'STUDIO', 'EXPERTISE', 'THOUGHTS', 'CONTACT'].map((item) => (
          <a
            key={item}
            href="#"
            style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#000',
              textDecoration: 'none',
              letterSpacing: '1px'
            }}
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}
