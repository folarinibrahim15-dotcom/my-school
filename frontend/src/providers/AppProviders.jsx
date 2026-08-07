// ==========================================================
// src/providers/AppProviders.jsx
// ----------------------------------------------------------
// Centralized Application Providers
//
// This component wraps every global provider used
// throughout the application.
//
// Current Providers
// - AuthProvider
// - SearchProvider
//
// Future Providers
// - ThemeProvider
// - ToastProvider
// - QueryClientProvider
// - Redux Provider
// ==========================================================

import { AuthProvider } from "../context/AuthContext";
import { SearchProvider } from "../context/SearchContext";

export default function AppProviders({
  children,
}) {
  return (
    <AuthProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </AuthProvider>
  );
}