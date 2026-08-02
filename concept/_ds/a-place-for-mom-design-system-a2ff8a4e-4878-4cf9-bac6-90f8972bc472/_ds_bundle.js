/* @ds-bundle: {"format":3,"namespace":"APlaceForMomDesignSystem_a2ff8a","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"AdvisorCard","sourcePath":"components/care/AdvisorCard.jsx"},{"name":"CareOptionCard","sourcePath":"components/care/CareOptionCard.jsx"},{"name":"CostRange","sourcePath":"components/care/CostRange.jsx"},{"name":"ReviewCard","sourcePath":"components/care/ReviewCard.jsx"},{"name":"StarRating","sourcePath":"components/care/StarRating.jsx"},{"name":"StepProgress","sourcePath":"components/care/StepProgress.jsx"},{"name":"TrustBadge","sourcePath":"components/care/TrustBadge.jsx"},{"name":"Accordion","sourcePath":"components/disclosure/Accordion.jsx"},{"name":"AccordionItem","sourcePath":"components/disclosure/Accordion.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Eyebrow","sourcePath":"components/feedback/Eyebrow.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"37b1aae978bf","components/care/AdvisorCard.jsx":"3560cc621106","components/care/CareOptionCard.jsx":"7ed4d53456d9","components/care/CostRange.jsx":"02189044e10d","components/care/ReviewCard.jsx":"6211067300d2","components/care/StarRating.jsx":"79131eff80df","components/care/StepProgress.jsx":"e8f1c025d42a","components/care/TrustBadge.jsx":"9cb8050b94b3","components/disclosure/Accordion.jsx":"614261287e00","components/display/Avatar.jsx":"a2d707922221","components/display/Card.jsx":"5e421e8c4d5c","components/feedback/Badge.jsx":"1236a2ed548c","components/feedback/Eyebrow.jsx":"e6c4d216e2b5","components/forms/Checkbox.jsx":"bc9491a94d5d","components/forms/Input.jsx":"913ee6c08838","components/forms/Radio.jsx":"7c95d9ffe2f2","components/forms/Switch.jsx":"829a07e4931f","components/navigation/Tabs.jsx":"a3dc83fa3173","ui_kits/website/Footer.jsx":"4a2881def599","ui_kits/website/Hero.jsx":"955c0bd392be","ui_kits/website/HomeSections.jsx":"1f4ea496b782","ui_kits/website/Nav.jsx":"5defe91e719f","ui_kits/website/NeedsAssessment.jsx":"aa5c8e7dfcef"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.APlaceForMomDesignSystem_a2ff8a = window.APlaceForMomDesignSystem_a2ff8a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * APFM Button — pill-shaped, Commissioner Bold label, optional trailing arrow.
 * Brand primary is Serenity blue; accent is Sage green; secondary/tertiary are outline.
 * The signature teal focus ring appears on :focus-visible.
 */
function Button({
  children,
  variant = 'primary',
  // primary | accent | secondary | tertiary | link
  size = 'md',
  // sm | md | lg
  icon,
  // optional leading icon node
  trailingIcon,
  // optional trailing icon node; pass `true` for default arrow
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: 14,
      gap: 6,
      icon: 16
    },
    md: {
      padding: '12px 22px',
      fontSize: 16,
      gap: 8,
      icon: 18
    },
    lg: {
      padding: '16px 28px',
      fontSize: 18,
      gap: 10,
      icon: 20
    }
  };
  const s = sizes[size] || sizes.md;
  const palettes = {
    primary: {
      '--bg': 'var(--surface-brand)',
      '--bg-hover': 'var(--surface-brand-hover)',
      '--bg-active': 'var(--surface-brand-active)',
      '--fg': 'var(--text-on-brand)',
      '--bd': 'transparent'
    },
    accent: {
      '--bg': 'var(--surface-accent)',
      '--bg-hover': 'var(--surface-accent-hover)',
      '--bg-active': 'var(--surface-accent-active)',
      '--fg': 'var(--text-on-accent)',
      '--bd': 'transparent'
    },
    secondary: {
      '--bg': 'var(--surface-default)',
      '--bg-hover': 'var(--surface-brand-subtle)',
      '--bg-active': 'var(--blue-100)',
      '--fg': 'var(--blue-800)',
      '--bd': 'var(--blue-600)'
    },
    tertiary: {
      '--bg': 'var(--surface-default)',
      '--bg-hover': 'var(--surface-subtle)',
      '--bg-active': 'var(--surface-muted)',
      '--fg': 'var(--blue-900)',
      '--bd': 'var(--blue-900)'
    },
    link: {
      '--bg': 'transparent',
      '--bg-hover': 'transparent',
      '--bg-active': 'transparent',
      '--fg': 'var(--text-link)',
      '--bd': 'transparent'
    }
  };
  const p = palettes[variant] || palettes.primary;
  const isLink = variant === 'link';
  const base = {
    ...p,
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-bold)',
    fontSize: s.fontSize,
    lineHeight: 1.2,
    padding: isLink ? '4px 2px' : s.padding,
    borderRadius: 'var(--radius-pill)',
    border: `2px solid ${p['--bd']}`,
    background: p['--bg'],
    color: p['--fg'],
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    ...style
  };
  const onEnter = e => {
    if (!disabled) e.currentTarget.style.background = p['--bg-hover'];
  };
  const onLeave = e => {
    if (!disabled) e.currentTarget.style.background = p['--bg'];
  };
  const onDown = e => {
    if (!disabled) e.currentTarget.style.background = p['--bg-active'];
  };
  const onUp = e => {
    if (!disabled) e.currentTarget.style.background = p['--bg-hover'];
  };
  const arrow = /*#__PURE__*/React.createElement("svg", {
    width: s.icon,
    height: s.icon,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true",
    style: {
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: base,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onMouseDown: onDown,
    onMouseUp: onUp
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flex: 'none'
    }
  }, icon) : null, /*#__PURE__*/React.createElement("span", null, children), trailingIcon === true ? arrow : trailingIcon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flex: 'none'
    }
  }, trailingIcon) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/care/CostRange.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * APFM cost range module — reduces financial uncertainty with plain language.
 * Shows a typical monthly range, never a hard "what can you afford" qualifier.
 */
