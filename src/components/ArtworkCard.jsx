"use client"

export default function ArtworkCard({ artwork, onViewDetail, onToggleFavorite, isFavorite }) {
  return (
    <article className="artwork-card">
      <div className="card-image-wrapper">
        {artwork.primaryImage ? (
          <img
            src={artwork.primaryImage || "/placeholder.svg"}
            alt={artwork.title || "Artwork"}
            className="card-image"
            loading="lazy"
          />
        ) : (
          <div className="card-image-placeholder">No Image</div>
        )}
        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(artwork)}
          aria-label="Toggle favorite"
        >
          ♥
        </button>
      </div>

      <div className="card-content">
        <h3 className="card-title">{artwork.title || "Untitled"}</h3>
        {artwork.artistDisplayName && <p className="card-artist">{artwork.artistDisplayName}</p>}
        {artwork.objectDate && <p className="card-date">{artwork.objectDate}</p>}
        <button className="btn btn-small btn-primary" onClick={() => onViewDetail(artwork.objectID)}>
          Lihat Detail
        </button>
      </div>
    </article>
  )
}
