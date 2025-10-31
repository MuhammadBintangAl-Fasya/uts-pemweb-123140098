import ArtworkGrid from "./ArtworkGrid"

export default function FavoritesList({ favorites, onViewDetail, onToggleFavorite, isFavorite }) {
  if (favorites.length === 0) {
    return (
      <section className="favorites-section">
        <h2 className="section-title">Koleksi Favorit</h2>
        <div className="empty-state">
          <p>Anda belum menambahkan artwork ke favorit.</p>
          <p>Klik ikon ♡ pada artwork untuk menambahkannya ke koleksi favorit Anda.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="favorites-section">
      <h2 className="section-title">Koleksi Favorit ({favorites.length})</h2>
      <ArtworkGrid
        artworks={favorites}
        onViewDetail={onViewDetail}
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
      />
    </section>
  )
}
