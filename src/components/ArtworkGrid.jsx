"use client"

export default function ArtworkGrid({ artworks, onViewDetail, onToggleFavorite, isFavorite }) {
  if (!artworks || artworks.length === 0) {
    return null
  }

  return (
    <section className="artwork-section" aria-labelledby="artworks-heading">
      <h2 id="artworks-heading" className="section-title">
        Hasil Pencarian ({artworks.length} artwork)
      </h2>

      <div className="artwork-grid" role="list">
        {artworks.map((artwork) => (
          <article key={artwork.objectID} className="artwork-card" role="listitem">
            <div className="card-image-wrapper">
              {artwork.primaryImage ? (
                <img
                  src={artwork.primaryImage || "/placeholder.svg"}
                  alt={artwork.title || "Untitled artwork"}
                  className="card-image"
                  loading="lazy"
                />
              ) : (
                <div className="card-image-placeholder">
                  <span>No Image</span>
                </div>
              )}
              <button
                className={`favorite-btn ${isFavorite(artwork.objectID) ? "active" : ""}`}
                onClick={() => onToggleFavorite(artwork)}
                aria-label={isFavorite(artwork.objectID) ? "Hapus dari favorit" : "Tambah ke favorit"}
                title={isFavorite(artwork.objectID) ? "Hapus dari favorit" : "Tambah ke favorit"}
              >
                ♥
              </button>
            </div>

            <div className="card-content">
              <h3 className="card-title">{artwork.title || "Untitled"}</h3>

              {artwork.artistDisplayName && <p className="card-artist">{artwork.artistDisplayName}</p>}

              {artwork.objectDate && <p className="card-date">{artwork.objectDate}</p>}

              {artwork.department && <p className="card-department">{artwork.department}</p>}

              <button className="btn btn-small btn-primary" onClick={() => onViewDetail(artwork.objectID)}>
                Lihat Detail
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
