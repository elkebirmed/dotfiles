import { Utils } from "./imports.js";

/**
 * @param {string} className
 * @param {string} title
 */
export default (className, title) => {
  switch (className) {
    case "Code":
      className = "visual-studio-code";
      break;
    default:
      break;
  }

  const lowerClassName = className.toLowerCase();
  const upperClassName = `${className
    .slice(0, 1)
    .toUpperCase()}${className.slice(1)}`;
  const symbolicClassName = `${lowerClassName}-symbolic`;
  const lowerTitle = title.toLowerCase();
  const upperTitle = `${title.slice(0, 1).toUpperCase()}${title.slice(1)}`;
  const symbolicTitle = `${lowerTitle}-symbolic`;

  if (Utils.lookUpIcon(className)) return className;
  if (Utils.lookUpIcon(lowerClassName)) return lowerClassName;
  if (Utils.lookUpIcon(upperClassName)) return upperClassName;
  if (Utils.lookUpIcon(symbolicClassName)) return symbolicClassName;
  if (Utils.lookUpIcon(title)) return title;
  if (Utils.lookUpIcon(lowerTitle)) return lowerTitle;
  if (Utils.lookUpIcon(upperTitle)) return upperTitle;
  if (Utils.lookUpIcon(symbolicTitle)) return symbolicTitle;

  return "";
};
