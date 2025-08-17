import InputPegawai from "@/components/InputPegawai";

export default function HeaderPegawai(props: {q: string | undefined}) {
  const {q} = props
  return (
    <div className="min-w-7xl px-2 flex items-center justify-between">
      <InputPegawai q={q} />
    </div>
  );
}
