// 모노라인 아이콘 세트 — 24x24, stroke=currentColor
// 시스템/카테고리에서 공통 사용. 단순 기하 형태로 절제된 인상.
window.ICONS = {
  profile:   '<circle cx="12" cy="8.2" r="3.3"/><path d="M5.5 19c0-3.4 2.9-5.6 6.5-5.6s6.5 2.2 6.5 5.6"/>',
  edit:      '<path d="M5 19l1.2-4.2L16 5l3 3-9.8 9.8L5 19z"/><path d="M14 7l3 3"/>',
  bulb:      '<path d="M9.2 17h5.6"/><path d="M10 20h4"/><path d="M12 3.2a5.6 5.6 0 0 0-3.6 9.9c.7.7 1 1.3 1.1 2.4h5a3.6 3.6 0 0 1 1.1-2.4A5.6 5.6 0 0 0 12 3.2z"/>',
  cap:       '<path d="M2.8 9.2 12 5.2l9.2 4-9.2 4-9.2-4z"/><path d="M6.6 11.2v3.9c0 1.3 2.4 2.6 5.4 2.6s5.4-1.3 5.4-2.6v-3.9"/><path d="M21.2 9.2v4.6"/>',
  doc:       '<path d="M6.5 3.2h7l4.5 4.5v13.1H6.5z"/><path d="M13.2 3.2v4.6h4.6"/><path d="M9.2 12.4h6M9.2 16h6"/>',
  search:    '<circle cx="11" cy="11" r="6.2"/><path d="M20 20l-4.6-4.6"/>',
  calendar:  '<rect x="3.8" y="5" width="16.4" height="15.2" rx="2.2"/><path d="M3.8 9.4h16.4M8.3 3v4M15.7 3v4"/>',
  checklist: '<path d="M9.5 6.4h10M9.5 12h10M9.5 17.6h10"/><path d="M4 5.6 5.3 7 7.4 4.7M4 11.2l1.3 1.4 2.1-2.3M4 16.8l1.3 1.4 2.1-2.3"/>',
  flag:      '<path d="M5.5 21V4"/><path d="M5.5 4.5h11l-2.3 3.6 2.3 3.6h-11"/>',
  // 내비/UI
  home:      '<path d="M4 11 12 4l8 7"/><path d="M6 9.6V20h12V9.6"/><path d="M10 20v-5h4v5"/>',
  grid:      '<rect x="4" y="4" width="6.5" height="6.5" rx="1.4"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.4"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.4"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.4"/>',
  book:      '<path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v15H5.5C4.7 19 4 18.3 4 17.5z"/><path d="M20 5.5C20 4.7 19.3 4 18.5 4H12v15h6.5c.8 0 1.5-.7 1.5-1.5z"/>',
  arrow:     '<path d="M5 12h13"/><path d="M12.5 5.5 19 12l-6.5 6.5"/>',
  upright:   '<path d="M7 17 17 7"/><path d="M8.5 7H17v8.5"/>',
  sun:       '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.2 5.2 7 7M17 17l1.8 1.8M18.8 5.2 17 7M7 17l-1.8 1.8"/>',
  moon:      '<path d="M20 13.4A7.5 7.5 0 1 1 10.6 4 6 6 0 0 0 20 13.4z"/>',
  chevron:   '<path d="M9 6l6 6-6 6"/>',
  back:      '<path d="M19 12H6"/><path d="M11.5 5.5 5 12l6.5 6.5"/>',
  settings:  '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7 5.6 5.6"/>',
  info:      '<circle cx="12" cy="12" r="8.5"/><path d="M12 11.2v4.6"/><path d="M12 8.1v0"/>',
  alert:     '<path d="M12 3.6 20.5 18.5H3.5z"/><path d="M12 9.5v4"/><path d="M12 16.2v0"/>',
};

// SVG 태그로 감싸 반환
window.svgIcon = function (name, size, stroke) {
  const inner = window.ICONS[name] || "";
  size = size || 22; stroke = stroke || 1.7;
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
};
