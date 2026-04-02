"use client";

import React from "react";

// ═══════════════════════════════════════════════════════════
// LeadEngine Public Site — Design System Components
// Mirrors internal app patterns: inline styles, var(--le-*),
// DM Sans, same radii/shadows/transitions
// ═══════════════════════════════════════════════════════════

/* ── Icon ── */
const ICON_PATHS: Record<string, React.ReactNode> = {
  search: <><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></>,
  home: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
  phone: <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></>,
  mapPin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
  star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
  check: <><polyline points="20 6 9 17 4 12"/></>,
  checkCircle: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
  arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  menu: <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
  calculator: <><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="16" y2="18"/></>,
  trendingUp: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
  users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
  clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  download: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
  award: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
  heart: <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></>,
  barChart: <><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></>,
  facebook: <><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></>,
  instagram: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
  linkedin: <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
  chevronDown: <><polyline points="6 9 12 15 18 9"/></>,
};

export function Icon({ name, size = 18, color }: { name: string; size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICON_PATHS[name] || null}
    </svg>
  );
}

/* ── Button ── */
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "white";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconRight?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  style?: React.CSSProperties;
}

const BUTTON_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "var(--le-gold)",
    color: "#ffffff",
    border: "none",
  },
  secondary: {
    background: "var(--le-sidebar-bg)",
    color: "var(--le-text-inverse)",
    border: "none",
  },
  outline: {
    background: "transparent",
    color: "var(--le-text-primary)",
    border: "1px solid var(--le-border-strong)",
  },
  ghost: {
    background: "transparent",
    color: "var(--le-text-secondary)",
    border: "none",
  },
  white: {
    background: "#ffffff",
    color: "var(--le-text-primary)",
    border: "none",
    boxShadow: "var(--le-shadow-sm)",
  },
};

const BUTTON_SIZES: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: "8px 16px", fontSize: 13, borderRadius: "var(--le-radius-sm)" },
  md: { padding: "12px 24px", fontSize: 14, borderRadius: "var(--le-radius-md)" },
  lg: { padding: "16px 32px", fontSize: 16, borderRadius: "var(--le-radius-lg)" },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  fullWidth,
  disabled,
  onClick,
  type = "button",
  style: customStyle,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all var(--le-transition-fast)",
        width: fullWidth ? "100%" : undefined,
        letterSpacing: "-0.01em",
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        ...BUTTON_STYLES[variant],
        ...BUTTON_SIZES[size],
        ...customStyle,
      }}
    >
      {icon && <Icon name={icon} size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />}
    </button>
  );
}

/* ── Input ── */
interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  required?: boolean;
  icon?: string;
  error?: string;
  style?: React.CSSProperties;
  name?: string;
  autoComplete?: string;
}

export function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required,
  icon,
  error,
  style: customStyle,
  name,
  autoComplete,
}: InputProps) {
  return (
    <div style={{ width: "100%", ...customStyle }}>
      {label && (
        <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--le-text-secondary)", marginBottom: 6 }}>
          {label}
          {required && <span style={{ color: "var(--le-red)", marginLeft: 3 }}>*</span>}
        </label>
      )}
      <div style={{ position: "relative" }}>
        {icon && (
          <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--le-text-tertiary)", pointerEvents: "none" }}>
            <Icon name={icon} size={16} />
          </div>
        )}
        <input
          type={type}
          name={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          style={{
            width: "100%",
            padding: icon ? "12px 14px 12px 40px" : "12px 14px",
            borderRadius: "var(--le-radius-md)",
            border: `1px solid ${error ? "var(--le-red)" : "var(--le-border)"}`,
            background: "var(--le-bg-surface)",
            color: "var(--le-text-primary)",
            fontSize: 14,
            outline: "none",
            transition: "border-color var(--le-transition-fast), box-shadow var(--le-transition-fast)",
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = "var(--le-gold)";
            e.currentTarget.style.boxShadow = "0 0 0 3px var(--le-gold-bg)";
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = error ? "var(--le-red)" : "var(--le-border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>
      {error && <div style={{ fontSize: 12, color: "var(--le-red)", marginTop: 4 }}>{error}</div>}
    </div>
  );
}

/* ── Card ── */
interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  padding?: string | number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Card({ children, hover, padding, style: customStyle, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={hover ? "le-card-hover" : undefined}
      style={{
        background: "var(--le-bg-surface)",
        borderRadius: "var(--le-radius-lg)",
        border: "1px solid var(--le-border)",
        padding: padding ?? 24,
        boxShadow: "var(--le-shadow-sm)",
        cursor: onClick ? "pointer" : undefined,
        ...customStyle,
      }}
    >
      {children}
    </div>
  );
}

/* ── Badge ── */
export function Badge({
  children,
  color = "var(--le-gold)",
  bg,
}: {
  children: React.ReactNode;
  color?: string;
  bg?: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 10px",
        borderRadius: "var(--le-radius-full)",
        background: bg || `${color}15`,
        color: color,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

/* ── Modal Overlay ── */
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: number;
  closable?: boolean;
}

export function Modal({ open, onClose, children, maxWidth = 480, closable = true }: ModalProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--le-bg-overlay)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: 16,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        animation: "le-fade-in 0.2s ease",
      }}
      onClick={closable ? onClose : undefined}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--le-bg-surface)",
          borderRadius: "var(--le-radius-xl)",
          padding: 0,
          width: "100%",
          maxWidth,
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "var(--le-shadow-xl)",
          animation: "le-scale-in 0.25s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Section Heading ── */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 40 }}>
      {eyebrow && (
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "var(--le-gold)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "var(--le-text-primary)",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: 16,
            color: "var(--le-text-secondary)",
            marginTop: 12,
            lineHeight: 1.6,
            maxWidth: center ? 560 : undefined,
            marginLeft: center ? "auto" : undefined,
            marginRight: center ? "auto" : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ── Stat Counter ── */
export function StatCounter({
  value,
  label,
  suffix,
}: {
  value: string;
  label: string;
  suffix?: string;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: "var(--le-gold)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {value}
        {suffix && <span style={{ fontSize: 20, fontWeight: 500 }}>{suffix}</span>}
      </div>
      <div style={{ fontSize: 14, color: "var(--le-text-secondary)", marginTop: 6 }}>{label}</div>
    </div>
  );
}

/* ── Avatar (matches internal app) ── */
export function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const hue = (name.length * 37) % 360;
  const initials = name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `hsl(${hue}, 45%, 92%)`,
        color: `hsl(${hue}, 55%, 35%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.35,
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

/* ── Divider ── */
export function Divider({ margin = 32 }: { margin?: number }) {
  return <div style={{ height: 1, background: "var(--le-border-subtle)", margin: `${margin}px 0` }} />;
}
