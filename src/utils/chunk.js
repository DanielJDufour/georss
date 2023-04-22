export default function chunk(arr, chunk_size = 2) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunk_size) {
    const chunk = [];
    for (let c = 0; c < chunk_size; c++) {
      chunk.push(arr[i + c]);
    }
    result.push(chunk);
  }
  return result;
}
