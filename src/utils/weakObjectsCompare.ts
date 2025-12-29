export const weakObjectsCompare = (obj1: Object, obj2: Object) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);
