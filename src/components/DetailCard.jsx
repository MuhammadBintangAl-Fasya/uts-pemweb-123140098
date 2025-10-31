"use client"

import { useEffect } from "react"

export default function DetailModal({ artwork, loading, onClose, onToggleFavorite, isFavorite }) {
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose} role="presentation" />

      {/* Modal */}
      <dialog className="detail-modal" open>
        <div className="modal-content">
          <button className="modal-close" onClick={onClose} aria-label="Tutup detail modal" title="Tutup (ESC)">
            ×
          </button>

          {loading ? (
            <div className="modal-loading" role="status">
              <div className="spinner"></div>
              <p>Memuat detail...</p>
            </div>
          ) : artwork ? (
            <div className="modal-body">
              {/* Image Section */}
              {artwork.primaryImage && (
                <div className="modal-image-section">
                  <img src={artwork.primaryImage || "/placeholder.svg"} alt={artwork.title} className="modal-image" />
                </div>
              )}

              {/* Information Section */}
              <div className="modal-info-section">
                <h2 className="modal-title">{artwork.title || "Untitled"}</h2>

                {/* Artist */}
                {artwork.artistDisplayName && (
                  <div className="info-group">
                    <h3 className="info-label">Artis</h3>
                    <p className="info-value">{artwork.artistDisplayName}</p>
                  </div>
                )}

                {/* Date */}
                {artwork.objectDate && (
                  <div className="info-group">
                    <h3 className="info-label">Tanggal</h3>
                    <p className="info-value">{artwork.objectDate}</p>
                  </div>
                )}

                {/* Medium */}
                {artwork.medium && (
                  <div className="info-group">
                    <h3 className="info-label">Medium</h3>
                    <p className="info-value">{artwork.medium}</p>
                  </div>
                )}

                {/* Culture */}
                {artwork.culture && (
                  <div className="info-group">
                    <h3 className="info-label">Budaya</h3>
                    <p className="info-value">{artwork.culture}</p>
                  </div>
                )}

                {/* Dimensions */}
                {(artwork.height || artwork.width) && (
                  <div className="info-group">
                    <h3 className="info-label">Dimensi</h3>
                    <p className="info-value">{formatDimensions(artwork)}</p>
                  </div>
                )}

                {/* Department */}
                {artwork.department && (
                  <div className="info-group">
                    <h3 className="info-label">Departemen</h3>
                    <p className="info-value">{artwork.department}</p>
                  </div>
                )}

                {/* Classification */}
                {artwork.classification && (
                  <div className="info-group">
                    <h3 className="info-label">Klasifikasi</h3>
                    <p className="info-value">{artwork.classification}</p>
                  </div>
                )}

                {/* Credit Line */}
                {artwork.creditLine && (
                  <div className="info-group">
                    <h3 className="info-label">Kredit</h3>
                    <p className="info-value">{artwork.creditLine}</p>
                  </div>
                )}

                {/* Object ID */}
                <div className="info-group">
                  <h3 className="info-label">ID Objek</h3>
                  <p className="info-value">{artwork.objectID}</p>
                </div>

                {/* Action Buttons */}
                <div className="modal-actions">
                  <button className={`btn btn-favorite ${isFavorite ? "active" : ""}`} onClick={onToggleFavorite}>
                    {isFavorite ? "♥ Hapus Favorit" : "♡ Tambah Favorit"}
                  </button>
                  {artwork.objectURL && (
                    <a href={artwork.objectURL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      Lihat di Museum
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </dialog>
    </>
  )
}
