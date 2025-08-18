export default function getAgePegawai(year: number) {
  const curDate = new Date().getFullYear();

  return curDate - year;
}