function CostRange({
  label = 'Estimated monthly cost',
  low,
  high,
  unit = '/mo',
  note,
  breakdown = [],
  style,
  ...rest
}) {
  const fmt = n => typeof n === 'number' ? '$' + n.toLocaleString('en-US') : n;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: 'var(--font-body)',
      background: 'var(--surface-warm)',
      border: '1px solid var(--border-warm)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      color: 'var(--text-muted)',
      marginBottom: 8
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6,
      color: 'var(--text-heading)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 40,
      letterSpacing: '-0.02em'
    }
  }, fmt(low)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      color: 'var(--text-muted)'
    }
  }, "\u2013"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 40,
      letterSpacing: '-0.02em'
    }
  }, fmt(high)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      color: 'var(--text-muted)',
      marginLeft: 2
    }
  }, unit)), note ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)',
      marginTop: 8
    }
  }, note) : null, breakdown.length ? /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: '16px 0 0',
      padding: '16px 0 0',
      borderTop: '1px solid var(--border-warm)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, breakdown.map((b, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-body)'
    }
  }, b.label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-heading)',
      fontWeight: 600
    }
  }, b.value)))) : null);
}
Object.assign(__ds_scope, { CostRange });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/care/CostRange.jsx", error: String((e && e.message) || e) }); }

