const AVATAR_COLORS = [
  "#2f6f8f", // teal blue
  "#2b2b30", // dark slate
  "#7a4a34", // warm brown
  "#8b4a8f", // plum
  "#b0353a", // crimson
  "#4257b2", // indigo
];

export const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

export const getAvatarColor = (name) => {
  if (!name) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};
