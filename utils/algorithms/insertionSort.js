export function insertionSort(array) {
  const moves = [];
  for (let i = 1; i < array.length; i++) {
    let [key, j] = [array[i], i - 1];

    while (j >= 0 && array[j] > key) {
      const tempArr = [...array];
      array[j] = array[j + 1];
      array[j + 1] = tempArr[j];
      moves.push({
        indices: [j, j + 1],
        swap: true,
      });
      j--;
    }
  }
  return moves;
}
