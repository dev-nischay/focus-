export const randomColour = () => {
  const colours = [
    "bg-mist-500",
    "bg-purple-900",
    "bg-yellow-600",
    "bg-mauve-500",
    "bg-main",
    "bg-blue-800",
    "bg-yellow-600",
    "bg-stone-500",
  ];

  const random = Math.floor(Math.random() * 8);

  return colours[random];
};
