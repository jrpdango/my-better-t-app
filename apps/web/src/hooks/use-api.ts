import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

// Query Keys
export const QUERY_KEYS = {
  healthCheck: ["health"],
  tenants: ["tenants"],
  tenant: (companySlug: string) => ["tenant", companySlug],
  sites: (tenantId: string) => ["sites", tenantId],
  site: (siteId: string) => ["site", siteId],
  pages: (siteId: string) => ["pages", siteId],
  assets: (siteId: string) => ["assets", siteId],
  navigation: (siteId: string) => ["navigation", siteId],
  theme: (siteId: string) => ["theme", siteId],
} as const;

// Health Check
export function useHealthCheck() {
  return useQuery({
    queryKey: QUERY_KEYS.healthCheck,
    queryFn: () => apiClient.healthCheck(),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  });
}

// Tenants
export function useTenants() {
  return useQuery({
    queryKey: QUERY_KEYS.tenants,
    queryFn: () => apiClient.getTenants(),
    staleTime: 300000, // 5 minutes
  });
}

export function useTenant(companySlug: string, enabled: boolean = true) {
  return useQuery({
    queryKey: QUERY_KEYS.tenant(companySlug),
    queryFn: () => apiClient.getTenantByCompanySlug(companySlug),
    enabled: enabled && !!companySlug,
    staleTime: 300000, // 5 minutes
  });
}

// Sites
export function useSites(tenantId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: QUERY_KEYS.sites(tenantId),
    queryFn: () => apiClient.getSites(tenantId),
    enabled: enabled && !!tenantId,
    staleTime: 60000, // 1 minute
  });
}

export function useSite(siteId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: QUERY_KEYS.site(siteId),
    queryFn: () => apiClient.getSite(siteId),
    enabled: enabled && !!siteId,
    staleTime: 60000, // 1 minute
  });
}

export function useCreateSite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      slug: string;
      description?: string;
      tenantId: string;
      createdBy: string;
    }) => apiClient.createSite(data),
    onSuccess: (_, variables) => {
      // Invalidate sites list for this tenant
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.sites(variables.tenantId),
      });
    },
  });
}

export function useUpdateSite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      siteId,
      data,
    }: {
      siteId: string;
      data: { name?: string; description?: string };
    }) => apiClient.updateSite(siteId, data),
    onSuccess: (updatedSite) => {
      // Update the site cache
      queryClient.setQueryData(QUERY_KEYS.site(updatedSite.id), updatedSite);
      // Invalidate sites list
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.sites(updatedSite.tenantId),
      });
    },
  });
}

export function useDeleteSite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (siteId: string) => apiClient.deleteSite(siteId),
    onSuccess: (_, siteId) => {
      // Remove from cache and invalidate related queries
      queryClient.removeQueries({ queryKey: QUERY_KEYS.site(siteId) });
      queryClient.invalidateQueries({ queryKey: ["sites"] });
    },
  });
}

// Pages
export function usePages(siteId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: QUERY_KEYS.pages(siteId),
    queryFn: () => apiClient.getPages(siteId),
    enabled: enabled && !!siteId,
    staleTime: 60000, // 1 minute
  });
}

export function useCreatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      siteId,
      data,
    }: {
      siteId: string;
      data: {
        title: string;
        slug: string;
        content?: any;
        status?: string;
        tenantId: string;
        createdBy: string;
      };
    }) => apiClient.createPage(siteId, data),
    onSuccess: (_, variables) => {
      // Invalidate pages list for this site
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.pages(variables.siteId),
      });
      // Invalidate site data to update page count
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.site(variables.siteId),
      });
    },
  });
}

// Assets
export function useAssets(siteId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: QUERY_KEYS.assets(siteId),
    queryFn: () => apiClient.getAssets(siteId),
    enabled: enabled && !!siteId,
    staleTime: 60000, // 1 minute
  });
}

export function useCreateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      siteId,
      data,
    }: {
      siteId: string;
      data: {
        name: string;
        filePath: string;
        fileType: string;
        fileSize: number;
        tenantId: string;
        uploadedBy: string;
      };
    }) => apiClient.createAsset(siteId, data),
    onSuccess: (_, variables) => {
      // Invalidate assets list for this site
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.assets(variables.siteId),
      });
      // Invalidate site data to update asset count
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.site(variables.siteId),
      });
    },
  });
}

// Navigation
export function useNavigation(siteId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: QUERY_KEYS.navigation(siteId),
    queryFn: () => apiClient.getNavigation(siteId),
    enabled: enabled && !!siteId,
    staleTime: 60000, // 1 minute
  });
}

export function useUpdateNavigation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      siteId,
      data,
    }: {
      siteId: string;
      data: { structure: any; tenantId: string };
    }) => apiClient.updateNavigation(siteId, data),
    onSuccess: (result, variables) => {
      // Update navigation cache
      queryClient.setQueryData(QUERY_KEYS.navigation(variables.siteId), result);
    },
  });
}

// Theme
export function useTheme(siteId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: QUERY_KEYS.theme(siteId),
    queryFn: () => apiClient.getTheme(siteId),
    enabled: enabled && !!siteId,
    staleTime: 60000, // 1 minute
  });
}

export function useUpdateTheme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      siteId,
      data,
    }: {
      siteId: string;
      data: {
        primaryColor: string;
        secondaryColor: string;
        customCss?: string;
        tenantId: string;
      };
    }) => apiClient.updateTheme(siteId, data),
    onSuccess: (result, variables) => {
      // Update theme cache
      queryClient.setQueryData(QUERY_KEYS.theme(variables.siteId), result);
    },
  });
}
