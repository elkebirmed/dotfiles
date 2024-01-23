import { Utils } from "./imports.js";

/**
 * @param {number} length
 * @param {number=} start
 * @returns {Array<number>}
 */
export function range(length, start = 1) {
  return Array.from({ length }, (_, i) => i + start);
}

/** @param {Array<string>} bins */
export function dependencies(bins) {
  const deps = bins.map((bin) => {
    const has = Utils.exec(`which ${bin}`);
    if (!has) print(`missing dependency: ${bin}`);

    return !!has;
  });

  return deps.every((has) => has);
}

export const prettyTime = (seconds) => {
  if (typeof seconds !== "number" || isNaN(seconds)) {
    return "Invalid input";
  }

  const hours = Math.floor(seconds / 60 / 60);
  const remainingMinutes = Math.floor((seconds / 60) % 60);

  let prettyTime = "";
  if (hours > 0) {
    prettyTime += `${hours} hour${hours !== 1 ? "s" : ""}`;
    if (remainingMinutes > 0) {
      prettyTime += ` and ${remainingMinutes} minute${
        remainingMinutes !== 1 ? "s" : ""
      }`;
    }
  } else {
    prettyTime = `${remainingMinutes} minute${
      remainingMinutes !== 1 ? "s" : ""
    }`;
  }

  return prettyTime;
};

// A guessing func to try to support langs not listed in data/languages.js
export const isLanguageMatch = (abbreviation, word) => {
  const lowerAbbreviation = abbreviation.toLowerCase();
  const lowerWord = word.toLowerCase();
  let j = 0;
  for (let i = 0; i < lowerWord.length; i++) {
    if (lowerWord[i] === lowerAbbreviation[j]) {
      j++;
    }
    if (j === lowerAbbreviation.length) {
      return true;
    }
  }
  return false;
};
