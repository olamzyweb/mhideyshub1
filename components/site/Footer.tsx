import { MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-10 text-center text-sm text-ink/70">
        <p className="font-semibold text-ink">Happy shopping 🛒🛍️ You can always send a DM for more. 🥰🤗</p>
        <a
          href="https://chat.whatsapp.com/LZk3ZAIos259NRUc2OG7fx?mode=ems_copy_c"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-ink hover:bg-sand"
        >
          <MessageCircle size={16} /> Join WhatsApp Group
        </a>
      </div>
    </footer>
  );
}
