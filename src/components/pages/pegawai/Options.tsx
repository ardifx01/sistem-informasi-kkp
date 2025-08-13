"use client";
export default function Options() {
  return (
    <div className="flex gap-x-4">
      <select value="all" onChange={() => {}} className="px-1 cursor-pointer py-2 border border-[#d1d5db] rounded-md bg-white focus:border-0 focus:outline-0 shadow-md">
        <option value="all">All</option>
        <option value="pns">PNS</option>
        <option value="pppk">PPPK</option>
        <option value="polri">Polri</option>
        <option value="nonasn">Non Asn</option>
      </select>
    </div>
  );
}
