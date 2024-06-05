export function isUnique(obj, index, self) {
    return index === self.findIndex((o) => o.link === obj.link);
}

