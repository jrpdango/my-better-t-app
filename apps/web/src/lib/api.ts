const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request<{
      message: string;
      status: string;
      timestamp: string;
      database: string;
    }>("/");
  }

  // Tenants
  async getTenants() {
    return this.request<{
      tenants: any[];
      total: number;
    }>("/api/tenants");
  }

  async getTenantByCompanySlug(companySlug: string) {
    return this.request<{
      tenant: any;
    }>(`/api/tenants?companySlug=${encodeURIComponent(companySlug)}`);
  }

  // Sites
  async getSites(tenantId: string) {
    return this.request<{
      sites: any[];
      total: number;
    }>(`/api/sites?tenantId=${encodeURIComponent(tenantId)}`);
  }

  async getSite(siteId: string) {
    return this.request<any>(`/api/sites/${siteId}`);
  }

  async createSite(data: {
    name: string;
    slug: string;
    description?: string;
    tenantId: string;
    createdBy: string;
  }) {
    return this.request<any>("/api/sites", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateSite(
    siteId: string,
    data: {
      name?: string;
      description?: string;
    }
  ) {
    return this.request<any>(`/api/sites/${siteId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteSite(siteId: string) {
    return this.request<{ message: string }>(`/api/sites/${siteId}`, {
      method: "DELETE",
    });
  }

  // Pages
  async getPages(siteId: string) {
    return this.request<{
      pages: any[];
      total: number;
    }>(`/api/sites/${siteId}/pages`);
  }

  async createPage(
    siteId: string,
    data: {
      title: string;
      slug: string;
      content?: any;
      status?: string;
      tenantId: string;
      createdBy: string;
    }
  ) {
    return this.request<any>(`/api/sites/${siteId}/pages`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Assets
  async getAssets(siteId: string) {
    return this.request<{
      assets: any[];
      total: number;
    }>(`/api/sites/${siteId}/assets`);
  }

  async createAsset(
    siteId: string,
    data: {
      name: string;
      filePath: string;
      fileType: string;
      fileSize: number;
      tenantId: string;
      uploadedBy: string;
    }
  ) {
    return this.request<any>(`/api/sites/${siteId}/assets`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Navigation
  async getNavigation(siteId: string) {
    return this.request<{
      navigation: any;
      message?: string;
    }>(`/api/sites/${siteId}/navigation`);
  }

  async updateNavigation(
    siteId: string,
    data: {
      structure: any;
      tenantId: string;
    }
  ) {
    return this.request<{
      navigation: any;
    }>(`/api/sites/${siteId}/navigation`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // Theme
  async getTheme(siteId: string) {
    return this.request<{
      theme: any;
      message?: string;
    }>(`/api/sites/${siteId}/theme`);
  }

  async updateTheme(
    siteId: string,
    data: {
      primaryColor: string;
      secondaryColor: string;
      customCss?: string;
      tenantId: string;
    }
  ) {
    return this.request<{
      theme: any;
    }>(`/api/sites/${siteId}/theme`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