// components/care/StarRating.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** APFM star rating — sage-green filled stars with optional count label. */
function StarRating({
  value = 0,
  max = 5,
  size = 18,
  count,
  label,
  style,
  ...rest
}) {
  const stars = [];
  for (let i = 0; i < max; i++) {
    const fill = Math.max(0, Math.min(1, value - i));
    stars.push(/*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        position: 'relative',
        display: 'inline-block',
        width: size,
        height: size
      }
    }, /*#__PURE__*/React.createElement(Star, {
      size: size,
      color: "var(--gray-300)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${fill * 100}%`,
        height: '100%',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(Star, {
      size: size,
      color: "var(--green-500)"
    }))));
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 2
    }
  }, stars), value || count ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-heading)',
      fontWeight: 600
    }
  }, value.toFixed(1)), count != null ? ` (${count})` : '', label ? ` ${label}` : '') : null);
}
function Star({
  size,
  color
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: color,
    "aria-hidden": "true",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.9l-5.81 3.05 1.11-6.47-4.7-4.58 6.5-.95z"
  }));
}
Object.assign(__ds_scope, { StarRating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/care/StarRating.jsx", error: String((e && e.message) || e) }); }

// components/care/StepProgress.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * APFM step progress — horizontal wizard indicator that reduces cognitive overload.
 * Past steps = sage check, current = serenity blue, future = muted.
 */
function StepProgress({
  steps = [],
  current = 0,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      width: '100%',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), steps.map((label, i) => {
    const state = i < current ? 'done' : i === current ? 'current' : 'todo';
    const dotBg = state === 'done' ? 'var(--surface-accent)' : state === 'current' ? 'var(--surface-brand)' : 'var(--surface-default)';
    const dotBd = state === 'todo' ? 'var(--border-default)' : 'transparent';
    const dotFg = state === 'todo' ? 'var(--text-subtle)' : '#fff';
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        flex: 'none',
        width: 96
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: dotBg,
        border: `2px solid ${dotBd}`,
        color: dotFg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: 14
      }
    }, state === 'done' ? /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M5 12.5l4 4 10-10",
      stroke: "#fff",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })) : i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 1.3,
        fontWeight: state === 'current' ? 600 : 500,
        color: state === 'todo' ? 'var(--text-subtle)' : 'var(--text-heading)'
      }
    }, label)), i < steps.length - 1 ? /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: 2,
        marginTop: 15,
        background: i < current ? 'var(--surface-accent)' : 'var(--border-subtle)'
      }
    }) : null);
  }));
}
Object.assign(__ds_scope, { StepProgress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/care/StepProgress.jsx", error: String((e && e.message) || e) }); }

// components/care/TrustBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * APFM trust badge — makes credibility visible. Icon + short proof statement.
 * Use for verified reviews, licensing, availability, advisor role clarity.
 */
function TrustBadge({
  label,
  sublabel,
  icon,
  tone = 'green',
  style,
  ...rest
}) {
  const tones = {
    green: {
      bg: 'var(--green-50)',
      ic: 'var(--green-600)',
      bd: 'var(--green-200)'
    },
    blue: {
      bg: 'var(--blue-50)',
      ic: 'var(--blue-700)',
      bd: 'var(--blue-200)'
    },
    cream: {
      bg: 'var(--cream-50)',
      ic: 'var(--blue-800)',
      bd: 'var(--border-warm)'
    }
  };
  const t = tones[tone] || tones.green;
  const defaultIcon = /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2.5l7.5 3v5.4c0 4.6-3.2 8.1-7.5 9.6-4.3-1.5-7.5-5-7.5-9.6V5.5z",
    fill: "currentColor",
    opacity: "0.18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2.5l7.5 3v5.4c0 4.6-3.2 8.1-7.5 9.6-4.3-1.5-7.5-5-7.5-9.6V5.5z",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 12l2.3 2.3 4.7-4.8",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 14px 8px 10px',
      borderRadius: 'var(--radius-pill)',
      background: t.bg,
      border: `1px solid ${t.bd}`,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: t.ic,
      flex: 'none'
    }
  }, icon || defaultIcon), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1.25
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-heading)'
    }
  }, label), sublabel ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, sublabel) : null));
}
Object.assign(__ds_scope, { TrustBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/care/TrustBadge.jsx", error: String((e && e.message) || e) }); }

// components/disclosure/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * APFM accordion — calm FAQ disclosure. Plus/minus marker, warm dividers.
 * Pass `items` as [{ question, answer }] or compose with <AccordionItem>.
 */
function Accordion({
  items = [],
  allowMultiple = false,
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(() => new Set());
  const toggle = i => setOpen(prev => {
    const next = new Set(allowMultiple ? prev : []);
    if (prev.has(i)) next.delete(i);else next.add(i);
    return next;
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderTop: '1px solid var(--border-warm)',
      ...style
    }
  }, rest), items.map((it, i) => /*#__PURE__*/React.createElement(AccordionItem, {
    key: i,
    question: it.question,
    answer: it.answer,
    open: open.has(i),
    onToggle: () => toggle(i)
  })));
}
function AccordionItem({
  question,
  answer,
  open: openProp,
  onToggle,
  children
}) {
  const [internal, setInternal] = React.useState(false);
  const isControlled = openProp !== undefined;
  const isOpen = isControlled ? openProp : internal;
  const handle = () => {
    if (!isControlled) setInternal(o => !o);
    onToggle && onToggle();
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--border-warm)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handle,
    "aria-expanded": isOpen,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      width: '100%',
      textAlign: 'left',
      background: 'transparent',
      border: 'none',
      padding: '20px 4px',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      color: 'var(--text-heading)'
    }
  }, /*#__PURE__*/React.createElement("span", null, question), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 28,
      height: 28,
      borderRadius: '50%',
      background: isOpen ? 'var(--surface-brand)' : 'var(--surface-brand-subtle)',
      color: isOpen ? '#fff' : 'var(--blue-800)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all var(--duration-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    style: {
      transformOrigin: 'center',
      transform: isOpen ? 'rotate(90deg)' : 'none',
      opacity: isOpen ? 0 : 1,
      transition: 'all var(--duration-base) var(--ease-standard)'
    }
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateRows: isOpen ? '1fr' : '0fr',
      transition: 'grid-template-rows var(--duration-base) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 4px 22px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-md)',
      lineHeight: 'var(--lh-md)',
      color: 'var(--text-body)'
    }
  }, answer || children))));
}
Object.assign(__ds_scope, { Accordion, AccordionItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/disclosure/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * APFM avatar — circular, initials or image, optional status dot.
 */
function Avatar({
  src,
  alt,
  name,
  size = 'md',
  status,
  style,
  ...rest
}) {
  const sizes = {
    xs: 28,
    sm: 36,
    md: 48,
    lg: 64,
    xl: 88
  };
  const dim = sizes[size] || sizes.md;
  const initials = (name || '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const statusColors = {
    online: 'var(--surface-accent)',
    away: 'var(--color-warning)',
    offline: 'var(--gray-400)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'relative',
      display: 'inline-flex',
      flex: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: dim,
      height: dim,
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--blue-100)',
      color: 'var(--blue-800)',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: dim * 0.38,
      border: '2px solid var(--surface-default)'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt || name || '',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials), status ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: dim * 0.28,
      height: dim * 0.28,
      borderRadius: '50%',
      background: statusColors[status] || statusColors.offline,
      border: '2px solid var(--surface-default)'
    }
  }) : null);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/care/AdvisorCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * APFM advisor card — humanizes guidance. Photo, name, role-clarity line, gentle CTA.
 */
