import { ContactInfo } from "@/types";
import { ANIMATION_DELAYS } from "@/utils/detailPegawai";

export const ContactCard: React.FC<{
  contact: ContactInfo;
  index: number;
}> = ({ contact, index }) => {
  const delay = `${
    ANIMATION_DELAYS.CONTACT_ITEM_BASE +
    index * ANIMATION_DELAYS.CONTACT_ITEM_MULTIPLIER
  }ms`;

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 
                 border border-blue-100 hover:border-blue-200
                 transition-all duration-300 hover:scale-[1.02] hover:shadow-md
                 ${"opacity-100 translate-y-0"}`}
      style={{
        transitionDelay: delay,
      }}
    >
      <div className="flex-1 min-w-0">
        <dt className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">
          {contact.type}
        </dt>
        <dd className="text-sm text-gray-800 font-medium leading-relaxed">
          {contact.value}
        </dd>
      </div>
    </div>
  );
};
