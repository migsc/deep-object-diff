import { isDate, isEmpty, isObject, properObject } from "../utils";

const _strikethrough = text =>
  (text.split("").join("\u0336") + "\u0336").trim();
const _toString = o => {
  try {
    return isDate(o) ? o.toISOString() : o.toString();
  } catch (e) {
    return o + "";
  }
};

const updatedDiff = (lhs, rhs) => {
  if (lhs === rhs) return {};

  if (!isObject(lhs) || !isObject(rhs)) {
    let lhsFormatted = _strikethrough(_toString(lhs));
    let rhsFormatted = _strikethrough(_toString(rhs));
    return `${lhsFormatted}=>${rhsFormatted}`;
  }

  const l = properObject(lhs);
  const r = properObject(rhs);

  if (isDate(l) || isDate(r)) {
    if (l.valueOf() == r.valueOf()) return {};
    let lhsFormatted = _strikethrough(_toString(l));
    let rhsFormatted = _strikethrough(_toString(r));
    return `${lhsFormatted}=>${rhsFormatted}`;
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
