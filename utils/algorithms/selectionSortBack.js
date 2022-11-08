export function selectionSortBack(array) {
  const moves = [];
  do {
    var swapped = false;
    for (let i = array.length - 1; i >= 0; i--) {
      for (let j = array.length; j >= i + 1; j--) {
        if (array[j] < array[i]) {
          swapped = true;
          [array[j], array[i]] = [array[i], array[j]];
          moves.push({
            indices: [i, j],
            swap: true,
          });
        } else {
          moves.push({
            indices: [j, i],
            swap: false,
          });
        }
      }
    }
  } while (swapped);
  return moves;
}
