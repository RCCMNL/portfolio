import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadImage, deleteImage } from '../../firebase/storage';

/**
 * Componente riutilizzabile per upload immagini con drag & drop,
 * preview, progress bar e validazione.
 *
 * @param {string} currentImage - URL dell'immagine corrente (se presente)
 * @param {string} storagePath - Percorso storage dell'immagine corrente
 * @param {string} uploadPath - Percorso base per il nuovo upload (es. "projects")
 * @param {function} onUploadComplete - Callback con { url, storagePath }
 * @param {function} onDelete - Callback quando l'immagine viene eliminata
 */
const ImageUploader = ({ currentImage, storagePath, uploadPath, onUploadComplete, onDelete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Formato non supportato. Usa JPG, PNG o WebP.');
      return false;
    }
    if (file.size > MAX_SIZE) {
      setError('File troppo grande. Massimo 2MB.');
      return false;
    }
    setError('');
    return true;
  };

  const handleUpload = async (file) => {
    if (!validateFile(file)) return;

    // Preview locale
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    setUploading(true);
    setProgress(0);

    try {
      // Elimina l'immagine precedente se presente
      if (storagePath) {
        await deleteImage(storagePath);
      }

      const result = await uploadImage(file, uploadPath, (p) => setProgress(p));
      onUploadComplete(result);
      setPreview(null);
    } catch (err) {
      console.error('Errore upload:', err);
      setError('Errore durante il caricamento. Riprova.');
      setPreview(null);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  }, [storagePath, uploadPath]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleUpload(file);
  };

  const handleDelete = async () => {
    if (storagePath) {
      await deleteImage(storagePath);
    }
    onDelete();
  };

  const displayImage = preview || currentImage;

  return (
    <div className="space-y-3">
      {displayImage ? (
        // Preview immagine attuale
        <div className="relative group rounded-xl overflow-hidden border border-slate-700">
          <img
            src={displayImage}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          {uploading && (
            <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center">
              <div className="text-center">
                <Loader2 size={24} className="animate-spin text-blue-400 mx-auto mb-2" />
                <div className="w-40 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">{progress}%</p>
              </div>
            </div>
          )}
          {!uploading && (
            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <label className="p-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
                <Upload size={18} className="text-white" />
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                onClick={handleDelete}
                className="p-2.5 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <X size={18} className="text-white" />
              </button>
            </div>
          )}
        </div>
      ) : (
        // Area drag & drop
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
            isDragging
              ? 'border-blue-500 bg-blue-500/5'
              : 'border-slate-600 hover:border-slate-500 bg-slate-900/30'
          }`}
        >
          <label className="cursor-pointer block">
            <ImageIcon size={36} className="mx-auto mb-3 text-gray-500" />
            <p className="text-sm text-gray-400 mb-1">
              Trascina un'immagine qui o <span className="text-blue-400">sfoglia</span>
            </p>
            <p className="text-xs text-gray-500">JPG, PNG, WebP • Max 2MB</p>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
      )}

      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1.5">
          <X size={14} /> {error}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