function AdvisorCard({
  name,
  role = 'Senior Living Advisor',
  photo,
  blurb,
  cta = 'Talk with an advisor',
  onCta,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      alignItems: 'center',
      background: 'var(--surface-warm)',
      border: '1px solid var(--border-warm)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      fontFamily: 'var(--font-body)',
      boxShadow: 'var(--shadow-sm)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    src: photo,
    name: name,
    size: "xl",
    status: "online"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      color: 'var(--text-heading)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      color: 'var(--text-eyebrow)'
    }
  }, role)), blurb ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: 'var(--text-body)',
      margin: 0,
      lineHeight: 1.5
    }
  }, blurb) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    size: "sm",
    onClick: onCta
  }, cta))));
}
Object.assign(__ds_scope, { AdvisorCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/care/AdvisorCard.jsx", error: String((e && e.message) || e) }); }

// components/care/ReviewCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * APFM review story — peer validation with context. Quote, rating, attribution, verified marker.
 */
function ReviewCard({
  quote,
  rating = 5,
  author,
  relationship,
  photo,
  verified = true,
  community,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      background: 'var(--surface-default)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      fontFamily: 'var(--font-body)',
      boxShadow: 'var(--shadow-sm)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StarRating, {
    value: rating
  }), verified ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--green-700)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2.5l7.5 3v5.4c0 4.6-3.2 8.1-7.5 9.6-4.3-1.5-7.5-5-7.5-9.6V5.5z",
    fill: "var(--green-50)",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 12l2.3 2.3 4.7-4.8",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), "Verified") : null), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      lineHeight: 1.45,
      color: 'var(--text-heading)',
      margin: 0,
      letterSpacing: '-0.01em'
    }
  }, "\u201C", quote, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    src: photo,
    name: author,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-heading)'
    }
  }, author), relationship || community ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, relationship, relationship && community ? ' · ' : '', community) : null)));
}
Object.assign(__ds_scope, { ReviewCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/care/ReviewCard.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * APFM card — the base surface for content. White or warm-cream, soft radius + shadow.
 */
function Card({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  style,
  ...rest
}) {
  const surfaces = {
    default: {
      background: 'var(--surface-default)',
      border: '1px solid var(--border-subtle)'
    },
    warm: {
      background: 'var(--surface-warm)',
      border: '1px solid var(--border-warm)'
    },
    brand: {
      background: 'var(--surface-brand-subtle)',
      border: '1px solid var(--blue-200)'
    },
    accent: {
      background: 'var(--surface-accent-subtle)',
      border: '1px solid var(--green-200)'
    },
    elevated: {
      background: 'var(--surface-default)',
      border: 'none',
      boxShadow: 'var(--shadow-lg)'
    }
  };
  const pads = {
    none: 0,
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)'
  };
  const v = surfaces[variant] || surfaces.default;
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      borderRadius: 'var(--radius-lg)',
      padding: pads[padding] ?? pads.md,
      boxShadow: hover ? 'var(--shadow-lg)' : v.boxShadow || 'var(--shadow-sm)',
      transform: hover ? 'translateY(-2px)' : 'none',
      transition: 'box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)',
      cursor: interactive ? 'pointer' : 'default',
      ...v,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * APFM badge — small pill label. Colors map to brand roles, not loud alerts.
 */
function Badge({
  children,
  color = 'blue',
  size = 'md',
  icon,
  style,
  ...rest
}) {
  const palettes = {
    blue: {
      bg: 'var(--blue-50)',
      fg: 'var(--blue-800)'
    },
    green: {
      bg: 'var(--green-50)',
      fg: 'var(--green-700)'
    },
    neutral: {
      bg: 'var(--gray-100)',
      fg: 'var(--gray-700)'
    },
    cream: {
      bg: 'var(--cream-100)',
      fg: 'var(--cream-900)'
    },
    success: {
      bg: 'var(--color-success-subtle)',
      fg: 'var(--green-700)'
    },
    warning: {
      bg: 'var(--color-warning-subtle)',
      fg: '#9a6418'
    },
    error: {
      bg: 'var(--color-error-subtle)',
      fg: 'var(--color-error-strong)'
    },
    solid: {
      bg: 'var(--surface-brand-strong)',
      fg: '#fff'
    }
  };
  const p = palettes[color] || palettes.blue;
  const sizes = {
    sm: {
      fs: 12,
      pad: '3px 8px'
    },
    md: {
      fs: 13,
      pad: '4px 12px'
    },
    lg: {
      fs: 14,
      pad: '6px 14px'
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: s.fs,
      lineHeight: 1.2,
      padding: s.pad,
      borderRadius: 'var(--radius-pill)',
      background: p.bg,
      color: p.fg,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flex: 'none'
    }
  }, icon) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/care/CareOptionCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * APFM care option card — makes choices comparable and shows WHY something fits.
 * Supports a "Recommended because" reason list and a gentle cost range.
 */
function CareOptionCard({
  title,
  level,
  description,
  image,
  costLabel = 'Typically',
  cost,
  reasons = [],
  cta = 'See details',
  onCta,
  badge,
  style,
  ...rest
}) {
  const levelTones = {
    light: 'green',
    regular: 'blue',
    higher: 'cream'
  };
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: 'var(--surface-default)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      fontFamily: 'var(--font-body)',
      boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      transform: hover ? 'translateY(-2px)' : 'none',
      transition: 'all var(--duration-base) var(--ease-standard)',
      ...style
    }
  }, rest), image ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: 160,
      background: `var(--blue-100) center/cover no-repeat`,
      backgroundImage: `url(${image})`
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, level ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    color: levelTones[level] || 'blue',
    size: "sm"
  }, {
    light: 'Light support',
    regular: 'Regular help',
    higher: 'Higher support'
  }[level] || level) : null, badge ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    color: "solid",
    size: "sm"
  }, badge) : null), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 24,
      color: 'var(--text-heading)',
      margin: 0
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: 'var(--text-body)',
      margin: 0,
      lineHeight: 1.5
    }
  }, description) : null, reasons.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      color: 'var(--text-muted)',
      marginBottom: 8
    }
  }, "Recommended because"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, reasons.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: 8,
      fontSize: 14,
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      flex: 'none',
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12.5l4 4 10-10",
    stroke: "var(--green-500)",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), r)))) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 12,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 12,
      borderTop: '1px solid var(--border-warm)'
    }
  }, cost ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, costLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      color: 'var(--text-heading)'
    }
  }, cost)) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("button", {
    onClick: onCta,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 15,
      color: 'var(--text-link)',
      padding: '4px 0'
    }
  }, cta, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))));
}
Object.assign(__ds_scope, { CareOptionCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/care/CareOptionCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * APFM eyebrow label — spaced uppercase kicker that sits above headings.
 * Optional leading dot/tick in brand or accent color.
 */
function Eyebrow({
  children,
  color = 'blue',
  dot = true,
  style,
  ...rest
}) {
  const c = color === 'green' ? 'var(--green-600)' : color === 'neutral' ? 'var(--text-muted)' : 'var(--text-eyebrow)';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--mono-xs)',
      lineHeight: 'var(--lh-mono-xs)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: c,
      ...style
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: c,
      flex: 'none'
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** APFM checkbox — square with brand-blue fill when checked. */
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  id,
  description,
  style,
  ...rest
}) {
  const reactId = React.useId();
  const cbId = id || reactId;
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internal;
  const handle = e => {
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: cbId,
    style: {
      display: 'flex',
      alignItems: description ? 'flex-start' : 'center',
      gap: 10,
      fontFamily: 'var(--font-body)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 20,
      height: 20,
      flex: 'none',
      marginTop: description ? 2 : 0,
      borderRadius: 'var(--radius-sm)',
      border: `2px solid ${isChecked ? 'var(--surface-brand)' : 'var(--border-input)'}`,
      background: isChecked ? 'var(--surface-brand)' : 'var(--surface-default)',
      transition: 'all var(--duration-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: cbId,
    type: "checkbox",
    checked: isChecked,
    disabled: disabled,
    onChange: handle,
    style: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: 'inherit'
    }
  }, rest)), isChecked ? /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "none",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 1,
      left: 1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12.5l4 4 10-10",
    stroke: "#fff",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })) : null), label || description ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      color: 'var(--text-heading)',
      fontWeight: 500
    }
  }, label) : null, description ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, description) : null) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * APFM text input with label, helper/error text, and optional leading icon.
 */
