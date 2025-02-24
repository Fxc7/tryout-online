export function getInitials(name) {
   return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
}