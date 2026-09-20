import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { queryClient } from "../config/queryClient";
import { AuthProvider } from "../contexts/AuthContext";
import { WeatherProvider } from "../contexts/WeatherContext";
import { TripProvider } from "../features/trip/context/TripContext";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WeatherProvider>
          <TripProvider>
            {children}
            <Toaster
              position="top-right"
              reverseOrder={false}
            />
          </TripProvider>
        </WeatherProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}