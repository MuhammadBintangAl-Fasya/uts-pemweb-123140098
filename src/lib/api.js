const API_BASE = "https://collectionapi.metmuseum.org/public/collection/v1"

export const getDepartments = async () => {
  try {
    const response = await fetch(`${API_BASE}/departments`)
    if (!response.ok) throw new Error("Failed to fetch departments")
    const data = await response.json()
    return data.departments || []
  } catch (error) {
    console.error("getDepartments error:", error)
    return []
  }
}

export const searchArtworks = async (params) => {
  try {
    const { keyword, department, yearStart, yearEnd, hasImages, sortBy } = params

    const queryParams = new URLSearchParams({
      q: keyword || "",
      hasImages: hasImages ? "true" : "false",
      isPublicDomain: "true",
    })

    if (department && department !== 0) {
      queryParams.append("departmentId", department)
    }

    if (yearStart) queryParams.append("dateBegin", yearStart)
    if (yearEnd) queryParams.append("dateEnd", yearEnd)

    const searchUrl = `${API_BASE}/search?${queryParams.toString()}`
    console.log("Search URL:", searchUrl)

    const response = await fetch(searchUrl)
    if (!response.ok) throw new Error("Failed to search artworks")

    const data = await response.json()

    if (!data.objectIDs || data.objectIDs.length === 0) {
      console.warn("Tidak ada hasil ditemukan untuk:", keyword)
      return []
    }

    const objectIds = data.objectIDs.slice(0, 20)

    const artworks = await Promise.all(
      objectIds.map(async (id) => {
        try {
          const res = await fetch(`${API_BASE}/objects/${id}`)
          if (!res.ok) return null
          const detail = await res.json()
          return detail
        } catch {
          return null
        }
      })
    )

    let results = artworks.filter((art) => art && art.primaryImage)
    results = sortResults(results, sortBy)

    console.log("Jumlah hasil valid:", results.length)
    return results
  } catch (error) {
    console.error("searchArtworks error:", error)
    return []
  }
}

export const getObjectDetails = async (objectID) => {
  try {
    const response = await fetch(`${API_BASE}/objects/${objectID}`)
    if (!response.ok) throw new Error(`Failed to fetch object ${objectID}`)
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch object:", error)
    throw error
  }
}

const sortResults = (results, sortBy) => {
  const sorted = [...results]
  switch (sortBy) {
    case "date":
      sorted.sort((a, b) => {
        const dateA = parseInt(a.objectDate) || 0
        const dateB = parseInt(b.objectDate) || 0
        return dateB - dateA
      })
      break
    case "title":
      sorted.sort((a, b) => (a.title || "").localeCompare(b.title || ""))
      break
  }
  return sorted
}
