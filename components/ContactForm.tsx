"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { WHATSAPP_NUMBER } from "@/lib/templates";

interface FormState {
  nama: string;
  email: string;
  wa: string;
  kebutuhan: string;
  pesan: string;
}

const initialState: FormState = {
  nama: "",
  email: "",
  wa: "",
  kebutuhan: "Beli Template",
  pesan: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = [
      `Halo Webside, saya ingin konsultasi 👋`,
      ``,
      `*Nama:* ${form.nama}`,
      `*Email:* ${form.email}`,
      `*WhatsApp:* ${form.wa}`,
      `*Kebutuhan:* ${form.kebutuhan}`,
      form.pesan ? `*Detail:* ${form.pesan}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener"
    );
  };

  return (
    <div className="kontak-form-card">
      {/* WA badge */}
      <div className="kontak-form-badge">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 1a7 7 0 0 1 6.07 10.47L15 15l-3.65-.9A7 7 0 1 1 8 1z" fill="var(--accent)"/>
        </svg>
        Terhubung ke WhatsApp
      </div>

      <h2 className="kontak-form-card__title">Ceritakan kebutuhan kamu</h2>
      <p className="kontak-form-card__sub">
        Isi form singkat ini — 1 klik, kami buatkan pesan WhatsApp yang sudah terisi informasi kamu.
      </p>

      <form noValidate style={{ marginTop: 24 }} onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="field">
            <label htmlFor="nama">Nama Lengkap</label>
            <input
              type="text" id="nama" name="nama"
              placeholder="Nama kamu"
              value={form.nama} onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email" id="email" name="email"
              placeholder="nama@email.com"
              value={form.email} onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="wa">Nomor WhatsApp</label>
            <input
              type="tel" id="wa" name="wa"
              placeholder="0812-xxxx-xxxx"
              value={form.wa} onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="kebutuhan">Jenis Kebutuhan</label>
            <select
              id="kebutuhan" name="kebutuhan"
              value={form.kebutuhan} onChange={handleChange}
            >
              <option>Beli Template</option>
              <option>Desain Custom</option>
              <option>Maintenance Website</option>
              <option>Lainnya</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="pesan">
            Ceritakan Kebutuhan Kamu <span className="hint">(opsional)</span>
          </label>
          <textarea
            id="pesan" name="pesan"
            placeholder="Contoh: saya butuh website company profile untuk usaha katering, sudah punya logo dan konten produk."
            value={form.pesan} onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-kontak-wa btn-block">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M9 1a8 8 0 0 1 6.94 11.97L17 17l-4.17-1.03A8 8 0 1 1 9 1z" fill="#fff"/>
          </svg>
          Lanjut ke WhatsApp
        </button>

        <p className="form-note" style={{ textAlign: "center", marginTop: 12 }}>
          Dengan mengirim form ini, kamu setuju tim Webside menghubungi kamu terkait kebutuhan yang disampaikan.
        </p>
      </form>
    </div>
  );
}
