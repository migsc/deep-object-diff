import { isDate, isEmpty, isObject, properObject } from "../utils";

const updatedDiff = (lhs, rhs) => {
  if (lhs === rhs) return {};

  if (!isObject(lhs) || !isObject(rhs))
    return `${lhs
      .toString()
      .split("")
      .join("\u0336")} ${rhs.toString()}`;

  const l = properObject(lhs);
  const r = properObject(rhs);

  if (isDate(l) || isDate(r)) {
    if (l.valueOf() == r.valueOf()) return {};
    return `${l
      .toISOString()
      .split("")
      .join("\u0336")} ${r.toISOString()}`;
  }

  return Object.keys(r).reduce((acc, key) => {
    if (l.hasOwnProperty(key)) {
      const difference = updatedDiff(l[key], r[key]);

      if (isObject(difference) && isEmpty(difference) && !isDate(difference))
        return acc;

      return { ...acc, [key]: difference };
    }

    return acc;
  }, {});
};

export default updatedDiff;
