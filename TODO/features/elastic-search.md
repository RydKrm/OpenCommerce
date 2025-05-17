## 🔍 Goal

- Implement full-text search, filters, fuzzy matching (e.g., "iphon" → "iPhone").
- Fast and scalable queries.
- Sort by relevance, price, rating, etc.
- Autocomplete suggestions.

### ✅ Tech Stack Summary

| Layer            | Tool/Tech                   |
| ---------------- | --------------------------- |
| Search Engine    | **ElasticSearch**           |
| Backend API      | **Node.js + Express**       |
| DB Sync          | PostgreSQL → ElasticSearch  |
| Optional Caching | Redis (for popular queries) |

### ✅ Benefits for Users

- Instantly find relevant products
- See suggestions even with typos
- Filter products with dynamic controls
- Faster product views on homepage or popular sections