function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  helperText,
  error,
  leadingIcon,
  disabled = false,
  required = false,
  style,
  ...rest
}) {
  const reactId = React.useId();
  const inputId = id || reactId;
  const [focused, setFocused] = React.useState(false);
  const borderColor = error ? 'var(--color-error)' : focused ? 'var(--border-brand)' : 'var(--border-input)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-heading)'
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-error)'
    }
  }, " *") : null) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: disabled ? 'var(--surface-muted)' : 'var(--surface-default)',
      border: `1.5px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      padding: '12px 16px',
      boxShadow: focused ? 'var(--focus-ring)' : 'none',
      transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)'
    }
  }, leadingIcon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--text-subtle)',
      flex: 'none'
    }
  }, leadingIcon) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    required: required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      border: 'none',
      outline: 'none',
      background: 'transparent',
      width: '100%',
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      color: 'var(--text-body)'
    }
  }, rest))), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--color-error)'
    }
  }, error) : helperText ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, helperText) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** APFM radio — round with brand-blue dot when selected. */
function Radio({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  name,
  value,
  disabled = false,
  id,
  style,
  ...rest
}) {
  const reactId = React.useId();
  const rId = id || reactId;
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internal;
  const handle = e => {
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: rId,
    style: {
      display: 'flex',
      alignItems: description ? 'flex-start' : 'center',
      gap: 10,
      fontFamily: 'var(--font-body)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 20,
      height: 20,
      flex: 'none',
      marginTop: description ? 2 : 0,
      borderRadius: '50%',
      border: `2px solid ${isChecked ? 'var(--surface-brand)' : 'var(--border-input)'}`,
      background: 'var(--surface-default)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all var(--duration-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: rId,
    type: "radio",
    name: name,
    value: value,
    checked: isChecked,
    disabled: disabled,
    onChange: handle,
    style: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: 'inherit'
    }
  }, rest)), isChecked ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--surface-brand)'
    }
  }) : null), label || description ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      color: 'var(--text-heading)',
      fontWeight: 500
    }
  }, label) : null, description ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, description) : null) : null);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** APFM switch — pill toggle, sage-green when on. */
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  id,
  style,
  ...rest
}) {
  const reactId = React.useId();
  const swId = id || reactId;
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const isOn = isControlled ? checked : internal;
  const handle = e => {
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: swId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-body)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 44,
      height: 26,
      flex: 'none',
      borderRadius: 'var(--radius-pill)',
      background: isOn ? 'var(--surface-accent)' : 'var(--gray-300)',
      transition: 'background var(--duration-base) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: swId,
    type: "checkbox",
    checked: isOn,
    disabled: disabled,
    onChange: handle,
    style: {
      position: 'absolute',
      opacity: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      cursor: 'inherit'
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: isOn ? 21 : 3,
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left var(--duration-base) var(--ease-out)'
    }
  })), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      color: 'var(--text-heading)',
      fontWeight: 500
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * APFM tabs / switcher — pill-style segmented control or underline tabs.
 */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  variant = 'pill',
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? (tabs[0] && tabs[0].value));
  const isControlled = value !== undefined;
  const active = isControlled ? value : internal;
  const select = v => {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };
  if (variant === 'underline') {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        display: 'flex',
        gap: 28,
        borderBottom: '1px solid var(--border-subtle)',
        ...style
      }
    }, rest), tabs.map(t => {
      const on = t.value === active;
      return /*#__PURE__*/React.createElement("button", {
        key: t.value,
        onClick: () => select(t.value),
        style: {
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '12px 2px',
          marginBottom: -1,
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          fontWeight: on ? 700 : 500,
          color: on ? 'var(--text-heading)' : 'var(--text-muted)',
          borderBottom: `2px solid ${on ? 'var(--surface-brand)' : 'transparent'}`
        }
      }, t.label);
    }));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      gap: 4,
      padding: 4,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-muted)',
      ...style
    }
  }, rest), tabs.map(t => {
    const on = t.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      onClick: () => select(t.value),
      style: {
        border: 'none',
        cursor: 'pointer',
        padding: '8px 18px',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-body)',
        fontSize: 15,
        fontWeight: 600,
        background: on ? 'var(--surface-default)' : 'transparent',
        color: on ? 'var(--text-heading)' : 'var(--text-muted)',
        boxShadow: on ? 'var(--shadow-sm)' : 'none',
        transition: 'all var(--duration-fast) var(--ease-standard)'
      }
    }, t.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
/* APFM marketing site — footer + final conversion panel. */
const DSF = window.APlaceForMomDesignSystem_a2ff8a;
function ConversionPanel({
  onStart
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-inverse)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '88px 32px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(DSF.Eyebrow, {
    color: "green"
  }, "You are not behind"), /*#__PURE__*/React.createElement("h2", {
    style: {
      color: '#fff',
      fontSize: 44,
      lineHeight: 1.1,
      margin: 0,
      maxWidth: 680
    }
  }, "Take one dignified step toward the right level of support"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--blue-200)',
      fontSize: 18,
      maxWidth: 560,
      margin: 0
    }
  }, "Explore options your family can discuss together. Start small, stay in control, and adjust as needs change."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(DSF.Button, {
    variant: "primary",
    size: "lg",
    trailingIcon: true,
    onClick: onStart
  }, "See what support fits"), /*#__PURE__*/React.createElement(DSF.Button, {
    variant: "tertiary",
    size: "lg",
    style: {
      background: 'transparent',
      color: '#fff',
      borderColor: 'rgba(255,255,255,0.5)'
    }
  }, "Talk to an advisor"))));
}
function Footer() {
  const cols = [{
    h: 'Care options',
    items: ['Home care', 'Assisted living', 'Memory care', 'Independent living']
  }, {
    h: 'Resources',
    items: ['Care guides', 'Cost of care', 'Questions to ask', 'Family checklist']
  }, {
    h: 'Company',
    items: ['About us', 'Our advisors', 'Reviews', 'Contact']
  }];
  const logoRef = React.useRef(null);
  React.useEffect(() => {
    fetch('../../assets/logos/apfm-wordmark-dark.svg').then(r => r.text()).then(t => {
      if (!logoRef.current) return;
      logoRef.current.innerHTML = t;
      const svg = logoRef.current.querySelector('svg');
      if (svg) {
        svg.style.width = '100%';
        svg.style.height = 'auto';
        svg.style.display = 'block';
      }
    });
  }, []);
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-default)',
      borderTop: '1px solid var(--border-warm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '64px 32px 40px',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    ref: logoRef,
    style: {
      width: 168,
      color: 'var(--surface-brand-strong)',
      display: 'inline-block',
      lineHeight: 0
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: 'var(--text-muted)',
      maxWidth: 280,
      margin: 0
    }
  }, "A trusted care guide helping families take the next right step \u2014 with patience and respect.")), cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.h,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--text-heading)'
    }
  }, c.h), c.items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontSize: 15,
      color: 'var(--text-body)',
      textDecoration: 'none'
    }
  }, i))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '20px 32px',
      borderTop: '1px solid var(--border-warm)',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-subtle)'
    }
  }, "\xA9 2026 A Place for Mom, Inc. All rights reserved."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-subtle)'
    }
  }, "Privacy \xB7 Terms \xB7 Accessibility")));
}
window.ConversionPanel = ConversionPanel;
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* APFM marketing site — hero. Eyebrow, Optima headline, supporting copy, CTAs, photo. */
const DSH = window.APlaceForMomDesignSystem_a2ff8a;
function Hero({
  onStart
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '64px 32px 72px',
      display: 'grid',
      gridTemplateColumns: '1.05fr 0.95fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(DSH.Eyebrow, null, "A trusted care guide"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 60,
      lineHeight: 1.04,
      margin: 0
    }
  }, "Stay yourself.", /*#__PURE__*/React.createElement("br", null), "Get support where you need it."), /*#__PURE__*/React.createElement("p", {
    className: "apfm-lead",
    style: {
      maxWidth: 520,
      margin: 0
    }
  }, "Many families begin right here. We'll help you understand what's realistic, compare trusted options, and take one calm step at a time \u2014 at your pace."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap',
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(DSH.Button, {
    variant: "primary",
    size: "lg",
    trailingIcon: true,
    onClick: onStart
  }, "See what support fits"), /*#__PURE__*/React.createElement(DSH.Button, {
    variant: "secondary",
    size: "lg"
  }, "Talk to an advisor")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(DSH.TrustBadge, {
    label: "Free to families",
    sublabel: "No cost for our guidance"
  }), /*#__PURE__*/React.createElement(DSH.TrustBadge, {
    tone: "blue",
    label: "Trusted since 2000",
    sublabel: "Millions guided home"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-2xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-xl)',
      aspectRatio: '4 / 3.4',
      background: 'var(--cream-100)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/hero-couple.png",
    alt: "Smiling senior couple at home",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeSections.jsx
try { (() => {
/* APFM marketing site — main content sections. Composes DS care components. */
const DSS = window.APlaceForMomDesignSystem_a2ff8a;
function SectionHead({
  eyebrow,
  title,
  sub,
  align = 'center'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      maxWidth: 680,
      margin: align === 'center' ? '0 auto' : 0
    }
  }, eyebrow ? /*#__PURE__*/React.createElement(DSS.Eyebrow, null, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 40,
      lineHeight: 1.1,
      margin: 0
    }
  }, title), sub ? /*#__PURE__*/React.createElement("p", {
    className: "apfm-lead",
    style: {
      margin: 0
    }
  }, sub) : null);
}
function Container({
  children,
  bg,
  pad = 88
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: bg || 'transparent'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: `${pad}px 32px`
    }
  }, children));
}

/* Trust bar */
function TrustBar() {
  const names = ['Mayo Clinic', 'AARP', 'U.S. News', 'Forbes Health', 'NCAL'];
  return /*#__PURE__*/React.createElement(Container, {
    pad: 40
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 40,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-subtle)'
    }
  }, "As referenced by"), names.map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      color: 'var(--gray-400)',
      letterSpacing: '-0.01em'
    }
  }, n))));
}

/* Progressive-disclosure care options */
function CareOptions() {
  return /*#__PURE__*/React.createElement(Container, {
    bg: "var(--surface-warm)"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Start where you are",
    title: "Support that scales with your needs",
    sub: "You don't have to make a big leap. Begin with light help and adjust as life changes \u2014 the senior stays in control of every step."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24,
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement(DSS.CareOptionCard, {
    level: "light",
    title: "Help at home",
    badge: "Start here",
    description: "Keep your routines with a little support each week.",
    cost: "$1,200/mo",
    reasons: ['Keeps Mom in her home', 'Lowest-commitment first step', 'Easy to adjust later']
  }), /*#__PURE__*/React.createElement(DSS.CareOptionCard, {
    level: "regular",
    title: "Regular in-home care",
    description: "Aides, medication reminders, and companionship on a schedule.",
    cost: "$3,400/mo",
    reasons: ['More hands-on daily support', 'Still in familiar surroundings', 'Flexible hours']
  }), /*#__PURE__*/React.createElement(DSS.CareOptionCard, {
    level: "higher",
    title: "Assisted living",
    description: "A community with care, meals, and connection built in.",
    cost: "$4,500/mo",
    reasons: ['24/7 support available', 'Social, engaged days', 'Care grows with needs']
  })));
}

/* How it works */
function HowItWorks() {
  return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "How it works",
    title: "A next step, not a final leap",
    sub: "We make a confusing decision feel manageable \u2014 one calm, low-pressure step at a time."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      maxWidth: 900,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }, /*#__PURE__*/React.createElement(DSS.StepProgress, {
    current: 1,
    steps: ['What you\u2019re noticing', 'What might help', 'What matters most', 'What fits', 'Your next step']
  })));
}

/* Cost clarity */
function CostClarity() {
  return /*#__PURE__*/React.createElement(Container, {
    bg: "var(--surface-brand-subtle)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    align: "left",
    eyebrow: "Cost, in plain language",
    title: "Let's understand what's realistic",
    sub: "No surprises and no pressure. We separate monthly cost, move-in fees, and care add-ons \u2014 and explain what may change."
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DSS.Button, {
    variant: "secondary",
    trailingIcon: true
  }, "See a cost breakdown"))), /*#__PURE__*/React.createElement(DSS.CostRange, {
    low: 4500,
    high: 6200,
    note: "What families typically pay for assisted living near you. We'll refine this together.",
    breakdown: [{
      label: 'Move-in fee',
      value: '$2,000 one-time'
    }, {
      label: 'Care add-ons',
      value: 'from $400/mo'
    }, {
      label: 'What Medicaid may cover',
      value: 'Varies by state'
    }]
  })));
}

/* Testimonials */
function Testimonials() {
  return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Real family stories",
    title: "You're not alone in this",
    sub: "Peer stories from families who started where you are now."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24,
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement(DSS.ReviewCard, {
    rating: 5,
    quote: "They helped us start small and never made us feel rushed.",
    author: "Dana M.",
    relationship: "Daughter",
    community: "Portland, OR"
  }), /*#__PURE__*/React.createElement(DSS.ReviewCard, {
    rating: 5,
    quote: "For the first time the whole family was looking at the same options.",
    author: "Robert & Lin",
    relationship: "Son and daughter-in-law",
    community: "Austin, TX"
  }), /*#__PURE__*/React.createElement(DSS.ReviewCard, {
    rating: 4.5,
    quote: "Our advisor explained the costs honestly. That built our trust.",
    author: "Priya S.",
    relationship: "Primary caregiver",
    community: "Sacramento, CA"
  })));
}

/* Advisor CTA */
function AdvisorCTA() {
  return /*#__PURE__*/React.createElement(Container, {
    bg: "var(--surface-warm)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "A real person, on your side",
    title: "Talk with an advisor \u2014 free",
    sub: "No scripts, no pressure. Just a knowledgeable guide who understands both the practical and emotional stakes."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(DSS.AdvisorCard, {
    name: "Renee Carter",
    blurb: "I help families weigh options without pressure \u2014 and keep your loved one's wishes at the center of every conversation."
  }))));
}

/* FAQ */
function FAQ() {
  return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Questions families ask",
    title: "It's okay to have questions"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(DSS.Accordion, {
    items: [{
      question: 'What does working with an advisor cost?',
      answer: 'Our guidance is free to families — we\u2019re paid by our partner communities, and we\u2019ll always explain how a recommendation is made.'
    }, {
      question: 'Can we start with help at home?',
      answer: 'Yes. Many families begin with light support like meals, rides, or cleaning, then adjust as needs change. There\u2019s no need to make a big leap.'
    }, {
      question: 'How do you decide what to recommend?',
      answer: 'We match options to what matters most to you — location, budget, and care type — and show the reasons behind every suggestion.'
    }, {
      question: 'What if my parent isn\u2019t ready to talk about it?',
      answer: 'That\u2019s common. We can start by exploring small supports that preserve independence, and share a senior-facing summary written with dignity in mind.'
    }]
  }))));
}
window.HomeSections = {
  TrustBar,
  CareOptions,
  HowItWorks,
  CostClarity,
  Testimonials,
  AdvisorCTA,
  FAQ
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeSections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Nav.jsx
try { (() => {
/* APFM marketing site — top navigation. Composes DS Button. */
const DS = window.APlaceForMomDesignSystem_a2ff8a;
function Logo({
  color = 'var(--surface-brand-strong)',
  width = 168
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let alive = true;
    fetch('../../assets/logos/apfm-wordmark-dark.svg').then(r => r.text()).then(t => {
      if (!alive || !ref.current) return;
      ref.current.innerHTML = t;
      const svg = ref.current.querySelector('svg');
      if (svg) {
        svg.style.width = '100%';
        svg.style.height = 'auto';
        svg.style.display = 'block';
      }
    });
    return () => {
      alive = false;
    };
  }, []);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      width,
      color,
      display: 'inline-block',
      lineHeight: 0
    }
  });
}
function Nav() {
  const links = ['Care options', 'How it works', 'Reviews', 'Resources'];
  const [open, setOpen] = React.useState(null);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--alpha-white-90)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-warm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 28,
      marginLeft: 8,
      flex: 1
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => {
      e.preventDefault();
      setOpen(open === l ? null : l);
    },
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      fontWeight: 500,
      color: open === l ? 'var(--text-heading)' : 'var(--text-body)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      cursor: 'pointer',
      textDecoration: 'none'
    }
  }, l, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(DS.Button, {
    variant: "link"
  }, "Sign in"), /*#__PURE__*/React.createElement(DS.Button, {
    variant: "primary",
    trailingIcon: true
  }, "Talk to an advisor"))));
}
window.Nav = Nav;
window.Logo = Logo;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/NeedsAssessment.jsx
try { (() => {
/* APFM — low-threat needs-assessment wizard (modal). Interactive click-through. */
const DSW = window.APlaceForMomDesignSystem_a2ff8a;
function NeedsAssessment({
  open,
  onClose
}) {
  const steps = ['What you\u2019re noticing', 'What might help', 'What matters most', 'Your next step'];
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  React.useEffect(() => {
    if (open) {
      setStep(0);
      setAnswers({});
    }
  }, [open]);
  if (!open) return null;
  const questions = [{
    key: 'notice',
    q: 'What are you noticing lately?',
    opts: ['Cooking or meals are harder', 'More forgetful than usual', 'A recent fall or close call', 'Feeling isolated or lonely']
  }, {
    key: 'help',
    q: 'What kind of help feels right to start?',
    opts: ['Just a little around the house', 'Regular in-home support', 'Exploring a community', 'Not sure yet — that\u2019s okay']
  }, {
    key: 'matters',
    q: 'What matters most right now?',
    opts: ['Staying in my own home', 'Staying close to family', 'Keeping costs manageable', 'Safety and peace of mind']
  }];
  const isResult = step === 3;
  const set = (k, v) => setAnswers(a => ({
    ...a,
    [k]: v
  }));
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'var(--alpha-ink-50)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 'min(640px, 100%)',
      maxHeight: '90vh',
      overflow: 'auto',
      background: 'var(--surface-default)',
      borderRadius: 'var(--radius-2xl)',
      boxShadow: 'var(--shadow-2xl)',
      padding: 36,
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement(DSW.Eyebrow, null, "Let's take this gently"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      padding: 4
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(DSW.StepProgress, {
    current: step,
    steps: steps
  })), !isResult ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 28,
      margin: 0
    }
  }, questions[step].q), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, questions[step].opts.map(o => {
    const sel = answers[questions[step].key] === o;
    return /*#__PURE__*/React.createElement("button", {
      key: o,
      onClick: () => set(questions[step].key, o),
      style: {
        textAlign: 'left',
        padding: '16px 18px',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        border: `2px solid ${sel ? 'var(--surface-brand)' : 'var(--border-default)'}`,
        background: sel ? 'var(--surface-brand-subtle)' : 'var(--surface-default)',
        fontFamily: 'var(--font-body)',
        fontSize: 16,
        fontWeight: 500,
        color: 'var(--text-heading)',
        transition: 'all var(--duration-fast) var(--ease-standard)'
      }
    }, o);
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 28,
      margin: 0
    }
  }, "Here's a calm place to start"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      color: 'var(--text-body)',
      margin: 0,
      lineHeight: 1.55
    }
  }, "Based on what you shared, beginning with ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-heading)'
    }
  }, "light help at home"), " keeps independence first while you explore. You can adjust anytime \u2014 and nothing here is final."), /*#__PURE__*/React.createElement(DSW.CareOptionCard, {
    level: "light",
    title: "Help at home",
    badge: "Suggested first step",
    description: "A little support each week, built around your routines.",
    cost: "$1,200/mo",
    reasons: ['Preserves independence', 'Lowest-pressure way to begin', 'Easy to share with family']
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(DSW.Button, {
    variant: "link",
    onClick: () => step === 0 ? onClose() : setStep(step - 1)
  }, step === 0 ? 'Maybe later' : 'Back'), !isResult ? /*#__PURE__*/React.createElement(DSW.Button, {
    variant: "primary",
    trailingIcon: true,
    disabled: !isResult && !answers[questions[step].key],
    onClick: () => setStep(step + 1)
  }, "Continue") : /*#__PURE__*/React.createElement(DSW.Button, {
    variant: "accent",
    trailingIcon: true,
    onClick: onClose
  }, "Save & share with family"))));
}
window.NeedsAssessment = NeedsAssessment;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/NeedsAssessment.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.AdvisorCard = __ds_scope.AdvisorCard;

__ds_ns.CareOptionCard = __ds_scope.CareOptionCard;

__ds_ns.CostRange = __ds_scope.CostRange;

__ds_ns.ReviewCard = __ds_scope.ReviewCard;

__ds_ns.StarRating = __ds_scope.StarRating;

__ds_ns.StepProgress = __ds_scope.StepProgress;

__ds_ns.TrustBadge = __ds_scope.TrustBadge;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.AccordionItem = __ds_scope.AccordionItem;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
