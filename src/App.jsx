"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header"
import SearchForm from "./components/SearchForm"
import ArtworkGrid from "./components/ArtworkGrid"
import DetailModal from "./components/DetailCard"
import FavoritesList from "./components/Favorite"
import { searchArtworks, getObjectDetails } from "./lib/api"
import { getFavorites, addFavorite, removeFavorite } from "./lib/localStorage"

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 20,
    hasMore: true,
  })
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    department: 0,
    yearStart: "",
    yearEnd: "",
    hasImages: true,
    sortBy: "relevance",
  })

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  const handleSearch = async (params) => {
    try {
      setLoading(true)
      setError(null)
      setSearchParams(params)
      setPagination((prev) => ({ ...prev, currentPage: 1 }))

      const results = await searchArtworks(params)
      setArtworks(results)
    } catch (err) {
      setError(err.message || "Gagal mencari artwork")
      console.error("Search error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetail = async (objectId) => {
    try {
      setDetailLoading(true)
      const details = await getObjectDetails(objectId)
      setSelectedArtwork(details)
    } catch (err) {
      setError(err.message || "Gagal memuat detail artwork")
      console.error("Detail error:", err)
    } finally {
      setDetailLoading(false)
    }
  }

  const handleToggleFavorite = (artwork) => {
    const isFavorite = favorites.some((fav) => fav.objectID === artwork.objectID)

    if (isFavorite) {
      removeFavorite(artwork.objectID)
    } else {
      addFavorite(artwork)
    }

    setFavorites(getFavorites())
  }

  const isFavorite = (objectId) => {
    return favorites.some((fav) => fav.objectID === objectId)
  }

  return (
    <div className="app-container">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} favoriteCount={favorites.length} />

      <main className="main-content">
        {currentPage === "home" && (
          <section className="home-section">
            <SearchForm onSearch={handleSearch} />

            {error && (
              <div className="error-banner" role="alert">
                <p>{error}</p>
                <button onClick={() => setError(null)} className="close-btn">
                  ×
                </button>
              </div>
            )}

            {loading ? (
              <div className="loading-container" role="status">
                <div className="spinner"></div>
                <p>Mencari artwork...</p>
              </div>
            ) : artworks.length > 0 ? (
              <>
                <ArtworkGrid
                  artworks={artworks}
                  onViewDetail={handleViewDetail}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={isFavorite}
                />
              </>
            ) : (
              <div className="empty-state">
                <p>Gunakan form di atas untuk mencari artwork dari Metropolitan Museum</p>
              </div>
            )}
          </section>
        )}

        {currentPage === "favorites" && (
          <FavoritesList
            favorites={favorites}
            onViewDetail={handleViewDetail}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
          />
        )}
      </main>

      {selectedArtwork && (
        <DetailModal
          artwork={selectedArtwork}
          loading={detailLoading}
          onClose={() => setSelectedArtwork(null)}
          onToggleFavorite={() => handleToggleFavorite(selectedArtwork)}
          isFavorite={isFavorite(selectedArtwork.objectID)}
        />
      )}
    </div>
  )
}
