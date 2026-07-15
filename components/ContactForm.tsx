"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
  };

  return (
    <div className="contact-form">
      <h3 style={{ fontSize: "1.3rem" }}>Kirim Detail Kebutuhan</h3>
      <p style={{ marginTop: 8, color: "var(--ink-soft)", fontSize: "0.92rem" }}>
        Isi form ini, tim kami akan hubungi kamu dalam 1x24 jam kerja.
      </p>

      <form noValidate style={{ marginTop: 26 }} onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="field">
            <label htmlFor="nama">Nama Lengkap</label>
            <input type="text" id="nama" name="nama" placeholder="Nama kamu" required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="nama@email.com" required />
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="wa">Nomor WhatsApp</label>
            <input type="tel" id="wa" name="wa" placeholder="0812-xxxx-xxxx" required />
          </div>
          <div className="field">
            <label htmlFor="kebutuhan">Jenis Kebutuhan</label>
            <select id="kebutuhan" name="kebutuhan" defaultValue="Beli Template">
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
            id="pesan"
            name="pesan"
            placeholder="Contoh: saya butuh website company profile untuk usaha katering, sudah punya logo dan konten."
          />
        </div>

        <button type="submit" className="btn btn-accent btn-block">
          Kirim Pesan
        </button>
        <p className="form-note">
          Dengan mengirim form ini, kamu setuju tim Webside menghubungi kamu terkait kebutuhan yang disampaikan.
        </p>

        <div className={`form-success${submitted ? " show" : ""}`}>
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Terima kasih! Pesan kamu sudah kami terima, tim Webside akan segera menghubungi.</span>
        </div>
      </form>
    </div>
  );
}
