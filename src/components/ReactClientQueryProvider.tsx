"use client"
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
export const ReactClientQueryProvider = ({ children }: { children: React.ReactNode }) => (<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>)