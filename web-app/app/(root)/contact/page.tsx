'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: 'Utilisateur', // Exemple de pré-remplissage
    email: 'utilisateur@email.com', // Exemple de pré-remplissage
    subject: '',
    message: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="flex items-center justify-center max-w-xl">
      <div className="flex w-full max-w-4xl flex-col gap-6 rounded-lg p-8 shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-white">
          Contactez-nous
        </h2>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-white">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly
              className="w-full rounded border bg-gray-800 p-3 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full rounded border bg-gray-800 p-3 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Objet du message
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full rounded border bg-gray-800 p-3 text-white"
            >
              <option value="">Sélectionnez une option</option>
              <option value="Problème avec un livre">
                📖 Problème avec un livre
              </option>
              <option value="Prolongation d’emprunt">
                ⏳ Prolongation d’emprunt
              </option>
              <option value="Demande d’ajout de livre">
                🆕 Demande d’ajout de livre
              </option>
              <option value="Problème technique">⚙️ Problème technique</option>
              <option value="Autre question">❓ Autre question</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Message détaillé
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="w-full rounded border bg-gray-800 p-3 text-white"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Attacher un fichier
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full rounded border bg-gray-800 p-3 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
