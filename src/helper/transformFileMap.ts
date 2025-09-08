export function transformFileMap(data: string[][]) {
  const result = [];

  for (let i = 0; i < data.length; i += 3) {
    const dirjenRow = data[i];
    const perempuanRow = data[i + 1];
    const totalRow = data[i + 2];

    if (!dirjenRow || !perempuanRow || !totalRow) break;

    result.push({
      dirjen: dirjenRow[2],
      lakiLaki: dirjenRow[15],
      perempuan: perempuanRow[15],
      total: totalRow[15],
    });
  }

  return result;
}
