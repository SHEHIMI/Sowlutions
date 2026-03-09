export const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatViewCount = (n) => {
  if (n >= 1000000) {
    let millions = n / 1000000;
    let formatted = millions.toFixed(1);
    if (formatted.endsWith(".0")) {
      formatted = formatted.replace(".0", "");
    }
    return formatted + "M views";
  } else {
    let formatted = n.toLocaleString();
    return formatted + " views";
  }
};